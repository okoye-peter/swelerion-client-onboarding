import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { CheckCircle, User, Briefcase, Palette, Upload } from 'lucide-react';
import type { OnboardingData } from './OnboardingWizard';

interface ReviewStepProps {
  data: OnboardingData;
}

export function ReviewStep({ data }: ReviewStepProps) {
  const deliverableLabels = {
    'logo': 'Logo Design',
    'branding': 'Brand Identity Package',
    'website': 'Website Design',
    'business-cards': 'Business Cards',
    'brochures': 'Brochures/Flyers',
    'social-media': 'Social Media Graphics',
    'packaging': 'Packaging Design',
    'marketing': 'Marketing Materials',
    'presentation': 'Presentation Design',
    'other': 'Other',
  };

  const styleLabels = {
    'modern-minimal': 'Modern & Minimal',
    'professional-corporate': 'Professional & Corporate',
    'creative-artistic': 'Creative & Artistic',
    'playful-fun': 'Playful & Fun',
    'luxury-premium': 'Luxury & Premium',
    'vintage-retro': 'Vintage & Retro',
    'tech-futuristic': 'Tech & Futuristic',
    'organic-natural': 'Organic & Natural',
    'bold-energetic': 'Bold & Energetic',
    'classic-timeless': 'Classic & Timeless',
    'not-sure': 'Not sure / Need guidance',
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="mb-2">Review Your Information</h3>
        <p className="text-muted-foreground">
          Please review all the information below before submitting your onboarding request.
        </p>
      </div>

      {/* Client Information */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <User className="w-5 h-5" />
            Client Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Name</p>
              <p>{data.clientInfo.firstName} {data.clientInfo.lastName}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Email</p>
              <p>{data.clientInfo.email}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Company</p>
              <p>{data.clientInfo.company}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Role</p>
              <p>{data.clientInfo.role}</p>
            </div>
            {data.clientInfo.phone && (
              <div>
                <p className="text-sm font-medium text-muted-foreground">Phone</p>
                <p>{data.clientInfo.phone}</p>
              </div>
            )}
            {data.clientInfo.website && (
              <div>
                <p className="text-sm font-medium text-muted-foreground">Website</p>
                <p className="text-blue-600 hover:underline">
                  <a href={data.clientInfo.website} target="_blank" rel="noopener noreferrer">
                    {data.clientInfo.website}
                  </a>
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Project Details */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Briefcase className="w-5 h-5" />
            Project Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Project Name</p>
              <p>{data.projectDetails.projectName}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Type</p>
                <p>{data.projectDetails.projectType}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Timeline</p>
                <p>{data.projectDetails.timeline}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Budget</p>
                <p>{data.projectDetails.budget}</p>
              </div>
            </div>
            {data.projectDetails.startDate && (
              <div>
                <p className="text-sm font-medium text-muted-foreground">Preferred Start Date</p>
                <p>{new Date(data.projectDetails.startDate).toLocaleDateString()}</p>
              </div>
            )}
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-2">Deliverables</p>
              <div className="flex flex-wrap gap-2">
                {data.projectDetails.deliverables.map((deliverable) => (
                  <Badge key={deliverable} variant="secondary">
                    {deliverableLabels[deliverable as keyof typeof deliverableLabels] || deliverable}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Creative Brief */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Palette className="w-5 h-5" />
            Creative Brief
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Preferred Style</p>
              <p>{styleLabels[data.creativeBrief.style as keyof typeof styleLabels] || data.creativeBrief.style}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Goals & Objectives</p>
              <p className="text-sm">{data.creativeBrief.goals || 'Not specified'}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Target Audience</p>
              <p className="text-sm">{data.creativeBrief.targetAudience || 'Not specified'}</p>
            </div>
            {data.creativeBrief.inspiration && (
              <div>
                <p className="text-sm font-medium text-muted-foreground">Inspiration</p>
                <p className="text-sm">{data.creativeBrief.inspiration}</p>
              </div>
            )}
            {data.creativeBrief.mustHaves && (
              <div>
                <p className="text-sm font-medium text-muted-foreground">Must-Haves</p>
                <p className="text-sm">{data.creativeBrief.mustHaves}</p>
              </div>
            )}
            {data.creativeBrief.mustNotHaves && (
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avoid</p>
                <p className="text-sm">{data.creativeBrief.mustNotHaves}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Assets */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Upload className="w-5 h-5" />
            Assets & Files
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <CheckCircle className={`w-4 h-4 ${data.assets.hasLogo ? 'text-green-500' : 'text-muted-foreground'}`} />
              <span className={data.assets.hasLogo ? '' : 'text-muted-foreground'}>
                Existing Logo {data.assets.hasLogo ? 'Available' : 'Not Available'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className={`w-4 h-4 ${data.assets.hasBrandGuidelines ? 'text-green-500' : 'text-muted-foreground'}`} />
              <span className={data.assets.hasBrandGuidelines ? '' : 'text-muted-foreground'}>
                Brand Guidelines {data.assets.hasBrandGuidelines ? 'Available' : 'Not Available'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className={`w-4 h-4 ${data.assets.hasExistingAssets ? 'text-green-500' : 'text-muted-foreground'}`} />
              <span className={data.assets.hasExistingAssets ? '' : 'text-muted-foreground'}>
                Other Assets {data.assets.hasExistingAssets ? 'Available' : 'Not Available'}
              </span>
            </div>
            {data.assets.additionalNotes && (
              <div className="mt-4">
                <p className="text-sm font-medium text-muted-foreground">Additional Notes</p>
                <p className="text-sm">{data.assets.additionalNotes}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg">
        <h4 className="mb-2 text-green-900 dark:text-green-100">What happens next?</h4>
        <ul className="text-sm text-green-800 dark:text-green-200 space-y-1">
          <li>1. We'll review your information within 24 hours</li>
          <li>2. Schedule a discovery call to discuss your project in detail</li>
          <li>3. Provide a detailed proposal with timeline and pricing</li>
          <li>4. Begin the project once everything is approved</li>
        </ul>
      </div>
    </div>
  );
}