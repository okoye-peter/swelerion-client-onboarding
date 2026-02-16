import React from 'react';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface CreativeBriefData {
    goals: string;
    targetAudience: string;
    style: string;
    inspiration: string;
    mustHaves: string;
    mustNotHaves: string;
}

interface CreativeBriefFormProps {
    data: CreativeBriefData;
    onChange: (data: Partial<CreativeBriefData>) => void;
    showErrors?: boolean;
}

export function validateCreativeBrief(data: CreativeBriefData): boolean {
    return !!(
        data.goals.trim() &&
        data.targetAudience.trim() &&
        data.style.trim()
    );
}

export function CreativeBriefForm({ data, onChange, showErrors = false }: CreativeBriefFormProps) {
    const handleChange = (field: keyof CreativeBriefData, value: string) => {
        onChange({ [field]: value });
    };

    const errors = {
        goals: showErrors && data.goals.length === 0,
        targetAudience: showErrors && data.targetAudience.length === 0,
        style: showErrors && data.style.length === 0,
    };

    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <Label htmlFor="goals">Project Goals & Objectives *</Label>
                <Textarea
                    id="goals"
                    value={data.goals}
                    onChange={(e) => handleChange('goals', e.target.value)}
                    placeholder="What do you want to achieve with this project? What problems are you solving? What success looks like?"
                    className="min-h-[120px]"
                    style={errors.goals ? { borderColor: '#ef4444', outline: 'none' } : { outline: 'none' }}
                    required
                />
                {errors.goals && (
                    <p className="text-xs mt-1" style={{ color: '#dc2626' }}>Project goals are required</p>
                )}
                <p className="text-xs text-muted-foreground">
                    Be specific about your business objectives and desired outcomes.
                </p>
            </div>

            <div className="space-y-2">
                <Label htmlFor="targetAudience">Target Audience *</Label>
                <Textarea
                    id="targetAudience"
                    value={data.targetAudience}
                    onChange={(e) => handleChange('targetAudience', e.target.value)}
                    placeholder="Who is your primary audience? Include demographics, interests, pain points, and behaviors."
                    className="min-h-[100px]"
                    style={errors.targetAudience ? { borderColor: '#ef4444', outline: 'none' } : { outline: 'none' }}
                    required
                />
                {errors.targetAudience && (
                    <p className="text-xs mt-1" style={{ color: '#dc2626' }}>Target audience is required</p>
                )}
                <p className="text-xs text-muted-foreground">
                    The more detailed your audience description, the better we can tailor the design.
                </p>
            </div>

            <div className="space-y-2">
                <Label htmlFor="style">Preferred Style & Aesthetic *</Label>
                <Select value={data.style} onValueChange={(value) => handleChange('style', value)}>
                    <SelectTrigger style={errors.style ? { borderColor: '#ef4444', outline: 'none' } : { outline: 'none' }}>
                        <SelectValue placeholder="Select your preferred style" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="modern-minimal">Modern & Minimal</SelectItem>
                        <SelectItem value="professional-corporate">Professional & Corporate</SelectItem>
                        <SelectItem value="creative-artistic">Creative & Artistic</SelectItem>
                        <SelectItem value="playful-fun">Playful & Fun</SelectItem>
                        <SelectItem value="luxury-premium">Luxury & Premium</SelectItem>
                        <SelectItem value="vintage-retro">Vintage & Retro</SelectItem>
                        <SelectItem value="tech-futuristic">Tech & Futuristic</SelectItem>
                        <SelectItem value="organic-natural">Organic & Natural</SelectItem>
                        <SelectItem value="bold-energetic">Bold & Energetic</SelectItem>
                        <SelectItem value="classic-timeless">Classic & Timeless</SelectItem>
                        <SelectItem value="not-sure">Not sure / Need guidance</SelectItem>
                    </SelectContent>
                </Select>
                {errors.style && (
                    <p className="text-xs mt-1" style={{ color: '#dc2626' }}>Preferred style is required</p>
                )}
            </div>

            <div className="space-y-2">
                <Label htmlFor="inspiration">Inspiration & References</Label>
                <Textarea
                    id="inspiration"
                    value={data.inspiration}
                    onChange={(e) => handleChange('inspiration', e.target.value)}
                    placeholder="Share any websites, brands, designs, or styles you admire. Include URLs if possible."
                    className="min-h-[100px]"
                />
                <p className="text-xs text-muted-foreground">
                    Examples help us understand your taste and preferences quickly.
                </p>
            </div>

            <div className="space-y-2">
                <Label htmlFor="mustHaves">Must-Haves & Requirements</Label>
                <Textarea
                    id="mustHaves"
                    value={data.mustHaves}
                    onChange={(e) => handleChange('mustHaves', e.target.value)}
                    placeholder="What elements are absolutely essential? Colors, fonts, messaging, specific features, etc."
                    className="min-h-[80px]"
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="mustNotHaves">Avoid & Dislikes</Label>
                <Textarea
                    id="mustNotHaves"
                    value={data.mustNotHaves}
                    onChange={(e) => handleChange('mustNotHaves', e.target.value)}
                    placeholder="What should we definitely avoid? Colors, styles, approaches you dislike?"
                    className="min-h-[80px]"
                />
            </div>

            <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="mb-2">Creative Brief Tips</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Be specific about emotions you want to evoke</li>
                    <li>• Consider your competitors - what makes you different?</li>
                    <li>• Think about where this design will be used (digital, print, signage)</li>
                    <li>• Include any brand guidelines or existing style elements</li>
                </ul>
            </div>
        </div>
    );
}