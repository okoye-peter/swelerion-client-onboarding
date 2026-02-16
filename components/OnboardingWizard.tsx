import React, { useState } from 'react';
import { createSubmission } from '@/app/actions/submissions';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { CheckCircle, Circle, ArrowLeft, ArrowRight } from 'lucide-react';
import { ClientInfoForm, validateClientInfo } from './ClientInfoForm';
import { ProjectDetailsForm, validateProjectDetails } from './ProjectDetailsForm';
import { CreativeBriefForm, validateCreativeBrief } from './CreativeBriefForm';
import { FileUploadForm } from './FileUploadForm';
import { ReviewStep } from './ReviewStep';

export interface FileData {
    id: string;
    name: string;
    size: number;
    type: string;
    preview?: string;
    file?: File;
    path?: string;
    url?: string;
}

export interface OnboardingData {
    clientInfo: {
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        company: string;
        website: string;
        role: string;
    };
    projectDetails: {
        projectName: string;
        projectType: string;
        timeline: string;
        budget: string;
        startDate: string;
        deliverables: string[];
    };
    creativeBrief: {
        goals: string;
        targetAudience: string;
        style: string;
        inspiration: string;
        mustHaves: string;
        mustNotHaves: string;
    };
    assets: {
        hasLogo: boolean;
        hasBrandGuidelines: boolean;
        hasExistingAssets: boolean;
        additionalNotes: string;
        logoFiles: FileData[];
        guidelineFiles: FileData[];
        marketingFiles: FileData[];
        inspirationFiles: FileData[];
    };
}

const initialData: OnboardingData = {
    clientInfo: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        company: '',
        website: '',
        role: '',
    },
    projectDetails: {
        projectName: '',
        projectType: '',
        timeline: '',
        budget: '',
        startDate: '',
        deliverables: [],
    },
    creativeBrief: {
        goals: '',
        targetAudience: '',
        style: '',
        inspiration: '',
        mustHaves: '',
        mustNotHaves: '',
    },
    assets: {
        hasLogo: false,
        hasBrandGuidelines: false,
        hasExistingAssets: false,
        additionalNotes: '',
        logoFiles: [],
        guidelineFiles: [],
        marketingFiles: [],
        inspirationFiles: [],
    },
};

const steps = [
    { id: 1, name: 'Client Info', description: 'Basic contact information' },
    { id: 2, name: 'Project Details', description: 'Timeline, budget, and scope' },
    { id: 3, name: 'Creative Brief', description: 'Vision and requirements' },
    { id: 4, name: 'Assets & Files', description: 'Upload brand materials' },
    { id: 5, name: 'Review', description: 'Confirm and submit' },
];

