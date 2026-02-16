import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { getSubmissionById } from '@/app/actions/submissions';
import { Submission } from './SubmissionsList';
import {
    ArrowLeft,
    User,
    Building2,
    Mail,
    Phone,
    Globe,
    Briefcase,
    Target,
    Calendar,
    DollarSign,
    FileText,
    Palette,
    Download,
    Eye,
} from 'lucide-react';

export function SubmissionDetails() {
    const params = useParams<{ id: string }>();
    const router = useRouter();
    const id = params?.id;
    const [submission, setSubmission] = useState<Submission | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSubmission = async () => {
            if (!id) return;
            setLoading(true);
            try {
                const result = await getSubmissionById(id);
                if (result) {
                    setSubmission(result as unknown as Submission);
                }
            } catch (error) {
                console.error("Failed to fetch submission", error);
            } finally {
                setLoading(false);
            }
        };
        fetchSubmission();
    }, [id]);

    if (loading) {
        return (
            <div className="container max-w-4xl py-8 mx-auto">
                <Card>
                    <CardContent className="py-12 text-center">
                        <p className="text-muted-foreground">Loading specific submission details...</p>
                    </CardContent>
                </Card>
            </div>
        );
    }

    if (!submission) {
        return (
            <div className="container max-w-4xl py-8 mx-auto">
                <Card>
                    <CardContent className="py-12 text-center">
                        <FileText className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                        <h2 className="mb-2 text-xl font-semibold">Submission Not Found</h2>
                        <p className="mb-6 text-muted-foreground">
                            The submission you're looking for doesn't exist.
                        </p>
                        <Button onClick={() => router.push('/submissions')}>
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Submissions
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const getStatusBadge = () => {
        const statusMap: Record<string, { label: string; variant: "default" | "secondary" | "outline" }> = {
            new: { label: 'New', variant: 'default' },
            'in-progress': { label: 'In Progress', variant: 'secondary' },
            completed: { label: 'Completed', variant: 'outline' },
        };
        const defaultStatus = { label: submission.status, variant: 'outline' as const };
        const { label, variant } = statusMap[submission.status] || defaultStatus;
        return <Badge variant={variant}>{label}</Badge>;
    };

    const InfoRow = ({ icon: Icon, label, value }: { icon: any; label: string; value: string | undefined | null }) => (
        <div className="flex items-start gap-3 py-3 border-b last:border-0">
            <Icon className="w-5 h-5 mt-0.5 text-muted-foreground shrink-0" />
            <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-muted-foreground">{label}</p>
                <p className="mt-1 break-words">{value || '-'}</p>
            </div>
        </div>
    );

    return (
        <div className="container max-w-4xl py-8 mx-auto">
            {/* Header */}
            <div className="flex flex-col gap-4 mb-6 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-4">
                    <Button variant="outline" size="sm" onClick={() => router.push('/submissions')}>
                        <ArrowLeft className="w-4 h-4" />
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold">Submission #{submission.id.substring(0, 8)}...</h1>
                        <p className="text-sm text-muted-foreground">
                            Submitted {formatDate(submission.submittedAt)}
                        </p>
                    </div>
                </div>
                {getStatusBadge()}
            </div>

            <div className="space-y-6">
                {/* Client Information */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <User className="w-5 h-5" />
                            Client Information
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-0">
                            <InfoRow
                                icon={User}
                                label="Full Name"
                                value={`${submission.clientInfo.firstName} ${submission.clientInfo.lastName}`}
                            />
                            <InfoRow icon={Mail} label="Email" value={submission.clientInfo.email} />
                            <InfoRow icon={Phone} label="Phone" value={submission.clientInfo.phone} />
                            <InfoRow
                                icon={Building2}
                                label="Company"
                                value={submission.clientInfo.company}
                            />
                            <InfoRow
                                icon={Globe}
                                label="Website"
                                value={submission.clientInfo.website}
                            />
                            <InfoRow
                                icon={Briefcase}
                                label="Role"
                                value={submission.clientInfo.role}
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Project Details */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Target className="w-5 h-5" />
                            Project Details
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-0">
                            <InfoRow
                                icon={FileText}
                                label="Project Name"
                                value={submission.projectDetails.projectName}
                            />
                            <InfoRow
                                icon={Palette}
                                label="Project Type"
                                value={submission.projectDetails.projectType}
                            />
                            <InfoRow
                                icon={Calendar}
                                label="Timeline"
                                value={submission.projectDetails.timeline}
                            />
                            <InfoRow
                                icon={DollarSign}
                                label="Budget"
                                value={submission.projectDetails.budget}
                            />
                            <InfoRow
                                icon={Calendar}
                                label="Start Date"
                                value={new Date(
                                    submission.projectDetails.startDate
                                ).toLocaleDateString('en-US', {
                                    month: 'long',
                                    day: 'numeric',
                                    year: 'numeric',
                                })}
                            />
                            <div className="py-3">
                                <p className="mb-2 text-sm font-medium text-muted-foreground">
                                    Deliverables
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {submission.projectDetails.deliverables.map((deliverable, index) => (
                                        <Badge key={index} variant="outline">
                                            {deliverable}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Creative Brief */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Palette className="w-5 h-5" />
                            Creative Brief
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <h4 className="mb-2 text-sm font-medium text-muted-foreground">
                                Project Goals
                            </h4>
                            <p className="text-sm leading-relaxed">
                                {submission.creativeBrief.goals}
                            </p>
                        </div>
                        <div>
                            <h4 className="mb-2 text-sm font-medium text-muted-foreground">
                                Target Audience
                            </h4>
                            <p className="text-sm leading-relaxed">
                                {submission.creativeBrief.targetAudience}
                            </p>
                        </div>
                        <div>
                            <h4 className="mb-2 text-sm font-medium text-muted-foreground">
                                Preferred Style
                            </h4>
                            <Badge variant="outline">{submission.creativeBrief.style}</Badge>
                        </div>
                        {submission.creativeBrief.inspiration && (
                            <div>
                                <h4 className="mb-2 text-sm font-medium text-muted-foreground">
                                    Inspiration
                                </h4>
                                <p className="text-sm leading-relaxed">
                                    {submission.creativeBrief.inspiration}
                                </p>
                            </div>
                        )}
                        {submission.creativeBrief.mustHaves && (
                            <div>
                                <h4 className="mb-2 text-sm font-medium text-muted-foreground">
                                    Must Haves
                                </h4>
                                <p className="text-sm leading-relaxed">
                                    {submission.creativeBrief.mustHaves}
                                </p>
                            </div>
                        )}
                        {submission.creativeBrief.mustNotHaves && (
                            <div>
                                <h4 className="mb-2 text-sm font-medium text-muted-foreground">
                                    Must Not Haves
                                </h4>
                                <p className="text-sm leading-relaxed">
                                    {submission.creativeBrief.mustNotHaves}
                                </p>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Assets & Files */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <FileText className="w-5 h-5" />
                            Assets & Files
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <h4 className="mb-3 text-sm font-medium">Current Assets</h4>
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <div
                                        className={`w-4 h-4 rounded-full ${submission.assets.hasLogo
                                            ? 'bg-green-500'
                                            : 'bg-gray-300'
                                            }`}
                                    />
                                    <span className="text-sm">Existing Logo</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div
                                        className={`w-4 h-4 rounded-full ${submission.assets.hasBrandGuidelines
                                            ? 'bg-green-500'
                                            : 'bg-gray-300'
                                            }`}
                                    />
                                    <span className="text-sm">Brand Guidelines</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div
                                        className={`w-4 h-4 rounded-full ${submission.assets.hasExistingAssets
                                            ? 'bg-green-500'
                                            : 'bg-gray-300'
                                            }`}
                                    />
                                    <span className="text-sm">Other Marketing Materials</span>
                                </div>
                            </div>
                        </div>

                        {submission.assets.additionalNotes && (
                            <div>
                                <h4 className="mb-2 text-sm font-medium text-muted-foreground">
                                    Additional Notes
                                </h4>
                                <p className="text-sm leading-relaxed">
                                    {submission.assets.additionalNotes}
                                </p>
                            </div>
                        )}

                        {/* File Upload Categories */}
                        <div className="pt-4 border-t">
                            <h4 className="mb-3 text-sm font-medium">Uploaded Files</h4>
                            <div className="space-y-3">
                                {[
                                    { label: 'Logo Files', files: submission.assets.logoFiles },
                                    {
                                        label: 'Brand Guidelines',
                                        files: submission.assets.guidelineFiles,
                                    },
                                    {
                                        label: 'Marketing Materials',
                                        files: submission.assets.marketingFiles,
                                    },
                                    {
                                        label: 'Inspiration',
                                        files: submission.assets.inspirationFiles,
                                    },
                                ].map((category) => (
                                    <div key={category.label}>
                                        <p className="mb-2 text-sm text-muted-foreground">
                                            {category.label}
                                        </p>
                                        {category.files.length > 0 ? (
                                            <div className="space-y-2">
                                                {category.files.map((file: any) => (
                                                    <div
                                                        key={file.id}
                                                        className="flex items-center justify-between p-2 rounded-md bg-muted"
                                                    >
                                                        <span className="text-sm truncate max-w-[200px]" title={file.name}>
                                                            {file.name}
                                                        </span>
                                                        <div className="flex gap-1">
                                                            {file.url && (
                                                                <>
                                                                    <Button
                                                                        variant="ghost"
                                                                        size="icon"
                                                                        title="View File"
                                                                        onClick={() => window.open(file.url, '_blank')}
                                                                    >
                                                                        <Eye className="w-4 h-4" />
                                                                    </Button>
                                                                    <a href={file.url} download target="_blank" rel="noopener noreferrer">
                                                                        <Button variant="ghost" size="icon" title="Download File">
                                                                            <Download className="w-4 h-4" />
                                                                        </Button>
                                                                    </a>
                                                                </>
                                                            )}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <p className="text-sm text-muted-foreground">
                                                No files uploaded
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
