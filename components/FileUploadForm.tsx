import React, { useState, useRef } from 'react';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import { Textarea } from './ui/textarea';
import { Card, CardContent } from './ui/card';
import { Upload, FileText, Image, Palette, X, File } from 'lucide-react';
import { Button } from './ui/button';

interface UploadedFile {
    id: string;
    name: string;
    size: number;
    type: string;
    preview?: string;
    file?: File;
    path?: string;
    url?: string;
}

interface AssetsData {
    hasLogo: boolean;
    hasBrandGuidelines: boolean;
    hasExistingAssets: boolean;
    additionalNotes: string;
    logoFiles: UploadedFile[];
    guidelineFiles: UploadedFile[];
    marketingFiles: UploadedFile[];
    inspirationFiles: UploadedFile[];
}

interface FileUploadFormProps {
    data: AssetsData;
    onChange: (data: Partial<AssetsData>) => void;
}

type FileCategory = 'logoFiles' | 'guidelineFiles' | 'marketingFiles' | 'inspirationFiles';

const FILE_SIZE_LIMIT = 50 * 1024 * 1024; // 50MB

const ACCEPTED_FILE_TYPES: Record<FileCategory, string[]> = {
    logoFiles: ['.png', '.jpg', '.jpeg', '.svg', '.pdf', '.ai'],
    guidelineFiles: ['.pdf', '.doc', '.docx', '.png', '.jpg', '.jpeg'],
    marketingFiles: ['*'], // All formats
    inspirationFiles: ['.png', '.jpg', '.jpeg', '.pdf'],
};