export function OnboardingWizard() {
    const [currentStep, setCurrentStep] = useState(1);
    const [data, setData] = useState<OnboardingData>(initialData);
    const [isComplete, setIsComplete] = useState(false);
    const [showErrors, setShowErrors] = useState(false);

    const [isSubmitting, setIsSubmitting] = useState(false);

    const updateData = <K extends keyof OnboardingData>(section: K, newData: Partial<OnboardingData[K]>) => {
        setData((prev: OnboardingData) => ({
            ...prev,
            [section]: { ...prev[section], ...newData }
        }));
    };

    const validateCurrentStep = (): boolean => {
        switch (currentStep) {
            case 1:
                return validateClientInfo(data.clientInfo);
            case 2:
                return validateProjectDetails(data.projectDetails);
            case 3:
                return validateCreativeBrief(data.creativeBrief);
            case 4:
                return true; // No required fields in step 4
            case 5:
                return true; // Review step
            default:
                return true;
        }
    };

    const nextStep = () => {
        if (!validateCurrentStep()) {
            setShowErrors(true);
            return;
        }

        setShowErrors(false);
        if (currentStep < steps.length) {
            setCurrentStep(currentStep + 1);
        }
    };

    const prevStep = () => {
        setShowErrors(false);
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        try {
            // Upload files first
            const uploadedAssets = { ...data.assets };
            const fileCategories: (keyof typeof uploadedAssets)[] = ['logoFiles', 'guidelineFiles', 'marketingFiles', 'inspirationFiles'];

            for (const category of fileCategories) {
                const files = uploadedAssets[category] as FileData[];
                if (Array.isArray(files)) {
                    const updatedFiles = await Promise.all(files.map(async (fileData) => {
                        if (fileData.file) {
                            const formData = new FormData();
                            formData.append('file', fileData.file);

                            const { uploadFile } = await import('@/app/actions/upload');
                            const result = await uploadFile(formData);

                            if (result.success) {
                                return { ...fileData, path: result.url, url: result.url }; // Using public URL as path for now
                            }
                        }
                        return fileData;
                    }));
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    (uploadedAssets as any)[category] = updatedFiles;
                }
            }

            // Create submission with uploaded file paths
            await createSubmission({
                ...data,
                assets: uploadedAssets
            });
            setIsComplete(true);
        } catch (error) {
            console.error('Error submitting form:', error);
            // Ideally show an error toast here
        } finally {
            setIsSubmitting(false);
        }
    };

    const progress = (currentStep / steps.length) * 100;

    if (isComplete) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center p-4">
                <Card className="w-full max-w-md">
                    <CardContent className="p-8 text-center">
                        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <CheckCircle className="w-8 h-8 text-white" />
                        </div>
                        <h2 className="mb-2">Welcome aboard!</h2>
                        <p className="text-muted-foreground mb-6">
                            Thank you for completing the onboarding process. We'll review your information and get back to you within 24 hours.
                        </p>
                        <Button onClick={() => {
                            setIsComplete(false);
                            setCurrentStep(1);
                            setData(initialData);
                        }}>
                            Start New Onboarding
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background relative">
            {isSubmitting && (
                <div className="fixed inset-0 z-50 h-screen w-screen flex items-center justify-center bg-background/80 backdrop-blur-sm">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                        <p className="text-lg font-medium">Submitting your onboarding data...</p>
                        <p className="text-sm text-muted-foreground">Please wait while we upload your files.</p>
                    </div>
                </div>
            )}
            <div className="max-w-4xl mx-auto p-6">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="mb-2">Client Onboarding</h1>
                    <p className="text-muted-foreground">
                        Let's gather the information we need to kickstart your project
                    </p>
                </div>

                {/* Progress */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm">Step {currentStep} of {steps.length}</span>
                        <span className="text-sm text-muted-foreground">{Math.round(progress)}% complete</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                </div>

                {/* Steps indicator */}
                <div className="flex items-center justify-between mb-8 overflow-x-auto">
                    {steps.map((step, index) => (
                        <div key={step.id} className="flex items-center min-w-0">
                            <div className="flex flex-col items-center">
                                <div className="flex items-center justify-center w-8 h-8 rounded-full border-2 mb-2 transition-colors">
                                    {currentStep > step.id ? (
                                        <CheckCircle className="w-5 h-5 text-primary" />
                                    ) : currentStep === step.id ? (
                                        <div className="w-4 h-4 bg-primary rounded-full" />
                                    ) : (
                                        <Circle className="w-5 h-5 text-muted-foreground" />
                                    )}
                                </div>
                                <div className="text-center">
                                    <div className="text-sm font-medium">{step.name}</div>
                                    <div className="text-xs text-muted-foreground hidden sm:block">
                                        {step.description}
                                    </div>
                                </div>
                            </div>
                            {index < steps.length - 1 && (
                                <div className="w-12 h-0.5 bg-border mx-4 hidden sm:block" />
                            )}
                        </div>
                    ))}
                </div>

                {/* Form Content */}
                <Card>
                    <CardHeader>
                        <CardTitle>{steps[currentStep - 1].name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {currentStep === 1 && (
                            <ClientInfoForm
                                data={data.clientInfo}
                                onChange={(newData) => updateData('clientInfo', newData)}
                                showErrors={showErrors}
                            />
                        )}
                        {currentStep === 2 && (
                            <ProjectDetailsForm
                                data={data.projectDetails}
                                onChange={(newData) => updateData('projectDetails', newData)}
                                showErrors={showErrors}
                            />
                        )}
                        {currentStep === 3 && (
                            <CreativeBriefForm
                                data={data.creativeBrief}
                                onChange={(newData) => updateData('creativeBrief', newData)}
                                showErrors={showErrors}
                            />
                        )}
                        {currentStep === 4 && (
                            <FileUploadForm
                                data={data.assets}
                                onChange={(newData) => updateData('assets', newData)}
                            />
                        )}
                        {currentStep === 5 && (
                            <ReviewStep data={data} />
                        )}
                    </CardContent>
                </Card>

                {/* Navigation */}
                <div className="flex justify-between mt-6">
                    <Button
                        variant="outline"
                        onClick={prevStep}
                        disabled={currentStep === 1 || isSubmitting}
                        className="flex items-center gap-2"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Previous
                    </Button>

                    {currentStep === steps.length ? (
                        <Button onClick={handleSubmit} disabled={isSubmitting} className="flex items-center gap-2">
                            {isSubmitting ? 'Submitting...' : 'Submit Onboarding'}
                            {!isSubmitting && <CheckCircle className="w-4 h-4" />}
                        </Button>
                    ) : (
                        <Button onClick={nextStep} disabled={isSubmitting} className="flex items-center gap-2">
                            Next
                            <ArrowRight className="w-4 h-4" />
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}