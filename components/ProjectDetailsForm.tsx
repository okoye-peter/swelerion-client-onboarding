import React from 'react';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Checkbox } from './ui/checkbox';

interface ProjectDetailsData {
    projectName: string;
    projectType: string;
    timeline: string;
    budget: string;
    startDate: string;
    deliverables: string[];
}

interface ProjectDetailsFormProps {
    data: ProjectDetailsData;
    onChange: (data: Partial<ProjectDetailsData>) => void;
    showErrors?: boolean;
}

export function validateProjectDetails(data: ProjectDetailsData): boolean {
    return !!(
        data.projectName.trim() &&
        data.projectType.trim() &&
        data.timeline.trim() &&
        data.budget.trim() &&
        data.deliverables.length > 0
    );
}

const deliverableOptions = [
    { id: 'logo', label: 'Logo Design' },
    { id: 'branding', label: 'Brand Identity Package' },
    { id: 'website', label: 'Website Design' },
    { id: 'business-cards', label: 'Business Cards' },
    { id: 'brochures', label: 'Brochures/Flyers' },
    { id: 'social-media', label: 'Social Media Graphics' },
    { id: 'packaging', label: 'Packaging Design' },
    { id: 'marketing', label: 'Marketing Materials' },
    { id: 'presentation', label: 'Presentation Design' },
    { id: 'other', label: 'Other (specify in notes)' },
];

export function ProjectDetailsForm({ data, onChange, showErrors = false }: ProjectDetailsFormProps) {
    const handleChange = (field: keyof ProjectDetailsData, value: string) => {
        onChange({ [field]: value });
    };

    const handleDeliverableChange = (deliverable: string, checked: boolean) => {
        const newDeliverables = checked
            ? [...data.deliverables, deliverable]
            : data.deliverables.filter(d => d !== deliverable);
        onChange({ deliverables: newDeliverables });
    };

    const errors = {
        projectName: showErrors && data.projectName.length === 0,
        projectType: showErrors && data.projectType.length === 0,
        timeline: showErrors && data.timeline.length === 0,
        budget: showErrors && data.budget.length === 0,
        deliverables: showErrors && data.deliverables.length === 0,
        startDate: showErrors && !data.startDate,
    };

    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <Label htmlFor="projectName">Project Name *</Label>
                <Input
                    id="projectName"
                    value={data.projectName}
                    onChange={(e) => handleChange('projectName', e.target.value)}
                    placeholder="e.g., Brand refresh for Q2 launch"
                    style={errors.projectName ? { borderColor: '#ef4444', outline: 'none' } : { outline: 'none' }}
                    required
                />
                {errors.projectName && (
                    <p className="text-xs mt-1" style={{ color: '#dc2626' }}>Project name is required</p>
                )}
            </div>

            <div className="space-y-2">
                <Label htmlFor="projectType">Project Type *</Label>
                <Select value={data.projectType} onValueChange={(value) => handleChange('projectType', value)}>
                    <SelectTrigger style={errors.projectType ? { borderColor: '#ef4444', outline: 'none' } : { outline: 'none' }}>
                        <SelectValue placeholder="Select project type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="new-brand">New Brand Creation</SelectItem>
                        <SelectItem value="rebrand">Brand Refresh/Rebrand</SelectItem>
                        <SelectItem value="website">Website Design</SelectItem>
                        <SelectItem value="marketing">Marketing Campaign</SelectItem>
                        <SelectItem value="product-design">Product Design</SelectItem>
                        <SelectItem value="packaging">Packaging Design</SelectItem>
                        <SelectItem value="digital-assets">Digital Assets</SelectItem>
                        <SelectItem value="print-design">Print Design</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                </Select>
                {errors.projectType && (
                    <p className="text-xs mt-1" style={{ color: '#dc2626' }}>Project type is required</p>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label htmlFor="timeline">Project Timeline *</Label>
                    <Select value={data.timeline} onValueChange={(value) => handleChange('timeline', value)}>
                        <SelectTrigger style={errors.timeline ? { borderColor: '#ef4444', outline: 'none' } : { outline: 'none' }}>
                            <SelectValue placeholder="Select timeline" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="rush">Rush (1-2 weeks)</SelectItem>
                            <SelectItem value="standard">Standard (3-4 weeks)</SelectItem>
                            <SelectItem value="relaxed">Relaxed (5-8 weeks)</SelectItem>
                            <SelectItem value="extended">Extended (2+ months)</SelectItem>
                            <SelectItem value="flexible">Flexible timeline</SelectItem>
                        </SelectContent>
                    </Select>
                    {errors.timeline && (
                        <p className="text-xs mt-1" style={{ color: '#dc2626' }}>Timeline is required</p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="budget">Budget Range *</Label>
                    <Select value={data.budget} onValueChange={(value) => handleChange('budget', value)}>
                        <SelectTrigger style={errors.budget ? { borderColor: '#ef4444', outline: 'none' } : { outline: 'none' }}>
                            <SelectValue placeholder="Select budget range" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="under-5k">Under $5,000</SelectItem>
                            <SelectItem value="5k-10k">$5,000 - $10,000</SelectItem>
                            <SelectItem value="10k-25k">$10,000 - $25,000</SelectItem>
                            <SelectItem value="25k-50k">$25,000 - $50,000</SelectItem>
                            <SelectItem value="over-50k">$50,000+</SelectItem>
                            <SelectItem value="discuss">Prefer to discuss</SelectItem>
                        </SelectContent>
                    </Select>
                    {errors.budget && (
                        <p className="text-xs mt-1" style={{ color: '#dc2626' }}>Budget range is required</p>
                    )}
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="startDate">Preferred Start Date</Label>
                <Input
                    id="startDate"
                    type="date"
                    value={data.startDate}
                    onChange={(e) => handleChange('startDate', e.target.value)}
                />
            </div>

            <div className="space-y-4">
                <Label>What deliverables do you need? *</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {deliverableOptions.map((option) => (
                        <div key={option.id} className="flex items-center space-x-2">
                            <Checkbox
                                id={option.id}
                                checked={data.deliverables.includes(option.id)}
                                onCheckedChange={(checked) =>
                                    handleDeliverableChange(option.id, checked as boolean)
                                }
                            />
                            <Label
                                htmlFor={option.id}
                                className="text-sm font-normal cursor-pointer"
                            >
                                {option.label}
                            </Label>
                        </div>
                    ))}
                </div>
                {errors.deliverables && (
                    <p className="text-xs mt-1" style={{ color: '#dc2626' }}>Please select at least one deliverable</p>
                )}
            </div>

            <div className="bg-muted/50 p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">
                    <strong>Timeline & Budget:</strong> These help us provide accurate estimates and plan resources appropriately. We can discuss adjustments during our initial consultation.
                </p>
            </div>
        </div>
    );
}