export function FileUploadForm({ data, onChange }: FileUploadFormProps) {
    const [dragOver, setDragOver] = useState<FileCategory | null>(null);

    const handleChange = (field: keyof AssetsData, value: boolean | string | UploadedFile[]) => {
        onChange({ [field]: value });
    };

    const generateFileId = () => `file-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    const createFilePreview = (file: File): Promise<string | undefined> => {
        return new Promise((resolve) => {
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result as string);
                reader.readAsDataURL(file);
            } else {
                resolve(undefined);
            }
        });
    };

    const validateFile = (file: File, category: FileCategory): string | null => {
        if (file.size > FILE_SIZE_LIMIT) {
            return `File "${file.name}" exceeds 50MB limit`;
        }

        const acceptedTypes = ACCEPTED_FILE_TYPES[category];
        if (acceptedTypes[0] !== '*') {
            const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
            if (!acceptedTypes.includes(fileExtension)) {
                return `File type not supported for ${category}`;
            }
        }

        return null;
    };

    const handleFiles = async (files: FileList | null, category: FileCategory) => {
        if (!files) return;

        const currentFiles = data[category] || [];
        const newFiles: UploadedFile[] = [];

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const error = validateFile(file, category);

            if (error) {
                alert(error);
                continue;
            }

            const preview = await createFilePreview(file);
            newFiles.push({
                id: generateFileId(),
                name: file.name,
                size: file.size,
                type: file.type,
                preview,
                file,
            });
        }

        handleChange(category, [...currentFiles, ...newFiles]);
    };

    const handleDrop = (e: React.DragEvent, category: FileCategory) => {
        e.preventDefault();
        setDragOver(null);
        handleFiles(e.dataTransfer.files, category);
    };

    const handleDragOver = (e: React.DragEvent, category: FileCategory) => {
        e.preventDefault();
        setDragOver(category);
    };

    const handleDragLeave = () => {
        setDragOver(null);
    };

    const removeFile = (category: FileCategory, fileId: string) => {
        const currentFiles = data[category] || [];
        const updatedFiles = currentFiles.filter((f) => f.id !== fileId);
        handleChange(category, updatedFiles);
    };

    const formatFileSize = (bytes: number): string => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
    };

    const FileUploadZone = ({
        category,
        title,
        description,
        icon: Icon,
        acceptedFormats,
    }: {
        category: FileCategory;
        title: string;
        description: string;
        icon: React.ElementType;
        acceptedFormats: string;
    }) => {
        const inputRef = useRef<HTMLInputElement>(null);
        const files = data[category] || [];
        const isDragging = dragOver === category;

        return (
            <Card
                className={`transition-all border-2 border-dashed cursor-pointer ${isDragging
                    ? 'border-primary bg-primary/5 scale-105'
                    : 'hover:border-primary/50'
                    }`}
                onDrop={(e) => handleDrop(e, category)}
                onDragOver={(e) => handleDragOver(e, category)}
                onDragLeave={handleDragLeave}
                onClick={() => inputRef.current?.click()}
            >
                <CardContent className="p-6">
                    <input
                        ref={inputRef}
                        type="file"
                        multiple
                        accept={ACCEPTED_FILE_TYPES[category].join(',')}
                        onChange={(e) => handleFiles(e.target.files, category)}
                        className="hidden"
                    />

                    <div className="text-center">
                        <Icon className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                        <h4 className="mb-1 font-medium">{title}</h4>
                        <p className="mb-3 text-sm text-muted-foreground">{description}</p>
                        <div className="mb-3 text-xs text-muted-foreground">
                            Supported: {acceptedFormats}
                        </div>

                        {files.length > 0 && (
                            <div className="mt-4 space-y-2 text-left">
                                {files.map((file) => (
                                    <div
                                        key={file.id}
                                        className="flex items-center gap-2 p-2 rounded-md bg-muted group"
                                        onClick={(e: React.MouseEvent) => e.stopPropagation()}
                                    >
                                        {file.preview ? (
                                            <img
                                                src={file.preview}
                                                alt={file.name}
                                                className="object-cover w-10 h-10 rounded"
                                            />
                                        ) : (
                                            <div className="flex items-center justify-center w-10 h-10 rounded bg-background">
                                                <File className="w-5 h-5 text-muted-foreground" />
                                            </div>
                                        )}
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium truncate">{file.name}</p>
                                            <p className="text-xs text-muted-foreground">
                                                {formatFileSize(file.size)}
                                            </p>
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="transition-opacity opacity-0 group-hover:opacity-100"
                                            onClick={(e: React.MouseEvent) => {
                                                e.stopPropagation();
                                                removeFile(category, file.id);
                                            }}
                                        >
                                            <X className="w-4 h-4" />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        )}

                        {files.length === 0 && (
                            <p className="mt-2 text-xs text-muted-foreground">
                                Click or drag files here to upload
                            </p>
                        )}
                    </div>
                </CardContent>
            </Card>
        );
    };

    return (
        <div className="space-y-6">
            <div className="space-y-4">
                <h3 className="text-lg font-semibold">Current Brand Assets</h3>
                <p className="text-muted-foreground">
                    Let us know what brand materials you already have. We'll use these as a foundation for your project.
                </p>

                <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                        <Checkbox
                            id="hasLogo"
                            checked={data.hasLogo}
                            onCheckedChange={(checked) => handleChange('hasLogo', checked as boolean)}
                        />
                        <div className="flex items-center gap-2">
                            <Image className="w-4 h-4 text-muted-foreground" />
                            <Label htmlFor="hasLogo" className="cursor-pointer">
                                I have an existing logo
                            </Label>
                        </div>
                    </div>

                    <div className="flex items-center space-x-3">
                        <Checkbox
                            id="hasBrandGuidelines"
                            checked={data.hasBrandGuidelines}
                            onCheckedChange={(checked) => handleChange('hasBrandGuidelines', checked as boolean)}
                        />
                        <div className="flex items-center gap-2">
                            <Palette className="w-4 h-4 text-muted-foreground" />
                            <Label htmlFor="hasBrandGuidelines" className="cursor-pointer">
                                I have brand guidelines or style guide
                            </Label>
                        </div>
                    </div>

                    <div className="flex items-center space-x-3">
                        <Checkbox
                            id="hasExistingAssets"
                            checked={data.hasExistingAssets}
                            onCheckedChange={(checked) => handleChange('hasExistingAssets', checked as boolean)}
                        />
                        <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4 text-muted-foreground" />
                            <Label htmlFor="hasExistingAssets" className="cursor-pointer">
                                I have other marketing materials or assets
                            </Label>
                        </div>
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <h3 className="text-lg font-semibold">File Upload Areas</h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <FileUploadZone
                        category="logoFiles"
                        title="Logo Files"
                        description="Upload your current logo in various formats"
                        icon={Upload}
                        acceptedFormats="PNG, JPG, SVG, PDF, AI"
                    />

                    <FileUploadZone
                        category="guidelineFiles"
                        title="Brand Guidelines"
                        description="Style guides, color palettes, typography"
                        icon={Upload}
                        acceptedFormats="PDF, DOC, PNG, JPG"
                    />

                    <FileUploadZone
                        category="marketingFiles"
                        title="Marketing Materials"
                        description="Brochures, business cards, existing designs"
                        icon={Upload}
                        acceptedFormats="All common formats"
                    />

                    <FileUploadZone
                        category="inspirationFiles"
                        title="Inspiration"
                        description="Reference images, mood boards, examples"
                        icon={Upload}
                        acceptedFormats="PNG, JPG, PDF"
                    />
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="additionalNotes">Additional Notes</Label>
                <Textarea
                    id="additionalNotes"
                    value={data.additionalNotes}
                    onChange={(e) => handleChange('additionalNotes', e.target.value)}
                    placeholder="Any additional information about your assets, file locations, or special requirements?"
                    className="min-h-[100px] focus:outline-none"
                />
            </div>

            <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-950/20">
                <h4 className="mb-2 font-medium text-blue-900 dark:text-blue-100">File Upload Information</h4>
                <ul className="space-y-1 text-sm text-blue-800 dark:text-blue-200">
                    <li>• Drag and drop files or click to browse</li>
                    <li>• We accept files up to 50MB each</li>
                    <li>• Multiple files can be uploaded per category</li>
                    <li>• You can also share files via Dropbox, Google Drive, or email</li>
                    <li>• Don't worry if you don't have everything ready - we can collect files later</li>
                </ul>
            </div>
        </div>
    );
}