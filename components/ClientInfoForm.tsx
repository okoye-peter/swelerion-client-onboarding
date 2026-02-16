import React from 'react';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface ClientInfoData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    company: string;
    website: string;
    role: string;
}

interface ClientInfoFormProps {
    data: ClientInfoData;
    onChange: (data: Partial<ClientInfoData>) => void;
    showErrors?: boolean;
}

export function validateClientInfo(data: ClientInfoData): boolean {
    return !!(
        data.firstName.trim() &&
        data.lastName.trim() &&
        data.email.trim() &&
        data.company.trim() &&
        data.role.trim()
    );
}

export function ClientInfoForm({ data, onChange, showErrors = false }: ClientInfoFormProps) {
    const handleChange = (field: keyof ClientInfoData, value: string) => {
        onChange({ [field]: value });
    };

    const errors = {
        firstName: showErrors && data.firstName.length === 0,
        lastName: showErrors && data.lastName.length === 0,
        email: showErrors && data.email.length === 0,
        company: showErrors && data.company.length === 0,
        role: showErrors && data.role.length === 0,
    };

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                        id="firstName"
                        value={data.firstName}
                        onChange={(e) => handleChange('firstName', e.target.value)}
                        placeholder="Enter your first name"
                        style={errors.firstName ? { borderColor: '#ef4444', outline: 'none' } : { outline: 'none' }}
                        className='focus:outline-none'
                        required
                    />
                    {errors.firstName && (
                        <p className="mt-1 text-xs" style={{ color: '#dc2626' }}>First name is required</p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                        id="lastName"
                        value={data.lastName}
                        onChange={(e) => handleChange('lastName', e.target.value)}
                        placeholder="Enter your last name"
                        style={errors.lastName ? { borderColor: '#ef4444', outline: 'none' } : { outline: 'none' }}
                        className='focus:outline-none'
                        required
                    />
                    {errors.lastName && (
                        <p className="mt-1 text-xs" style={{ color: '#dc2626' }}>Last name is required</p>
                    )}
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                    id="email"
                    type="email"
                    value={data.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    placeholder="your.email@company.com"
                    style={errors.email ? { borderColor: '#ef4444', outline: 'none' } : { outline: 'none' }}
                    className='focus:outline-none'
                    required
                />
                {errors.email && (
                    <p className="mt-1 text-xs" style={{ color: '#dc2626' }}>Email address is required</p>
                )}
            </div>

            <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                    id="phone"
                    type="tel"
                    value={data.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    className='focus:outline-none'
                    placeholder="+1 (555) 123-4567"
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="company">Company Name *</Label>
                <Input
                    id="company"
                    value={data.company}
                    onChange={(e) => handleChange('company', e.target.value)}
                    placeholder="Your company name"
                    style={errors.company ? { borderColor: '#ef4444', outline: 'none' } : { outline: 'none' }}
                    className='focus:outline-none'
                    required
                />
                {errors.company && (
                    <p className="mt-1 text-xs" style={{ color: '#dc2626' }}>Company name is required</p>
                )}
            </div>

            <div className="space-y-2">
                <Label htmlFor="website">Company Website</Label>
                <Input
                    id="website"
                    type="url"
                    value={data.website}
                    onChange={(e) => handleChange('website', e.target.value)}
                    className='focus:outline-none'
                    placeholder="https://www.yourcompany.com"
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="role">Your Role *</Label>
                <Select value={data.role} onValueChange={(value: string) => handleChange('role', value)}>
                    <SelectTrigger style={errors.role ? { borderColor: '#ef4444', outline: 'none' } : { outline: 'none' }}>
                        <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="ceo">CEO/Founder</SelectItem>
                        <SelectItem value="marketing-director">Marketing Director</SelectItem>
                        <SelectItem value="marketing-manager">Marketing Manager</SelectItem>
                        <SelectItem value="brand-manager">Brand Manager</SelectItem>
                        <SelectItem value="creative-director">Creative Director</SelectItem>
                        <SelectItem value="product-manager">Product Manager</SelectItem>
                        <SelectItem value="business-owner">Business Owner</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                </Select>
                {errors.role && (
                    <p className="mt-1 text-xs" style={{ color: '#dc2626' }}>Role is required</p>
                )}
            </div>

            <div className="p-4 rounded-lg bg-muted/50">
                <p className="text-sm text-muted-foreground">
                    <strong>Why we need this information:</strong> Your contact details help us communicate effectively throughout the project. Company information helps us understand your business context and tailor our approach accordingly.
                </p>
            </div>
        </div>
    );
}