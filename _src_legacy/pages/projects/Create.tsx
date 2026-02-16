import React, { useMemo, useState, useRef, useEffect } from 'react'
import SiteHeader from '../../components/SiteHeader'
import { Link, useNavigate } from 'react-router-dom';
import ReUseableModal from '../../components/modals/ReUseableModal';
import { createDraftProject, initializePayment, uploadAudio, verifyPayment } from '../../services/api';
import {
    ADD_ONS,
    BOOKING_STEP_TITLES,
    CURRENCY_SYMBOL,
    COPY,
    DEFAULT_CUSTOMER_EMAIL,
    GENRES,
    LOCAL_STORAGE_KEYS,
    PAYMENT_REFERENCE_PREFIX,
    PAYSTACK_CALLBACK_URL,
    PAYSTACK_CURRENCY,
    SERVICES,
    SERVICE_DETAIL_COPY,
    UI_MESSAGES,
    UPLOAD_VALIDATION,
} from '../../constants';

interface Step {
    id: number;
    title: string;
    icon: React.ReactNode;
}

const steps: Step[] = [
    {
        id: 1,
        title: BOOKING_STEP_TITLES[0],
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M6.79289 3.79289C7.18342 3.40237 7.81658 3.40237 8.20711 3.79289C8.59763 4.18342 8.59763 4.81658 8.20711 5.20711L5.70711 7.70711C5.31658 8.09763 4.68342 8.09763 4.29289 7.70711L2.79289 6.20711C2.40237 5.81658 2.40237 5.18342 2.79289 4.79289C3.18342 4.40237 3.81658 4.40237 4.20711 4.79289L5 5.58579L6.79289 3.79289ZM10 6C10 5.44772 10.4477 5 11 5H20C20.5523 5 21 5.44772 21 6C21 6.55228 20.5523 7 20 7H11C10.4477 7 10 6.55228 10 6ZM8.20711 9.79289C8.59763 10.1834 8.59763 10.8166 8.20711 11.2071L5.70711 13.7071C5.31658 14.0976 4.68342 14.0976 4.29289 13.7071L2.79289 12.2071C2.40237 11.8166 2.40237 11.1834 2.79289 10.7929C3.18342 10.4024 3.81658 10.4024 4.20711 10.7929L5 11.5858L6.79289 9.79289C7.18342 9.40237 7.81658 9.40237 8.20711 9.79289ZM10 12C10 11.4477 10.4477 11 11 11H20C20.5523 11 21 11.4477 21 12C21 12.5523 20.5523 13 20 13H11C10.4477 13 10 12.5523 10 12ZM8.20711 15.7929C8.59763 16.1834 8.59763 16.8166 8.20711 17.2071L5.70711 19.7071C5.31658 20.0976 4.68342 20.0976 4.29289 19.7071L2.79289 18.2071C2.40237 17.8166 2.40237 17.1834 2.79289 16.7929C3.18342 16.4024 3.81658 16.4024 4.20711 16.7929L5 17.5858L6.79289 15.7929C7.18342 15.4024 7.81658 15.4024 8.20711 15.7929ZM10 18C10 17.4477 10.4477 17 11 17H20C20.5523 17 21 17.4477 21 18C21 18.5523 20.5523 19 20 19H11C10.4477 19 10 18.5523 10 18Z" fill="#5E9110" />
            </svg>

        )
    },
    {
        id: 2,
        title: BOOKING_STEP_TITLES[1],
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M2.87868 4.87868C3.44129 4.31607 4.20435 4 5 4H15C15.7956 4 16.5587 4.31607 17.1213 4.87868C17.6839 5.44129 18 6.20435 18 7V8H19C20.6569 8 22 9.34315 22 11V17C22 18.6569 20.6569 20 19 20H9C7.34315 20 6 18.6569 6 17V16H5C4.20435 16 3.44129 15.6839 2.87868 15.1213C2.31607 14.5587 2 13.7956 2 13V7C2 6.20435 2.31607 5.44129 2.87868 4.87868ZM8 17C8 17.5523 8.44772 18 9 18H19C19.5523 18 20 17.5523 20 17V11C20 10.4477 19.5523 10 19 10H9C8.44772 10 8 10.4477 8 11V17ZM16 8H9C7.34315 8 6 9.34315 6 11V14H5C4.73478 14 4.48043 13.8946 4.29289 13.7071C4.10536 13.5196 4 13.2652 4 13V7C4 6.73478 4.10536 6.48043 4.29289 6.29289C4.48043 6.10536 4.73478 6 5 6H15C15.2652 6 15.5196 6.10536 15.7071 6.29289C15.8946 6.48043 16 6.73478 16 7V8ZM14 13C13.4477 13 13 13.4477 13 14C13 14.5523 13.4477 15 14 15C14.5523 15 15 14.5523 15 14C15 13.4477 14.5523 13 14 13ZM11 14C11 12.3431 12.3431 11 14 11C15.6569 11 17 12.3431 17 14C17 15.6569 15.6569 17 14 17C12.3431 17 11 15.6569 11 14Z" fill="currentColor" />
            </svg>

        )
    },
    {
        id: 3,
        title: BOOKING_STEP_TITLES[2],
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M4 7C4 5.89543 4.89543 5 6 5H18C19.1046 5 20 5.89543 20 7V15C20 16.1046 19.1046 17 18 17H6C4.89543 17 4 16.1046 4 15V7ZM18 7H6V15H18V7ZM2 19C2 18.4477 2.44772 18 3 18H21C21.5523 18 22 18.4477 22 19C22 19.5523 21.5523 20 21 20H3C2.44772 20 2 19.5523 2 19Z" fill="#717680" />
            </svg>


        )
    },
    {
        id: 4,
        title: BOOKING_STEP_TITLES[3],
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
                <path d="M9 3V21M3 9H21M3 15H9" stroke="currentColor" strokeWidth="2" />
            </svg>
        )
    }
];

const Create = () => {
    const [projectName, setProjectName] = useState('')
    const [referenceSong, setReferenceSong] = useState('')
    const [selectedGenre, setSelectedGenre] = useState('')
    const [selectedServiceId, setSelectedServiceId] = useState(
        SERVICES[0]?.id ?? '',
    )
    const [selectedAddOns, setSelectedAddOns] = useState<string[]>([])
    const [brief, setBrief] = useState('')
    const [paymentSuccessModalIsOpen, setPaymentSuccessModalIsOpen] = useState(false);
    const [isPaymentInitializing, setIsPaymentInitializing] = useState(false);
    const [isPaymentVerifying, setIsPaymentVerifying] = useState(false);
    const [paymentReference, setPaymentReference] = useState<string | null>(null);
    const [paymentError, setPaymentError] = useState('');
    const [draftError, setDraftError] = useState('');
    const [isDraftSaving, setIsDraftSaving] = useState(false);

    const [file, setFile] = useState<File | null>(null);
    const [error, setError] = useState<string>('');
    const [uploadError, setUploadError] = useState('');
    const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Audio Playback State
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const [isViewSelectedServiceModalOpen, setIsViewSelectedServiceModalOpen] = useState(false)
    const [isChangeServiceModalOpen, setIsChangeServiceModalOpen] = useState(false)
    const [isUploadsCompletedModalOpen, setIsUploadsCompletedModalOpen] = useState(false)

    useEffect(() => {
        if (file && audioRef.current) {
            const url = URL.createObjectURL(file);
            audioRef.current.src = url;
            audioRef.current.load();
            return () => URL.revokeObjectURL(url);
        }
    }, [file]);

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const formatTime = (time: number) => {
        if (isNaN(time)) return "0:00";
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60).toString().padStart(2, '0');
        return `${minutes}:${seconds}`;
    };

    const handleTimeUpdate = () => {
        if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
        }
    };

    const handleLoadedMetadata = () => {
        if (audioRef.current) {
            setDuration(audioRef.current.duration);
        }
    };

    const handleEnded = () => {
        setIsPlaying(false);
        setCurrentTime(0);
    };

    // Use useMemo for stable waveform
    const waveformHeights = useMemo(() => [...Array(60)].map((_, i) => 20 + Math.abs(Math.sin(i * 10)) * 60), []);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            validateAndSetFile(e.target.files[0]);
        }
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            validateAndSetFile(e.dataTransfer.files[0]);
        }
    };

    const handleUpload = async (selectedFile: File) => {
        setUploadStatus('uploading');
        setUploadError('');
        try {
            await uploadAudio(selectedFile, {
                projectId: projectName || undefined,
                serviceType: selectedServiceId,
                notes: brief || undefined,
                referenceUrl: referenceSong || undefined,
            });
            setUploadStatus('success');
            setIsUploadsCompletedModalOpen(true);
        } catch (uploadErr) {
            const message = uploadErr instanceof Error ? uploadErr.message : UI_MESSAGES.uploadFailed;
            setUploadError(message);
            setUploadStatus('error');
        }
    };

    const validateAndSetFile = (file: File) => {
        setError('');
        // Check file type (WAV)
        const normalizedName = file.name.toLowerCase();
        const matchesExtension = UPLOAD_VALIDATION.allowedExtensions.some((ext) =>
            normalizedName.endsWith(ext),
        );
        if (file.type !== 'audio/wav' && !matchesExtension) {
            setError(UI_MESSAGES.uploadInvalidType);
            return;
        }
        // Check file size (< 2GB)
        if (file.size > UPLOAD_VALIDATION.maxBytes) {
            setError(UI_MESSAGES.uploadTooLarge);
            return;
        }
        setFile(file);
        setIsPlaying(false);
        setCurrentTime(0);
        setDuration(0);
        void handleUpload(file);
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    const navigate = useNavigate();
    const customerEmail = DEFAULT_CUSTOMER_EMAIL;

    const handleInitializePayment = async () => {
        if (orderTotalInKobo <= 0) {
            setPaymentError(UI_MESSAGES.paymentTotalInvalid);
            return;
        }
        setIsPaymentInitializing(true);
        setPaymentError('');
        try {
            const response = await initializePayment({
                email: customerEmail,
                amount: orderTotalInKobo,
                currency: PAYSTACK_CURRENCY,
                reference: `${PAYMENT_REFERENCE_PREFIX}${Date.now()}`,
                callbackUrl: PAYSTACK_CALLBACK_URL,
                metadata: {
                    projectId: localStorage.getItem(LOCAL_STORAGE_KEYS.PROJECT_CODE) || undefined,
                    projectName,
                    serviceType: selectedServiceId,
                    genre: selectedGenre,
                    addOns: selectedAddOnDetails.map((addOn) => addOn.name),
                    orderTotal,
                },
            });
            localStorage.setItem(LOCAL_STORAGE_KEYS.ORDER_TOTAL, orderTotal.toString());
            setPaymentReference(response.reference);
            localStorage.setItem(LOCAL_STORAGE_KEYS.PAYMENT_REFERENCE, response.reference);
            window.open(response.authorizationUrl, '_blank', 'noopener,noreferrer');
            setPaymentSuccessModalIsOpen(true);
        } catch (paymentErr) {
            const message = paymentErr instanceof Error ? paymentErr.message : UI_MESSAGES.paymentInitFailed;
            setPaymentError(message);
        } finally {
            setIsPaymentInitializing(false);
        }
    };

    const handleCreateDraft = async () => {
        setDraftError('');
        setIsDraftSaving(true);
        try {
            const response = await createDraftProject({
                name: projectName || undefined,
                serviceType: selectedService?.name,
                genre: selectedGenre || undefined,
                addOns: selectedAddOnDetails.map((addOn) => addOn.name),
                orderTotal,
            });
            localStorage.setItem(LOCAL_STORAGE_KEYS.PROJECT_CODE, response.projectId);
            localStorage.setItem(LOCAL_STORAGE_KEYS.PROJECT_ID, response.id);
            setCurrentStep(2);
        } catch (err) {
            const message =
                err instanceof Error ? err.message : UI_MESSAGES.draftCreateFailed;
            setDraftError(message);
        } finally {
            setIsDraftSaving(false);
        }
    };

    const handleVerifyPayment = async () => {
        const reference =
            paymentReference || localStorage.getItem(LOCAL_STORAGE_KEYS.PAYMENT_REFERENCE);
        if (!reference) {
            setPaymentError(UI_MESSAGES.paymentReferenceMissing);
            return;
        }
        setIsPaymentVerifying(true);
        setPaymentError('');
        try {
            const result = await verifyPayment(reference);
            if (!result.paid) {
                setPaymentError(UI_MESSAGES.paymentNotCompleted);
                return;
            }
            setPaymentSuccessModalIsOpen(false);
            setCurrentStep(3);
        } catch (verifyErr) {
            const message = verifyErr instanceof Error ? verifyErr.message : UI_MESSAGES.paymentVerifyFailed;
            setPaymentError(message);
        } finally {
            setIsPaymentVerifying(false);
        }
    };

    const selectedService = SERVICES.find((service) => service.id === selectedServiceId);
    const selectedAddOnDetails = ADD_ONS.filter((addOn) => selectedAddOns.includes(addOn.id));
    const addOnTotal = selectedAddOnDetails.reduce((sum, addOn) => sum + addOn.price, 0);
    const subTotal = (selectedService?.price ?? 0) + addOnTotal;
    const serviceFee = 0;
    const orderTotal = subTotal + serviceFee;
    const orderTotalInKobo = Math.round(orderTotal * 100);
    const disableOrderSummary = useMemo<boolean>(() => {
        return !projectName.trim() || !selectedGenre.trim() || orderTotal <= 0
    }, [projectName, selectedGenre, orderTotal])

    const [currentStep, setCurrentStep] = useState(1);
    const [isAddOnOpen, setIsAddOnOpen] = useState(false);



    const handleStepClick = (stepId: number) => {
        // Only allow going back to previous steps
        if (stepId <= currentStep) {
            setCurrentStep(stepId);
        }
    };

    const detailIcon = (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M8.00016 2.66634C5.05464 2.66634 2.66683 5.05416 2.66683 7.99967C2.66683 10.9452 5.05464 13.333 8.00016 13.333C10.9457 13.333 13.3335 10.9452 13.3335 7.99967C13.3335 5.05416 10.9457 2.66634 8.00016 2.66634ZM1.3335 7.99967C1.3335 4.31778 4.31826 1.33301 8.00016 1.33301C11.6821 1.33301 14.6668 4.31778 14.6668 7.99967C14.6668 11.6816 11.6821 14.6663 8.00016 14.6663C4.31826 14.6663 1.3335 11.6816 1.3335 7.99967ZM10.4716 6.19494C10.7319 6.45529 10.7319 6.8774 10.4716 7.13775L7.8049 9.80441C7.54455 10.0648 7.12244 10.0648 6.86209 9.80441L5.52876 8.47108C5.26841 8.21073 5.26841 7.78862 5.52876 7.52827C5.78911 7.26792 6.21122 7.26792 6.47157 7.52827L7.3335 8.3902L9.52876 6.19494C9.78911 5.93459 10.2112 5.93459 10.4716 6.19494Z" fill="#78BA14" />
        </svg>
    );

    return (
        <div className="min-h-screen bg-white text-ink">
            <SiteHeader />
            <main className="mx-auto flex w-full flex-col px-4 py-10 sm:px-6 lg:px-[50px]">

                {/* go back */}
                <section className="mb-10">
                    <span className="flex items-center cursor-pointer gap-x-3 w-fit" onClick={() => navigate(-1)}>
                        <button onClick={() => navigate(-1)} className='p-3.5 rounded-lg bg-[#F5F5F5] hover:bg-[#e2e2e2] flex items-center gap-2 text-sm text-muted'>
                            <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M7.70711 0.292893C8.09763 0.683417 8.09763 1.31658 7.70711 1.70711L3.41421 6H15C15.5523 6 16 6.44772 16 7C16 7.55228 15.5523 8 15 8H3.41421L7.70711 12.2929C8.09763 12.6834 8.09763 13.3166 7.70711 13.7071C7.31658 14.0976 6.68342 14.0976 6.29289 13.7071L0.292893 7.70711C-0.0976311 7.31658 -0.0976311 6.68342 0.292893 6.29289L6.29289 0.292893C6.68342 -0.0976311 7.31658 -0.0976311 7.70711 0.292893Z" fill="#252B37" />
                            </svg>
                        </button>
                        <span>{COPY.goBack}</span>
                    </span>
                </section>

                {/* services section */}
                <div className=" mb-12">
                    <h3 className='text-3xl/[38px] font-neue-haas-medium font-semibold text-ink mb-2'>{COPY.beginBookingTitle}</h3>
                    <p className='text-[#717680] text-base/6 font-normal font-dm-sans'>{COPY.beginBookingSubtitle}</p>
                </div>

                {/* multi steps form */}
                <div className="">
                    {/* Step Indicator */}
                    <div className="mb-12">
                        <div className="flex items-center gap-x-1">
                            {steps.map((step, index) => (
                                <>
                                    {/* Step */}
                                    <div className={`flex items-center justify-center gap-x-2.5 p-2 rounded-xl flex-shrink-0 ${step.id <= currentStep ? 'bg-[#F8FCF2] text-[#5E9110]' : 'text-[#717680]'}`}>
                                        <button
                                            onClick={() => handleStepClick(step.id)}
                                            disabled={step.id > currentStep}
                                            className={`
                                                    p-1.5 rounded-full flex items-center justify-center transition-all
                                                    ${step.id < currentStep
                                                    ? 'bg-[#D9EFB7] text-[#5E9110] '
                                                    : step.id === currentStep
                                                        ? 'bg-[#D9EFB7] text-[#5E9110]'
                                                        : 'bg-[#F5F5F5] text-[#717680] cursor-not-allowed'
                                                }
                                            `}
                                        >
                                            <span className="text-sm">{step.icon}</span>
                                        </button>

                                        {/* Step Title */}
                                        <span className="text-xl/[30px] font-medium text-center whitespace-nowrap font-dm-sans">
                                            {step.title}
                                        </span>
                                    </div>
                                    {/* Connector Line */}
                                    {
                                        index < steps.length - 1
                                        &&
                                        (
                                            <svg width="133" height="2" viewBox="0 0 133 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <line y1="0.75" x2="133" y2="0.75" stroke="#A4A7AE" stroke-width="1.5" stroke-dasharray="5 5" />
                                            </svg>
                                        )
                                    }
                                </>
                            ))}
                        </div>
                    </div>

                    <div className="mb-12 overflow-hidden">
                        <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${(currentStep - 1) * 100}%)` }}>
                            {/* Step 1 */}
                            <div className="w-full flex-shrink-0">
                                <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
                                    {/* Create Project */}
                                    <div className='p-4'>
                                        <h3 className='text-2xl/8 font-neue-haas-medium font-semibold text-ink mb-8'>Create Project</h3>
                                        <div className="p-3 border border-[#FAFAFA] bg-[#FDFDFD] rounded-xl mb-8">
                                            <p className='text-[#414651] text-xl/[30px] font-semibold font-dm-sans pb-4 mb-6 border-b border-[#D5D7DA]'>Service and Add-ons</p>
                                            <div className="flex justify-between items-end mb-8">
                                                <div>
                                                    <p className='text-[#717680] text-sm/5 font-medium font-dm-sans mb-4'>{COPY.selectedServiceLabel}</p>
                                                    <div className="flex items-center gap-2">
                                                        <h3 className='text-ink text-xl/[30px] font-semibold font-dm-sans'>
                                                            {selectedService?.name ?? 'Choose a Service'}
                                                        </h3>
                                                        <button onClick={() => { setIsViewSelectedServiceModalOpen(true) }} className='p-1 rounded-full cursor-pointer bg-[#E9EAEB] w-5 h-5 text-center'>
                                                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M5.75 3C5.39571 3 5.06855 3.12132 4.83796 3.31897C4.60975 3.51458 4.5 3.76184 4.5 4C4.5 4.27614 4.27614 4.5 4 4.5C3.72386 4.5 3.5 4.27614 3.5 4C3.5 3.44251 3.759 2.92671 4.18717 2.55971C4.61295 2.19475 5.17603 2 5.75 2H6.25C6.82397 2 7.38705 2.19475 7.81283 2.55971C8.23733 2.92357 8.49555 3.43369 8.49994 3.98569C8.52121 4.41377 8.40439 4.83751 8.16651 5.19434C7.93157 5.54674 7.59099 5.81524 7.19407 5.96153C7.01359 6.05198 6.83217 6.23008 6.69673 6.50096C6.5571 6.78022 6.48447 7.12417 6.49955 7.47875C6.51128 7.75464 6.29714 7.98781 6.02125 7.99955C5.74536 8.01128 5.51219 7.79714 5.50045 7.52125C5.47871 7.01016 5.58122 6.49592 5.8023 6.05374C6.02303 5.61228 6.36069 5.24752 6.78774 5.04729C6.80288 5.04019 6.81836 5.03386 6.83414 5.02831C7.03863 4.95641 7.21422 4.82 7.33446 4.63964C7.4547 4.45928 7.51308 4.24473 7.5008 4.02831C7.50027 4.01888 7.5 4.00944 7.5 4C7.5 3.76184 7.39025 3.51458 7.16204 3.31897C6.93145 3.12132 6.60429 3 6.25 3H5.75ZM6 9C6.27614 9 6.5 9.22386 6.5 9.5V9.505C6.5 9.78114 6.27614 10.005 6 10.005C5.72386 10.005 5.5 9.78114 5.5 9.505V9.5C5.5 9.22386 5.72386 9 6 9Z" fill="#414651" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </div>

                                                <button onClick={() => setIsChangeServiceModalOpen(true)} className='flex items-center gap-2 text-white text-sm font-medium font-dm-sans px-4 py-2 rounded-lg bg-[#7C3AED] shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)]'>
                                                    <span>
                                                        Change Service
                                                    </span>
                                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M13.9239 2.42301C14.4083 1.93893 15.0651 1.66699 15.75 1.66699C16.4352 1.66699 17.0923 1.93917 17.5768 2.42366C18.0612 2.90815 18.3334 3.56525 18.3334 4.25041C18.3334 4.93539 18.0614 5.59231 17.5772 6.07676C17.577 6.0769 17.5773 6.07662 17.5772 6.07676L16.5237 7.13399C16.4945 7.17709 16.4608 7.21806 16.4226 7.25625C16.3851 7.2937 16.345 7.32685 16.3028 7.35568L10.5903 13.0886C10.4339 13.2455 10.2215 13.3337 10 13.3337H7.5C7.03976 13.3337 6.66667 12.9607 6.66667 12.5004V10.0004C6.66667 9.77888 6.75487 9.56647 6.9118 9.41011L12.6443 3.69808C12.6732 3.65568 12.7065 3.61536 12.7441 3.57774C12.7824 3.53938 12.8236 3.50555 12.8669 3.47624L13.9232 2.42366C13.9235 2.42344 13.9237 2.42323 13.9239 2.42301ZM13.3427 5.35491L8.33333 10.3465V11.6671H9.65395L14.6455 6.65767L13.3427 5.35491ZM15.8219 5.47706L14.5234 4.17851L15.1018 3.60217C15.2737 3.43024 15.5069 3.33366 15.75 3.33366C15.9931 3.33366 16.2263 3.43025 16.3982 3.60217C16.5702 3.7741 16.6668 4.00728 16.6668 4.25041C16.6668 4.49355 16.5702 4.72673 16.3982 4.89866L15.8219 5.47706ZM3.23223 5.73256C3.70107 5.26372 4.33696 5.00033 5 5.00033H5.83333C6.29357 5.00033 6.66667 5.37342 6.66667 5.83366C6.66667 6.2939 6.29357 6.66699 5.83333 6.66699H5C4.77899 6.66699 4.56702 6.75479 4.41074 6.91107C4.25446 7.06735 4.16667 7.27931 4.16667 7.50033V15.0003C4.16667 15.2213 4.25446 15.4333 4.41074 15.5896C4.56702 15.7459 4.77899 15.8337 5 15.8337H12.5C12.721 15.8337 12.933 15.7459 13.0893 15.5896C13.2455 15.4333 13.3333 15.2213 13.3333 15.0003V14.167C13.3333 13.7068 13.7064 13.3337 14.1667 13.3337C14.6269 13.3337 15 13.7068 15 14.167V15.0003C15 15.6634 14.7366 16.2993 14.2678 16.7681C13.7989 17.2369 13.163 17.5003 12.5 17.5003H5C4.33696 17.5003 3.70107 17.2369 3.23223 16.7681C2.76339 16.2993 2.5 15.6634 2.5 15.0003V7.50033C2.5 6.83728 2.76339 6.2014 3.23223 5.73256Z" fill="white" />
                                                    </svg>
                                                </button>
                                            </div>

                                            {/* add ons toggles */}
                                            <button
                                                onClick={() => setIsAddOnOpen(!isAddOnOpen)}
                                                className='flex w-full justify-between items-center text-[#7C3AED] text-base font-medium font-dm-sans mb-2'
                                            >
                                                <span>Select Add-ons</span>
                                                <svg
                                                    className={`transition-transform duration-300 ${isAddOnOpen ? 'rotate-180' : ''}`}
                                                    width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M11.2929 8.29289C11.6834 7.90237 12.3166 7.90237 12.7071 8.29289L18.7071 14.2929C19.0976 14.6834 19.0976 15.3166 18.7071 15.7071C18.3166 16.0976 17.6834 16.0976 17.2929 15.7071L12 10.4142L6.70711 15.7071C6.31658 16.0976 5.68342 16.0976 5.29289 15.7071C4.90237 15.3166 4.90237 14.6834 5.29289 14.2929L11.2929 8.29289Z" fill="#7C3AED" />
                                                </svg>
                                            </button>

                                            {/* add ons */}
                                            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isAddOnOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                                <div className="flex gap-4 justify-between rounded-lg border border-[#F2EBFD] bg-[#F9F6FE] p-3">
                                                    {ADD_ONS.map((addOn) => (
                                                        <label key={addOn.id} htmlFor={`addon-${addOn.id}`} className='p-2 flex items-center gap-2 cursor-pointer'>
                                                            <span className='capitalize text-[#414651] font-dm-sans text-sm font-medium'>
                                                                {addOn.name}
                                                                <span className="ml-2 text-xs text-[#717680]">{`+ ${CURRENCY_SYMBOL}${addOn.price.toFixed(2)}`}</span>
                                                            </span>
                                                            <input
                                                                type="checkbox"
                                                                name="addOns"
                                                                id={`addon-${addOn.id}`}
                                                                value={addOn.id}
                                                                checked={selectedAddOns.includes(addOn.id)}
                                                                onChange={(e) =>
                                                                    setSelectedAddOns((prev) => {
                                                                        if (e.target.checked) {
                                                                            return [...prev, e.target.value]
                                                                        }
                                                                        return prev.filter((name) => name !== e.target.value)
                                                                    })
                                                                }
                                                            />
                                                        </label>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="p-3 border border-[#FAFAFA] bg-[#FDFDFD] rounded-xl mb-8">
                                            <p className='text-[#414651] text-xl/[30px] font-semibold font-dm-sans pb-4 mb-6 border-b border-[#D5D7DA]'>Project Details</p>
                                            <div className='mb-8'>
                                                <label htmlFor="" className='text-[#414651] text-base font-medium font-dm-sans mb-2 block'>Project Name <span className="text-[#717680] text-sm font-normal">(Required)</span></label>
                                                <input type="text" name="" placeholder='Enter project name' id="" className="w-full border border-[#E9EAEB]  py-2.5 px-3.5 mb-1.5 rounded-lg placeholder:text-[#717680[#717680] placeholder:text-sm text-sm" value={projectName} onChange={(e) => setProjectName(e.target.value)} />
                                                <p className="text-[#7C3AED] text-xs font-normal">Min. 3 - Max. 50 Characters, No special symbols except hyphen.</p>
                                            </div>
                                            <div className='mb-8'>
                                                <label htmlFor="" className='text-[#414651] text-base font-medium font-dm-sans mb-2 block'>Reference Song <span className="text-[#717680] text-sm font-normal">(Optional, only youtube and spotify link accepted)</span></label>
                                                <input type="text" name="" placeholder='Paste song link here' id="" className="w-full border border-[#E9EAEB]  py-2.5 px-3.5 mb-1.5 rounded-lg placeholder:text-[#717680[#717680] placeholder:text-sm text-sm" value={referenceSong} onChange={(e) => setReferenceSong(e.target.value)} />
                                            </div>
                                            <div className='mb-8'>
                                                <label htmlFor="" className='text-[#414651] text-base font-medium font-dm-sans mb-2 block'>Select Genre <span className="text-[#717680] text-sm font-normal">(Required, at  least 1 genre selection)</span></label>
                                                <select name="" id="" className="w-full border border-[#E9EAEB]  py-2.5 px-3.5 mb-1.5 rounded-lg placeholder:text-[#717680[#717680] placeholder:text-sm text-sm" value={selectedGenre} onChange={(e) => setSelectedGenre(e.target.value)}>
                                                    <option value="" disabled selected>Choose from selection</option>
                                                    {GENRES.map((genre) => (
                                                        <option key={genre.id} value={genre.id}>{genre.name}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className=''>
                                                <label htmlFor="" className='text-[#414651] text-base font-medium font-dm-sans mb-2 block'>Creative Brief <span className="text-[#717680] text-sm font-normal">(Optional but recommended)</span></label>
                                                <textarea name="" id="" placeholder='Enter a short description......... “A brief helps the engineer work accurately”' cols={30} rows={5} className="w-full border border-[#E9EAEB] py-2.5 px-3.5 mb-1.5 rounded-lg placeholder:text-[#717680[#717680] placeholder:text-sm text-sm resize-none" value={brief} onChange={(e) => setBrief(e.target.value)}></textarea>
                                                <p className="text-[#535862] text-xs font-normal">Min. 3 - Max. 50 Characters, No special symbols except hyphen.</p>
                                            </div>
                                        </div>

                                        {/* save to draft button */}
                                        <button className="flex items-center gap-x-2 text-[#7C3AED] text-sm font-semibold font-dm-sans border border-[#F2EBFD] bg-[#F2EBFD] rounded-lg px-6 py-2 mb-2">
                                            <span>
                                                Save to Draft
                                            </span>
                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M11.4941 3.994C12.0924 3.3957 12.9039 3.05957 13.75 3.05957C14.5961 3.05957 15.4076 3.3957 16.0059 3.994C16.6042 4.59231 16.9404 5.40379 16.9404 6.24993C16.9404 7.09606 16.6042 7.90754 16.0059 8.50585L7.25592 17.2558C7.09964 17.4121 6.88768 17.4999 6.66667 17.4999H3.33333C2.8731 17.4999 2.5 17.1268 2.5 16.6666V13.3333C2.5 13.1122 2.5878 12.9003 2.74408 12.744L10.6554 4.83272C10.6571 4.8309 10.6589 4.82909 10.6607 4.82729C10.6625 4.82549 10.6644 4.82369 10.6662 4.82191L11.4941 3.994ZM11.25 6.59508L4.16667 13.6784V15.8333H6.32149L13.4048 8.7499L11.25 6.59508ZM14.5834 7.57139L12.4285 5.41657L12.6726 5.17252C12.9583 4.88677 13.3459 4.72624 13.75 4.72624C14.1541 4.72624 14.5417 4.88677 14.8274 5.17252C15.1132 5.45826 15.2737 5.84582 15.2737 6.24993C15.2737 6.65403 15.1132 7.04159 14.8274 7.32734L14.5834 7.57139Z" fill="#7C3AED" />
                                            </svg>
                                        </button>

                                        <p className='text-ink text-sm font-dm-sans font-semibold'>*Your project is saved automatically.</p>

                                    </div>
                                    {/* Order Summary */}
                                    <div className='py-4 px-6 bg-[#FDFDFD] rounded-2xl'>
                                        <h3 className='text-2xl/8 font-neue-haas-medium font-semibold text-ink mb-8'>{COPY.orderSummaryTitle}</h3>

                                        {/* Order Summary Table */}
                                        <div className="border border-[#F5F5F5] rounded-2xl overflow-hidden mb-6">
                                            {/* Table Header */}
                                            <div className="grid grid-cols-5 gap-4 px-2 pt-2 pb-4 bg-white">
                                                <div className="col-span-2 text-[#414651] font-semibold font-dm-sans uppercase tracking-wider p-2">Item</div>
                                                <div className="col-span-1 text-[#414651] font-semibold font-dm-sans uppercase tracking-wider p-2">Qty</div>
                                                <div className="col-span-1 text-[#414651] font-semibold font-dm-sans uppercase tracking-wider p-2">Unit Price</div>
                                                <div className="col-span-1 text-[#414651] font-semibold font-dm-sans uppercase tracking-wider p-2 text-right">Total</div>
                                            </div>

                                            {/* Table Body */}
                                            <div className="px-2 bg-white">
                                                <div className="grid grid-cols-5 gap-4 mb-4 items-center">
                                                    <div className="col-span-2 text-ink text-sm font-medium font-dm-sans p-2">
                                                        {selectedService?.name ?? 'Choose a Service'}
                                                    </div>
                                                    <div className="col-span-1 text-ink text-sm font-medium font-dm-sans p-2">
                                                        {selectedService ? 1 : 0}
                                                    </div>
                                                    <div className="col-span-1 text-ink text-sm font-medium font-dm-sans p-2 text-center">
                                                        {selectedService
                                                            ? `${CURRENCY_SYMBOL}${selectedService.price.toFixed(2)}`
                                                            : `${CURRENCY_SYMBOL}0.00`}
                                                    </div>
                                                    <div className="col-span-1 text-ink text-sm font-medium font-dm-sans p-2 pr-3 text-right">
                                                        {selectedService
                                                            ? `${CURRENCY_SYMBOL}${selectedService.price.toFixed(2)}`
                                                            : `${CURRENCY_SYMBOL}0.00`}
                                                    </div>
                                                </div>

                                                {selectedAddOnDetails.map((addOn) => (
                                                    <div key={addOn.id} className="grid grid-cols-5 gap-4 mb-4 items-center">
                                                        <div className="col-span-2 text-ink text-sm font-medium font-dm-sans p-2">{addOn.name}</div>
                                                        <div className="col-span-1 text-ink text-sm font-medium font-dm-sans p-2">1</div>
                                                        <div className="col-span-1 text-ink text-sm font-medium font-dm-sans p-2 text-center">{`${CURRENCY_SYMBOL}${addOn.price.toFixed(2)}`}</div>
                                                        <div className="col-span-1 text-ink text-sm font-medium font-dm-sans p-2 pr-3 text-right">{`${CURRENCY_SYMBOL}${addOn.price.toFixed(2)}`}</div>
                                                    </div>
                                                ))}

                                                {/* Divider */}
                                                <div className="h-px bg-[#E9EAEB] my-4"></div>

                                                {/* Subtotals */}
                                                <div className="">
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-ink text-sm font-medium font-dm-sans p-2">Sub-Total</span>
                                                        <span className="text-ink text-sm font-medium font-dm-sans p-2">{`${CURRENCY_SYMBOL}${subTotal.toFixed(2)}`}</span>
                                                    </div>
                                                    <div className="flex justify-between items-center">
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-ink text-sm font-medium font-dm-sans p-2">Service Fee</span>
                                                            <div className="group relative cursor-help">
                                                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <rect width="20" height="20" rx="10" fill="#E9EAEB" />
                                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M9.75 7C9.39571 7 9.06855 7.12132 8.83796 7.31897C8.60975 7.51458 8.5 7.76184 8.5 8C8.5 8.27614 8.27614 8.5 8 8.5C7.72386 8.5 7.5 8.27614 7.5 8C7.5 7.44251 7.759 6.92671 8.18717 6.55971C8.61295 6.19475 9.17603 6 9.75 6H10.25C10.824 6 11.387 6.19475 11.8128 6.55971C12.2373 6.92357 12.4956 7.43369 12.4999 7.98569C12.5212 8.41377 12.4044 8.83751 12.1665 9.19434C11.9316 9.54674 11.591 9.81524 11.1941 9.96153C11.0136 10.052 10.8322 10.2301 10.6967 10.501C10.5571 10.7802 10.4845 11.1242 10.4995 11.4788C10.5113 11.7546 10.2971 11.9878 10.0212 11.9995C9.74536 12.0113 9.51219 11.7971 9.50045 11.5212C9.47871 11.0102 9.58122 10.4959 9.8023 10.0537C10.023 9.61228 10.3607 9.24752 10.7877 9.04729C10.8029 9.04019 10.8184 9.03386 10.8341 9.02831C11.0386 8.95641 11.2142 8.82 11.3345 8.63964C11.4547 8.45928 11.5131 8.24473 11.5008 8.02831C11.5003 8.01888 11.5 8.00944 11.5 8C11.5 7.76184 11.3903 7.51458 11.162 7.31897C10.9314 7.12132 10.6043 7 10.25 7H9.75ZM10 13C10.2761 13 10.5 13.2239 10.5 13.5V13.505C10.5 13.7811 10.2761 14.005 10 14.005C9.72386 14.005 9.5 13.7811 9.5 13.505V13.5C9.5 13.2239 9.72386 13 10 13Z" fill="#414651" />
                                                                </svg>
                                                            </div>
                                                        </div>
                                                        <span className="text-ink text-sm font-medium font-dm-sans p-2">{`${CURRENCY_SYMBOL}${serviceFee.toFixed(2)}`}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Order Total */}
                                            <div className="bg-[#F3FAE8] px-4 py-2.5 flex justify-between items-center mt-4">
                                                <span className="text-ink text-base font-semibold font-dm-sans">{COPY.orderTotalLabel}</span>
                                                <span className="text-ink text-xl font-semibold font-dm-sans">{`${CURRENCY_SYMBOL}${orderTotal.toFixed(2)}`}</span>
                                            </div>
                                        </div>

                                        {/* Delivery Date */}
                                        <div className="flex justify-between p-3 border border-[#F5F5F5] rounded-lg text-ink mb-6">
                                            <p className="flex gap-2.5 items-center">
                                                Delivery Date
                                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <rect width="20" height="20" rx="10" fill="#E9EAEB" />
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M9.75 7C9.39571 7 9.06855 7.12132 8.83796 7.31897C8.60975 7.51458 8.5 7.76184 8.5 8C8.5 8.27614 8.27614 8.5 8 8.5C7.72386 8.5 7.5 8.27614 7.5 8C7.5 7.44251 7.759 6.92671 8.18717 6.55971C8.61295 6.19475 9.17603 6 9.75 6H10.25C10.824 6 11.387 6.19475 11.8128 6.55971C12.2373 6.92357 12.4956 7.43369 12.4999 7.98569C12.5212 8.41377 12.4044 8.83751 12.1665 9.19434C11.9316 9.54674 11.591 9.81524 11.1941 9.96153C11.0136 10.052 10.8322 10.2301 10.6967 10.501C10.5571 10.7802 10.4845 11.1242 10.4995 11.4788C10.5113 11.7546 10.2971 11.9878 10.0212 11.9995C9.74536 12.0113 9.51219 11.7971 9.50045 11.5212C9.47871 11.0102 9.58122 10.4959 9.8023 10.0537C10.023 9.61228 10.3607 9.24752 10.7877 9.04729C10.8029 9.04019 10.8184 9.03386 10.8341 9.02831C11.0386 8.95641 11.2142 8.82 11.3345 8.63964C11.4547 8.45928 11.5131 8.24473 11.5008 8.02831C11.5003 8.01888 11.5 8.00944 11.5 8C11.5 7.76184 11.3903 7.51458 11.162 7.31897C10.9314 7.12132 10.6043 7 10.25 7H9.75ZM10 13C10.2761 13 10.5 13.2239 10.5 13.5V13.505C10.5 13.7811 10.2761 14.005 10 14.005C9.72386 14.005 9.5 13.7811 9.5 13.505V13.5C9.5 13.2239 9.72386 13 10 13Z" fill="#414651" />
                                                </svg>
                                            </p>

                                            <p className="flex gap-2.5 items-center">
                                                30/12/2025
                                                <button>
                                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M13.9239 2.42301C14.4083 1.93893 15.0651 1.66699 15.75 1.66699C16.4352 1.66699 17.0923 1.93917 17.5768 2.42366C18.0612 2.90815 18.3334 3.56525 18.3334 4.25041C18.3334 4.93539 18.0614 5.59231 17.5772 6.07676C17.577 6.0769 17.5773 6.07662 17.5772 6.07676L16.5237 7.13399C16.4945 7.17709 16.4608 7.21806 16.4226 7.25625C16.3851 7.2937 16.345 7.32685 16.3028 7.35568L10.5903 13.0886C10.4339 13.2455 10.2215 13.3337 10 13.3337H7.5C7.03976 13.3337 6.66667 12.9607 6.66667 12.5004V10.0004C6.66667 9.77888 6.75487 9.56647 6.9118 9.41011L12.6443 3.69808C12.6732 3.65568 12.7065 3.61536 12.7441 3.57774C12.7824 3.53938 12.8236 3.50555 12.8669 3.47624L13.9232 2.42366C13.9235 2.42344 13.9237 2.42323 13.9239 2.42301ZM13.3427 5.35491L8.33333 10.3465V11.6671H9.65395L14.6455 6.65767L13.3427 5.35491ZM15.8219 5.47706L14.5234 4.17851L15.1018 3.60217C15.2737 3.43024 15.5069 3.33366 15.75 3.33366C15.9931 3.33366 16.2263 3.43025 16.3982 3.60217C16.5702 3.7741 16.6668 4.00728 16.6668 4.25041C16.6668 4.49355 16.5702 4.72673 16.3982 4.89866L15.8219 5.47706ZM3.23223 5.73256C3.70107 5.26372 4.33696 5.00033 5 5.00033H5.83333C6.29357 5.00033 6.66667 5.37342 6.66667 5.83366C6.66667 6.2939 6.29357 6.66699 5.83333 6.66699H5C4.77899 6.66699 4.56702 6.75479 4.41074 6.91107C4.25446 7.06735 4.16667 7.27931 4.16667 7.50033V15.0003C4.16667 15.2213 4.25446 15.4333 4.41074 15.5896C4.56702 15.7459 4.77899 15.8337 5 15.8337H12.5C12.721 15.8337 12.933 15.7459 13.0893 15.5896C13.2455 15.4333 13.3333 15.2213 13.3333 15.0003V14.167C13.3333 13.7068 13.7064 13.3337 14.1667 13.3337C14.6269 13.3337 15 13.7068 15 14.167V15.0003C15 15.6634 14.7366 16.2993 14.2678 16.7681C13.7989 17.2369 13.163 17.5003 12.5 17.5003H5C4.33696 17.5003 3.70107 17.2369 3.23223 16.7681C2.76339 16.2993 2.5 15.6634 2.5 15.0003V7.50033C2.5 6.83728 2.76339 6.2014 3.23223 5.73256Z" fill="#7C3AED" />
                                                    </svg>
                                                </button>
                                            </p>
                                        </div>

                                        <div className="p-3 border border-[#F5F5F5] rounded-lg text-ink mb-6">
                                            <p className="mb-2.5 text-[#414651] font-dm-sans font-medium text-base">Apply Discount Code</p>

                                            <div className="flex justify-between gap-x-3">
                                                <input type="text" placeholder="Discount code" className='px-3.5 py-2.5 border border-[#D5D7DA] rounded-lg flex-1' />
                                                <button className="px-6 py-2.5 bg-[#7C3AED] text-white font-dm-sans font-medium text-base rounded-lg">Apply</button>
                                            </div>
                                        </div>

                                        <p className='text-[#252B37] mb-2.5 text-xl/[30px] font-dm-sans font-semibold'>{COPY.checkoutTitle}</p>
                                        <p className='text-[#717680] font-dm-sans font-medium text-sm mb-6'>Proceed below to see payment options</p>

                                        <button type='button' disabled={disableOrderSummary || isDraftSaving} className='w-full block text-center disabled:bg-[#E9EAEB] disabled:text-[#A4A7AE] font-dm-sans font-semibold text-sm rounded-lg px-6 py-2.5 bg-[#7C3AED] text-white' onClick={handleCreateDraft}>
                                            {isDraftSaving
                                                ? UI_MESSAGES.draftSaving
                                                : `${COPY.checkoutTitle} - ${CURRENCY_SYMBOL}${orderTotal.toFixed(2)}`}
                                        </button>
                                        {draftError ? (
                                            <p className='mt-2 text-sm text-red-600 font-dm-sans'>{draftError}</p>
                                        ) : null}
                                    </div>
                                </div>
                            </div>
                            {/* Step 2 */}
                            <div className="w-full flex-shrink-0">
                                {/* payment options */}
                                <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
                                    {/* Booking Details */}
                                    <div className='px-6 py-4'>
                                        <h3 className='text-2xl/8 font-neue-haas-medium font-semibold text-ink mb-8'>Booking Details</h3>
                                        <div className="p-3 border border-[#FAFAFA] bg-[#FDFDFD] rounded-xl mb-8">
                                            <div className="flex justify-between items-end text-[#414651] font-dm-sans font-semibold text-xl/[30px] border-b border-[#D5D7DA] pb-4 mb-6">
                                                <p>Project ID:</p>
                                                <p className='text-right'>SMPRO - 00128</p>
                                            </div>
                                            <div className="grid grid-cols-2 gap-x-6 gap-y-4 text-[#717680] font-dm-sans font-normal text-base">
                                                <p>Project Name</p>
                                                <p className='text-right text-ink'>{projectName}</p>
                                                <p>Genre</p>
                                                <p className='text-right text-ink'>{selectedGenre}</p>
                                                <p>Services</p>
                                                <p className='text-right text-ink'>Mixing</p>
                                                <p>Add-ons</p>
                                                <p className='text-right text-ink'>
                                                    {selectedAddOnDetails.length > 0 ? selectedAddOnDetails.map((addOn) => (
                                                        <span key={addOn.id}>{addOn.name}</span>
                                                    )) : 'None'}
                                                </p>
                                                <p>Service Provider</p>
                                                <p className='text-right text-ink'>Jacob Jones</p>
                                                <p>Total Mixing Tracks</p>
                                                <p className='text-right text-ink'>1</p>
                                                <p>Delivery Date</p>
                                                <p className='text-right text-ink'>30/12/2025</p>
                                            </div>
                                        </div>
                                        {/* Edit Project button */}
                                        <button className="flex items-center gap-x-2 text-[#7C3AED] text-sm font-semibold font-dm-sans border border-[#F2EBFD] bg-[#F2EBFD] rounded-lg px-6 py-2 mb-2" onClick={() => setCurrentStep(1)}>
                                            <span>
                                                Edit Project
                                            </span>
                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M11.4941 3.994C12.0924 3.3957 12.9039 3.05957 13.75 3.05957C14.5961 3.05957 15.4076 3.3957 16.0059 3.994C16.6042 4.59231 16.9404 5.40379 16.9404 6.24993C16.9404 7.09606 16.6042 7.90754 16.0059 8.50585L7.25592 17.2558C7.09964 17.4121 6.88768 17.4999 6.66667 17.4999H3.33333C2.8731 17.4999 2.5 17.1268 2.5 16.6666V13.3333C2.5 13.1122 2.5878 12.9003 2.74408 12.744L10.6554 4.83272C10.6571 4.8309 10.6589 4.82909 10.6607 4.82729C10.6625 4.82549 10.6644 4.82369 10.6662 4.82191L11.4941 3.994ZM11.25 6.59508L4.16667 13.6784V15.8333H6.32149L13.4048 8.7499L11.25 6.59508ZM14.5834 7.57139L12.4285 5.41657L12.6726 5.17252C12.9583 4.88677 13.3459 4.72624 13.75 4.72624C14.1541 4.72624 14.5417 4.88677 14.8274 5.17252C15.1132 5.45826 15.2737 5.84582 15.2737 6.24993C15.2737 6.65403 15.1132 7.04159 14.8274 7.32734L14.5834 7.57139Z" fill="#7C3AED" />
                                            </svg>
                                        </button>
                                    </div>

                                    {/* Checkout */}
                                    <div className='px-6 py-4'>
                                        <h3 className='text-2xl/8 font-neue-haas-medium font-semibold text-ink mb-8'>{COPY.checkoutTitle}</h3>
                                        <div className="rounded-lg px-4 py-2.5 bg-[#F3FAE8] flex justify-between mb-8 text-[#252B37] text-xl/[30px] font-dm-sans font-semibold">
                                            <p>{COPY.orderTotalLabel}</p>
                                            <p>{`${CURRENCY_SYMBOL}${orderTotal.toFixed(2)}`}</p>
                                        </div>
                                        <div className="">
                                            <h3 className='text-[#414651] text-xl/[30px] font-dm-sans font-semibold pb-6 border-b border-[#D5D7DA] mb-6'>{COPY.payWithPaystack}</h3>
                                            <p className='text-[#717680] text-base font-dm-sans font-medium mb-4'>
                                                {UI_MESSAGES.paystackCheckoutNote}
                                            </p>
                                            <p className='text-[#717680] text-base font-dm-sans font-medium flex items-center gap-x-2 mb-6'>
                                                {UI_MESSAGES.paystackPoweredBy}

                                                <svg width="91" height="16" viewBox="0 0 91 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <g clip-path="url(#clip0_2327_5168)">
                                                        <path d="M12.939 1.53613H0.745129C0.355963 1.53613 -0.000772621 1.85613 -0.000772621 2.27213V3.61613C-0.000772621 4.03213 0.355963 4.38413 0.745129 4.38413H12.939C13.3606 4.38413 13.6849 4.03213 13.7173 3.61613V2.30413C13.7173 1.85613 13.3606 1.53613 12.939 1.53613ZM12.939 9.08813H0.745129C0.550546 9.08813 0.355963 9.18413 0.19381 9.31213C0.0640884 9.44013 -0.0332031 9.63213 -0.0332031 9.85613V11.2001C-0.0332031 11.6161 0.323532 11.9681 0.712698 11.9681H12.9066C13.3282 11.9681 13.6525 11.6481 13.6849 11.2001V9.85613C13.7173 9.40813 13.3606 9.08813 12.939 9.08813ZM7.6204 12.8321H0.745129C0.550546 12.8321 0.355963 12.8961 0.226241 13.0561C0.0965189 13.1841 -0.000772621 13.3761 -0.000772621 13.6001V14.9441C-0.000772621 15.3601 0.355963 15.7121 0.745129 15.7121H7.58797C8.00956 15.7121 8.33387 15.3601 8.33387 14.9441V13.5681C8.3663 13.1841 8.04199 12.8321 7.6204 12.8321ZM13.7173 5.31213H0.745129C0.550546 5.31213 0.355963 5.37613 0.226241 5.53613C0.0965189 5.66413 -0.000772621 5.85613 -0.000772621 6.08013V7.42413C-0.000772621 7.84013 0.355963 8.19213 0.745129 8.19213H13.6849C14.1065 8.19213 14.4308 7.84013 14.4308 7.42413V6.08013C14.4632 5.63213 14.1389 5.31213 13.7173 5.31213Z" fill="#00C3F7" />
                                                        <path d="M27.8896 4.576C27.5004 4.192 27.0788 3.904 26.56 3.68C26.0735 3.456 25.5222 3.36 24.9709 3.36C24.452 3.36 23.9331 3.456 23.4466 3.68C23.1223 3.84 22.8304 4.032 22.6034 4.288V4.064C22.6034 3.936 22.5386 3.84 22.4737 3.744C22.3764 3.648 22.2791 3.584 22.1494 3.584H20.4306C20.3009 3.584 20.1711 3.648 20.1063 3.744C20.009 3.84 19.9766 3.936 19.9766 4.064V15.264C19.9766 15.392 20.0414 15.488 20.1063 15.584C20.2036 15.68 20.3009 15.712 20.4306 15.712H22.1494C22.2791 15.712 22.3764 15.68 22.4737 15.584C22.571 15.488 22.6034 15.392 22.6034 15.264V11.424C22.8629 11.68 23.1548 11.904 23.5115 12C23.9655 12.16 24.452 12.256 24.906 12.256C25.4573 12.256 26.0086 12.16 26.4951 11.936C27.014 11.744 27.468 11.424 27.8247 11.04C28.2139 10.624 28.5382 10.144 28.7328 9.632C28.9598 9.056 29.0895 8.416 29.0571 7.808C29.0571 7.168 28.9598 6.56 28.7328 5.952C28.6031 5.472 28.2788 4.992 27.8896 4.576ZM26.3654 8.64C26.2681 8.864 26.1384 9.088 25.9762 9.28C25.6195 9.664 25.133 9.856 24.6141 9.856C24.3547 9.856 24.0952 9.792 23.8682 9.696C23.6412 9.6 23.4142 9.44 23.252 9.28C23.0899 9.088 22.9277 8.864 22.8304 8.64C22.6359 8.128 22.6359 7.584 22.8304 7.072C22.9277 6.848 23.0575 6.624 23.252 6.432C23.4466 6.24 23.6412 6.112 23.8682 5.984C24.0952 5.888 24.3547 5.824 24.6141 5.824C24.8736 5.824 25.133 5.888 25.3925 5.984C25.6195 6.08 25.8141 6.24 26.0086 6.4C26.1708 6.592 26.3005 6.784 26.3978 7.04C26.56 7.552 26.56 8.128 26.3654 8.64ZM38.4295 3.616H36.7107C36.581 3.616 36.4837 3.68 36.3864 3.744C36.2891 3.84 36.2567 3.968 36.2567 4.096V4.288C36.0297 4.032 35.7702 3.84 35.4783 3.712C35.0243 3.488 34.5054 3.392 33.9865 3.392C32.8839 3.392 31.8137 3.84 31.0354 4.608C30.6462 5.024 30.3219 5.504 30.0949 6.016C29.8354 6.592 29.7381 7.232 29.7381 7.872C29.7381 8.512 29.8354 9.152 30.0949 9.728C30.3219 10.24 30.6462 10.72 31.0354 11.136C31.8137 11.904 32.8515 12.352 33.9541 12.352C34.473 12.352 34.9919 12.256 35.4459 12.032C35.7378 11.872 36.0297 11.68 36.2242 11.456V11.68C36.2242 11.808 36.2891 11.904 36.354 12C36.4513 12.064 36.5486 12.128 36.6783 12.128H38.3971C38.5268 12.128 38.6241 12.064 38.7214 12C38.8187 11.904 38.8511 11.808 38.8511 11.68V4.096C38.8511 3.968 38.8187 3.872 38.7214 3.776C38.6565 3.648 38.5592 3.616 38.4295 3.616ZM36.0945 8.608C35.9972 8.832 35.8675 9.056 35.7054 9.248C35.5432 9.408 35.3162 9.568 35.0892 9.696C34.6027 9.92 34.0514 9.92 33.5649 9.696C33.3379 9.6 33.1109 9.44 32.9488 9.248C32.7866 9.056 32.6245 8.832 32.5596 8.608C32.365 8.096 32.365 7.552 32.5596 7.04C32.6569 6.816 32.7866 6.592 32.9488 6.4C33.1109 6.208 33.3379 6.08 33.5649 5.952C34.0514 5.728 34.6027 5.728 35.0892 5.952C35.3162 6.048 35.5108 6.208 35.7054 6.368C35.8675 6.56 35.9972 6.752 36.0945 7.008C36.3215 7.552 36.3215 8.128 36.0945 8.608ZM55.5204 7.616C55.261 7.392 55.0015 7.232 54.6772 7.104C54.3529 6.976 54.0286 6.88 53.6719 6.816L52.3746 6.56C52.0503 6.496 51.7909 6.4 51.6612 6.304C51.5639 6.24 51.499 6.112 51.499 5.984C51.499 5.856 51.5639 5.728 51.7585 5.632C51.9855 5.504 52.2449 5.44 52.4719 5.472C52.7962 5.472 53.153 5.536 53.4448 5.664C53.7367 5.792 54.0286 5.952 54.288 6.112C54.6772 6.336 55.0015 6.304 55.2285 6.048L55.8447 5.344C55.9744 5.216 56.0393 5.056 56.0393 4.896C56.0393 4.736 55.942 4.544 55.8123 4.448C55.5528 4.224 55.1312 3.968 54.5475 3.744C53.9962 3.52 53.2827 3.392 52.4395 3.392C51.9206 3.392 51.4342 3.456 50.9477 3.616C50.5261 3.744 50.1369 3.936 49.8126 4.192C49.4883 4.416 49.2613 4.736 49.0667 5.088C48.9046 5.44 48.8073 5.792 48.8073 6.176C48.8073 6.88 49.0343 7.456 49.4559 7.872C49.8775 8.288 50.4288 8.576 51.1423 8.704L52.5044 8.992C52.7962 9.056 53.0881 9.12 53.38 9.248C53.5421 9.312 53.6394 9.44 53.6394 9.632C53.6394 9.792 53.5746 9.92 53.38 10.048C53.2178 10.176 52.926 10.24 52.5692 10.24C52.2125 10.24 51.8233 10.176 51.499 10.016C51.1747 9.856 50.8828 9.664 50.6234 9.44C50.4937 9.344 50.3639 9.28 50.2342 9.216C50.0721 9.184 49.8775 9.216 49.6829 9.376L48.937 9.952C48.7424 10.112 48.6127 10.368 48.6776 10.592C48.71 10.848 48.937 11.072 49.2937 11.36C50.2342 12 51.3693 12.32 52.5044 12.288C53.0233 12.288 53.5746 12.224 54.061 12.064C54.5151 11.936 54.9042 11.744 55.261 11.456C55.5853 11.2 55.8771 10.88 56.0393 10.528C56.2339 10.176 56.2987 9.792 56.2987 9.376C56.2987 9.024 56.2339 8.672 56.0717 8.32C55.942 8.096 55.7474 7.84 55.5204 7.616ZM62.9794 9.664C62.9146 9.536 62.7524 9.44 62.5902 9.408C62.4281 9.408 62.2659 9.472 62.1362 9.536C61.9416 9.664 61.6822 9.76 61.4228 9.76C61.3579 9.76 61.2606 9.76 61.1633 9.728C61.066 9.728 61.0012 9.664 60.9363 9.6C60.8714 9.536 60.8066 9.44 60.7417 9.344C60.6769 9.216 60.6444 9.056 60.6769 8.896V5.824H62.9146C63.0443 5.824 63.174 5.76 63.2713 5.664C63.3686 5.568 63.4334 5.472 63.4334 5.344V4.032C63.4334 3.904 63.3686 3.776 63.2713 3.712C63.174 3.616 63.0767 3.584 62.947 3.584H60.7093V1.504C60.7093 1.376 60.6769 1.248 60.5796 1.184C60.4823 1.088 60.385 1.056 60.2553 1.056H58.5364C58.4067 1.056 58.277 1.088 58.2121 1.184C58.1148 1.28 58.0824 1.408 58.0824 1.504V3.616H57.1095C56.9798 3.616 56.8501 3.68 56.7852 3.776C56.6879 3.872 56.6555 3.968 56.6555 4.096V5.408C56.6555 5.536 56.6879 5.632 56.7852 5.728C56.8501 5.824 56.9798 5.888 57.1095 5.888H58.0824V9.536C58.0824 9.984 58.1473 10.4 58.3419 10.784C58.504 11.104 58.731 11.392 58.9905 11.616C59.2499 11.84 59.5742 12 59.931 12.096C60.2877 12.192 60.6444 12.256 61.0012 12.256C61.4876 12.256 61.9416 12.192 62.3957 12.032C62.8173 11.904 63.2064 11.648 63.4983 11.36C63.6929 11.168 63.7253 10.848 63.5632 10.624L62.9794 9.664ZM72.3843 3.616H70.6654C70.5357 3.616 70.4384 3.68 70.3411 3.744C70.2438 3.84 70.2114 3.968 70.2114 4.096V4.288C69.9844 4.032 69.725 3.84 69.4331 3.712C68.9791 3.488 68.4602 3.392 67.9413 3.392C66.8386 3.392 65.8009 3.84 65.0225 4.608C64.6334 5.024 64.3091 5.504 64.0821 6.016C63.8226 6.592 63.7253 7.232 63.7253 7.84C63.7253 8.48 63.8226 9.088 64.0821 9.696C64.3091 10.208 64.6334 10.688 65.0225 11.104C65.8009 11.872 66.8386 12.32 67.9413 12.32C68.4602 12.32 68.9791 12.224 69.4331 12C69.725 11.84 70.0168 11.648 70.2114 11.424V11.648C70.2114 11.776 70.2438 11.872 70.3411 11.968C70.4384 12.064 70.5357 12.096 70.6654 12.096H72.3843C72.6437 12.096 72.8383 11.904 72.8383 11.648V4.096C72.8383 3.968 72.8059 3.872 72.7086 3.776C72.6113 3.648 72.514 3.616 72.3843 3.616ZM70.0493 8.608C69.952 8.832 69.8223 9.056 69.6601 9.248C69.4655 9.408 69.2709 9.568 69.0439 9.696C68.8169 9.792 68.525 9.856 68.2656 9.856C68.0061 9.856 67.7467 9.792 67.5197 9.696C67.2927 9.6 67.0657 9.44 66.9035 9.248C66.7414 9.056 66.5792 8.832 66.5143 8.608C66.3198 8.096 66.3198 7.552 66.5143 7.04C66.6116 6.816 66.7414 6.592 66.9035 6.4C67.0981 6.208 67.2927 6.08 67.5197 5.952C67.7467 5.856 68.0061 5.792 68.2656 5.792C68.525 5.792 68.7845 5.856 69.0439 5.952C69.2709 6.048 69.4655 6.208 69.6601 6.368C69.8223 6.56 69.9844 6.752 70.0493 7.008C70.2763 7.552 70.2763 8.128 70.0493 8.608ZM81.7891 9.536L80.8162 8.8C80.6216 8.64 80.4595 8.608 80.2973 8.672C80.1676 8.736 80.0379 8.832 79.9406 8.928C79.7136 9.184 79.4865 9.408 79.1947 9.6C78.9028 9.76 78.5785 9.856 78.2218 9.824C77.8326 9.824 77.4758 9.728 77.1515 9.504C76.8272 9.28 76.6002 8.96 76.4705 8.608C76.3732 8.352 76.3408 8.096 76.3408 7.84C76.3408 7.584 76.3732 7.296 76.4705 7.04C76.5678 6.816 76.6975 6.592 76.8597 6.4C77.0543 6.208 77.2488 6.08 77.4758 5.984C77.7029 5.888 77.9947 5.824 78.2542 5.824C78.5785 5.824 78.9352 5.888 79.1947 6.048C79.4865 6.24 79.7136 6.464 79.9406 6.72C80.0379 6.816 80.1676 6.912 80.2973 6.976C80.4595 7.04 80.6216 7.008 80.8162 6.848L81.7891 6.112C81.9188 6.016 82.0161 5.92 82.0486 5.792C82.1134 5.632 82.081 5.472 82.0161 5.344C81.627 4.768 81.1081 4.288 80.4919 3.936C79.8433 3.584 79.0649 3.392 78.1893 3.392C77.5731 3.392 76.957 3.52 76.4056 3.744C75.8543 3.968 75.3679 4.288 74.9463 4.704C74.5247 5.12 74.2004 5.6 73.9734 6.112C73.5193 7.232 73.5193 8.512 73.9734 9.632C74.2004 10.176 74.5247 10.656 74.9463 11.04C75.8219 11.872 76.957 12.32 78.1893 12.32C79.0649 12.32 79.8433 12.128 80.4919 11.776C81.1081 11.424 81.627 10.944 82.0161 10.368C82.1134 10.24 82.1134 10.08 82.0486 9.92C81.9837 9.76 81.8864 9.632 81.7891 9.536ZM90.9021 11.296L88.2104 7.36L90.5129 4.352C90.6102 4.224 90.6426 4.032 90.6102 3.872C90.5778 3.744 90.4481 3.616 90.1886 3.616H88.3725C88.2752 3.616 88.1779 3.648 88.0806 3.68C87.9509 3.744 87.886 3.808 87.8212 3.936L85.9726 6.496H85.5186V0.448C85.5186 0.32 85.4862 0.224 85.3889 0.128C85.2916 0.032 85.1943 0 85.0646 0H83.3458C83.2161 0 83.1188 0.032 83.0215 0.128C82.9242 0.224 82.8918 0.32 82.8918 0.448V11.584C82.8918 11.712 82.9566 11.84 83.0215 11.904C83.1188 12 83.2161 12.032 83.3458 12.032H85.0646C85.1943 12.032 85.2916 11.968 85.3889 11.904C85.4862 11.808 85.5186 11.712 85.5186 11.584V8.64H86.0051L88.0158 11.712C88.1455 11.936 88.3725 12.064 88.5995 12.064H90.5129C90.8048 12.064 90.9345 11.936 90.9669 11.808C91.0318 11.648 90.9994 11.456 90.9021 11.296ZM48.1587 3.616H46.2453C46.1156 3.616 45.9534 3.648 45.8561 3.776C45.7588 3.872 45.694 3.968 45.694 4.096L44.267 9.28H43.9103L42.386 4.064C42.3536 3.968 42.3212 3.84 42.2239 3.744C42.1266 3.648 41.9969 3.584 41.8672 3.584H39.8889C39.6295 3.584 39.4673 3.68 39.4024 3.84C39.3376 4 39.3376 4.16 39.4024 4.288L41.8347 11.616C41.8672 11.712 41.932 11.84 42.0293 11.904C42.1266 12 42.2563 12.032 42.386 12.032H43.4238L43.3265 12.256L43.0995 12.928C43.0347 13.12 42.9049 13.312 42.7103 13.472C42.5482 13.6 42.3536 13.664 42.1266 13.664C41.9644 13.664 41.7699 13.632 41.6077 13.568C41.4456 13.504 41.2834 13.408 41.1537 13.312C41.024 13.216 40.8618 13.184 40.7321 13.184H40.6997C40.5051 13.184 40.3429 13.28 40.2781 13.44L39.6619 14.336C39.4024 14.72 39.5646 14.976 39.7267 15.104C40.051 15.392 40.4402 15.616 40.8618 15.776C41.3158 15.936 41.8023 16 42.3212 16C43.1968 16 43.9427 15.776 44.494 15.296C45.0778 14.784 45.4994 14.112 45.7264 13.376L48.5478 4.32C48.6127 4.16 48.6127 4 48.5478 3.84C48.5478 3.712 48.4181 3.616 48.1587 3.616Z" fill="#011B33" />
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0_2327_5168">
                                                            <rect width="91" height="16" fill="white" />
                                                        </clipPath>
                                                    </defs>
                                                </svg>

                                            </p>

                                            <div className="rounded-xl border border-[#E9EAEB] bg-white px-4 py-3 mb-6">
                                                <p className="text-sm text-[#717680] font-dm-sans">{COPY.orderTotalLabel}</p>
                                                <p className="text-lg font-semibold text-ink font-dm-sans">{`${CURRENCY_SYMBOL}${orderTotal.toFixed(2)}`}</p>
                                            </div>

                                            <button
                                                type='button'
                                                disabled={orderTotalInKobo <= 0 || isPaymentInitializing}
                                                className='w-full block text-center disabled:bg-[#E9EAEB] disabled:text-[#A4A7AE] font-dm-sans font-semibold text-sm rounded-lg px-6 py-2.5 bg-[#7C3AED] text-white'
                                                onClick={handleInitializePayment}
                                            >
                                                {isPaymentInitializing
                                                    ? UI_MESSAGES.paymentRedirecting
                                                    : `Pay ${CURRENCY_SYMBOL}${orderTotal.toFixed(2)}`}
                                            </button>
                                            {paymentError && (
                                                <p className="text-sm text-red-600 mt-2">{paymentError}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Step 3 */}
                            <div className="w-full flex-shrink-0">
                                {/* Upload File */}
                                <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
                                    <div className='px-6 py-4'>
                                        <h3 className='text-2xl/8 font-neue-haas-medium font-semibold text-ink mb-8'>Upload File</h3>
                                        <div className="p-6 rounded-xl bg-[#FAFAFA]">
                                            <div
                                                className={`p-6 rounded-xl bg-[#FFFF] border-dashed border transition-colors duration-200 ${isDragging ? 'border-[#7C3AED] bg-[#F2EBFD]' : 'border-[#E9EAEB]'}`}
                                                onDragOver={handleDragOver}
                                                onDragLeave={handleDragLeave}
                                                onDrop={handleDrop}
                                            >
                                                <input
                                                    type="file"
                                                    ref={fileInputRef}
                                                    onChange={handleFileChange}
                                                    accept=".wav,audio/wav"
                                                    className="hidden"
                                                />
                                                <div className="flex justify-center mb-6">
                                                    <svg width="66" height="66" viewBox="0 0 66 66" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <rect x="5" y="5" width="56" height="56" rx="28" fill="#F3FAE8" />
                                                        <rect x="5" y="5" width="56" height="56" rx="28" stroke="#F8FCF2" stroke-width="10" />
                                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M34.6713 26.0396C33.9646 25.9111 33.2359 25.9091 32.5282 26.0338C31.8206 26.1585 31.1525 26.4066 30.5614 26.7598C29.3671 27.4733 28.5735 28.5608 28.3054 29.7556C28.1858 30.2882 27.7129 30.6667 27.167 30.6667C26.0044 30.6667 24.8993 31.109 24.0924 31.8808C23.2872 32.651 22.8451 33.6843 22.8451 34.7501C22.8451 35.8159 23.2872 36.8491 24.0924 37.6193C24.8993 38.3912 26.0044 38.8334 27.167 38.8334C27.8114 38.8334 28.3337 39.3557 28.3337 40.0001C28.3337 40.6444 27.8114 41.1667 27.167 41.1667C25.4182 41.1667 23.7312 40.5027 22.4795 39.3055C21.2261 38.1065 20.5117 36.469 20.5117 34.7501C20.5117 33.0311 21.2261 31.3936 22.4795 30.1947C23.5184 29.201 24.8571 28.5746 26.2822 28.3903C26.8399 26.8897 27.9311 25.6132 29.3647 24.7567C30.206 24.254 31.1436 23.9085 32.1233 23.7359C33.1029 23.5633 34.1101 23.566 35.0887 23.7439C36.0673 23.9218 37.0027 24.2723 37.841 24.7797C38.6794 25.2872 39.4067 25.9432 39.9765 26.7156C40.5465 27.4884 40.9467 28.3616 41.148 29.2866C41.2472 29.7427 41.2968 30.2055 41.2966 30.6683C42.6421 30.7015 43.9254 31.2504 44.8793 32.2044C45.8639 33.189 46.417 34.5243 46.417 35.9167C46.417 37.3091 45.8639 38.6445 44.8793 39.629C43.8948 40.6136 42.5594 41.1667 41.167 41.1667H40.0004C39.356 41.1667 38.8337 40.6444 38.8337 40.0001C38.8337 39.3557 39.356 38.8334 40.0004 38.8334H41.167C41.9406 38.8334 42.6824 38.5261 43.2294 37.9791C43.7764 37.4321 44.0837 36.6903 44.0837 35.9167C44.0837 35.1432 43.7764 34.4013 43.2294 33.8543C42.6824 33.3074 41.9406 33.0001 41.167 33.0001H40.0004C39.646 33.0001 39.3109 32.8391 39.0895 32.5624C38.8681 32.2858 38.7844 31.9236 38.862 31.5779C38.9951 30.9852 38.9971 30.3759 38.868 29.7826C38.7388 29.189 38.4796 28.6171 38.0987 28.1007C37.7175 27.5839 37.2211 27.132 36.6328 26.7759C36.0443 26.4197 35.378 26.1681 34.6713 26.0396ZM32.1754 32.1752C32.6311 31.7196 33.3698 31.7196 33.8254 32.1752L37.3254 35.6752C37.781 36.1308 37.781 36.8695 37.3254 37.3251C36.8698 37.7807 36.1311 37.7807 35.6754 37.3251L34.1671 35.8167V43.5001C34.1671 44.1445 33.6447 44.6668 33.0004 44.6668C32.3561 44.6668 31.8337 44.1445 31.8337 43.5001V35.8167L30.3254 37.3251C29.8698 37.7807 29.1311 37.7807 28.6754 37.3251C28.2198 36.8695 28.2198 36.1308 28.6754 35.6752L32.1754 32.1752Z" fill="#78BA14" />
                                                    </svg>
                                                </div>
                                                <p className='text-center text-[#717680] text-lg cursor-pointer' onClick={triggerFileInput}>
                                                    <span className='text-[#7C3AED]'>Click to upload</span> or drag and drop
                                                </p>
                                                <p className='text-[#717680] text-center text-sm font-dm-sans mb-2'>{UI_MESSAGES.uploadHint}</p>
                                                {error && (
                                                    <p className="text-center text-sm font-dm-sans text-red-600 mb-2">{error}</p>
                                                )}
                                                {uploadError && (
                                                    <p className="text-center text-sm font-dm-sans text-red-600 mb-2">{uploadError}</p>
                                                )}

                                                {file && (
                                                    <div className="flex items-center justify-between p-2 bg-green-50 rounded-lg mt-2">
                                                        <span className="text-sm text-green-700 truncate">{file.name}</span>
                                                        <button onClick={(e) => {
                                                            e.stopPropagation();
                                                            setFile(null);
                                                            setIsPlaying(false);
                                                            setCurrentTime(0);
                                                            setDuration(0);
                                                        }} className="text-red-500 hover:text-red-700">
                                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                                <path d="M18 6L6 18M6 6l12 12" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                )}

                                                {error && (
                                                    <p className="text-red-500 text-sm text-center mt-2">{error}</p>
                                                )}


                                            </div>
                                        </div>
                                        {file && (
                                            <div className="mt-8">
                                                <div className="p-4 border border-[#6CE9A6] bg-[#ECFDF3] rounded-xl flex gap-4 items-start mb-4">
                                                    <div className="p-2 bg-[#D1FADF] rounded-full text-[#12B76A]">
                                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                            <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                            <path d="M16 13H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                            <path d="M16 17H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                            <path d="M10 9H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                        </svg>
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="flex justify-between items-center mb-2">
                                                            <p className="text-[#101828] text-sm font-medium font-dm-sans">{file.name}</p>
                                                            <div className="w-5 h-5 bg-[#12B76A] rounded-full flex items-center justify-center text-white">
                                                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                </svg>
                                                            </div>
                                                        </div>
                                                        <p className="text-[#475467] text-sm font-normal mb-2">{(file.size / (1024 * 1024)).toFixed(0)} MB</p>
                                                        <div className="w-full bg-[#EAECF0] rounded-full h-2 mb-1">
                                                            <div className="bg-[#12B76A] h-2 rounded-full w-full"></div>
                                                        </div>
                                                        <div className="flex justify-end">
                                                            <span className="text-[#344054] text-xs font-medium">100%</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                {uploadStatus === 'uploading' && (
                                                    <p className="text-[#101828] text-sm font-medium mb-1">Uploading your file...</p>
                                                )}
                                                {uploadStatus === 'success' && (
                                                    <>
                                                        <p className="text-[#101828] text-sm font-medium mb-1">Your files are uploaded and ready</p>
                                                        <p className="text-[#475467] text-sm font-normal">Your files are set. Check the right panel to make sure your upload is accurate.</p>
                                                    </>
                                                )}
                                                {uploadStatus === 'error' && (
                                                    <p className="text-red-600 text-sm font-medium mb-1">Upload failed. Please try again.</p>
                                                )}
                                            </div>
                                        )}
                                    </div>

                                    <div className='px-6 py-4 bg-[#FAFAFA] rounded-xl'>
                                        <h3 className='text-2xl/8 font-neue-haas-medium font-semibold text-ink mb-8'>Uploads</h3>
                                        {!file ? (
                                            <div className='flex flex-col items-center justify-center py-6'>
                                                <div className='flex justify-center mb-6'>
                                                    <svg width="144" height="173" viewBox="0 0 144 173" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <g filter="url(#filter0_dddddi_226_9882)">
                                                            <rect x="7.27344" y="1.81836" width="122" height="122" rx="20" fill="white" shape-rendering="crispEdges" />
                                                            <rect x="7.77344" y="2.31836" width="121" height="121" rx="19.5" stroke="#D5D7DA" shape-rendering="crispEdges" />
                                                            <g filter="url(#filter1_i_226_9882)">
                                                                <path d="M40.2793 46.4987C40.2793 43.0145 40.2793 41.2725 40.9574 39.9417C41.5538 38.7711 42.5055 37.8194 43.6761 37.223C45.0068 36.5449 46.7489 36.5449 50.2331 36.5449H61.0407C62.5623 36.5449 63.3232 36.5449 64.0391 36.7168C64.6739 36.8692 65.2807 37.1206 65.8374 37.4617C66.4652 37.8464 67.0032 38.3844 68.0791 39.4603L68.4694 39.8506C69.5454 40.9266 70.0833 41.4646 70.7112 41.8493C71.2678 42.1904 71.8746 42.4417 72.5094 42.5941C73.2254 42.766 73.9862 42.766 75.5078 42.766H86.3155C89.7996 42.766 91.5417 42.766 92.8724 43.4441C94.043 44.0405 94.9947 44.9922 95.5912 46.1628C96.2692 47.4936 96.2692 49.2356 96.2692 52.7198V70.1389C96.2692 73.623 96.2692 75.3651 95.5912 76.6959C94.9947 77.8664 94.043 78.8181 92.8724 79.4146C91.5417 80.0926 89.7996 80.0926 86.3155 80.0926H50.2331C46.7489 80.0926 45.0068 80.0926 43.6761 79.4146C42.5055 78.8181 41.5538 77.8664 40.9574 76.6959C40.2793 75.3651 40.2793 73.623 40.2793 70.1389V46.4987Z" fill="white" />
                                                                <path d="M74.4954 59.8741C74.4954 64.1688 71.0138 67.6504 66.719 67.6504C62.4242 67.6504 58.9426 64.1688 58.9426 59.8741C58.9426 55.5793 62.4242 52.0977 66.719 52.0977C71.0138 52.0977 74.4954 55.5793 74.4954 59.8741Z" fill="white" />
                                                            </g>
                                                            <path d="M72.2202 65.3752L77.6059 70.761M68.4694 39.8506L68.0791 39.4603C67.0032 38.3844 66.4652 37.8464 65.8374 37.4617C65.2807 37.1206 64.6739 36.8692 64.0391 36.7168C63.3232 36.5449 62.5623 36.5449 61.0407 36.5449H50.2331C46.7489 36.5449 45.0068 36.5449 43.6761 37.223C42.5055 37.8194 41.5538 38.7711 40.9574 39.9417C40.2793 41.2725 40.2793 43.0145 40.2793 46.4987V70.1389C40.2793 73.623 40.2793 75.3651 40.9574 76.6959C41.5538 77.8664 42.5055 78.8181 43.6761 79.4146C45.0068 80.0926 46.7489 80.0926 50.2331 80.0926H86.3155C89.7996 80.0926 91.5417 80.0926 92.8724 79.4146C94.043 78.8181 94.9947 77.8664 95.5912 76.6959C96.2692 75.3651 96.2692 73.623 96.2692 70.1389V52.7198C96.2692 49.2356 96.2692 47.4936 95.5912 46.1628C94.9947 44.9922 94.043 44.0405 92.8724 43.4441C91.5417 42.766 89.7996 42.766 86.3155 42.766H75.5078C73.9862 42.766 73.2254 42.766 72.5094 42.5941C71.8746 42.4417 71.2678 42.1904 70.7112 41.8493C70.0833 41.4646 69.5454 40.9266 68.4694 39.8506ZM74.4954 59.8741C74.4954 64.1688 71.0138 67.6504 66.719 67.6504C62.4242 67.6504 58.9426 64.1688 58.9426 59.8741C58.9426 55.5793 62.4242 52.0977 66.719 52.0977C71.0138 52.0977 74.4954 55.5793 74.4954 59.8741Z" stroke="#84CC16" stroke-width="4.72308" stroke-linecap="round" stroke-linejoin="round" />
                                                            <path d="M36.75 21.0391V25.3291" stroke="#D5D7DA" stroke-linecap="round" stroke-linejoin="round" />
                                                            <path d="M34.5996 23.1885H38.8996" stroke="#D5D7DA" stroke-linecap="round" stroke-linejoin="round" />
                                                            <path opacity="0.32" d="M68.2734 104.646C88.708 104.646 105.273 103.079 105.273 101.146C105.273 99.2125 88.708 97.6455 68.2734 97.6455C47.8389 97.6455 31.2734 99.2125 31.2734 101.146C31.2734 103.079 47.8389 104.646 68.2734 104.646Z" fill="#E9EAEB" />
                                                        </g>
                                                        <defs>
                                                            <filter id="filter0_dddddi_226_9882" x="0.000710726" y="-0.727095" width="143.818" height="173.636" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                                                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                                                                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                                                <feOffset dx="1.81818" dy="23.6364" />
                                                                <feGaussianBlur stdDeviation="4.54545" />
                                                                <feComposite in2="hardAlpha" operator="out" />
                                                                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.01 0" />
                                                                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_226_9882" />
                                                                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                                                <feOffset dx="3.63636" dy="38.1818" />
                                                                <feGaussianBlur stdDeviation="5.45455" />
                                                                <feComposite in2="hardAlpha" operator="out" />
                                                                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.01 0" />
                                                                <feBlend mode="normal" in2="effect1_dropShadow_226_9882" result="effect2_dropShadow_226_9882" />
                                                                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                                                <feOffset dx="1.81818" dy="14.5455" />
                                                                <feGaussianBlur stdDeviation="4.54545" />
                                                                <feComposite in2="hardAlpha" operator="out" />
                                                                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.01 0" />
                                                                <feBlend mode="normal" in2="effect2_dropShadow_226_9882" result="effect3_dropShadow_226_9882" />
                                                                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                                                <feOffset dy="5.45455" />
                                                                <feGaussianBlur stdDeviation="2.72727" />
                                                                <feComposite in2="hardAlpha" operator="out" />
                                                                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.01 0" />
                                                                <feBlend mode="normal" in2="effect3_dropShadow_226_9882" result="effect4_dropShadow_226_9882" />
                                                                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                                                <feOffset dy="1.81818" />
                                                                <feGaussianBlur stdDeviation="1.81818" />
                                                                <feComposite in2="hardAlpha" operator="out" />
                                                                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.01 0" />
                                                                <feBlend mode="normal" in2="effect4_dropShadow_226_9882" result="effect5_dropShadow_226_9882" />
                                                                <feBlend mode="normal" in="SourceGraphic" in2="effect5_dropShadow_226_9882" result="shape" />
                                                                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                                                <feOffset dx="-4.39024" dy="-5.45455" />
                                                                <feGaussianBlur stdDeviation="1.27273" />
                                                                <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                                                                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0" />
                                                                <feBlend mode="normal" in2="shape" result="effect6_innerShadow_226_9882" />
                                                            </filter>
                                                            <filter id="filter1_i_226_9882" x="35.1501" y="31.4157" width="63.4808" height="51.0384" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                                                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                                                                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                                                                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                                                <feOffset dx="-4.77393" dy="-5.93125" />
                                                                <feGaussianBlur stdDeviation="1.38396" />
                                                                <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                                                                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0" />
                                                                <feBlend mode="normal" in2="shape" result="effect1_innerShadow_226_9882" />
                                                            </filter>
                                                        </defs>
                                                    </svg>
                                                </div>
                                                <h3 className='text-center text-ink text-lg cursor-pointer font-dm-sans font-semibold'>No files uploaded yet</h3>
                                                <p className='text-center text-[#717680] text-sm font-dm-sans font-normal'>When you upload your files, they’ll show up here for review.</p>
                                            </div>
                                        ) : (
                                            <>
                                                {/* Audio Element Hidden */}
                                                <audio
                                                    ref={audioRef}
                                                    onTimeUpdate={handleTimeUpdate}
                                                    onLoadedMetadata={handleLoadedMetadata}
                                                    onEnded={handleEnded}
                                                    hidden
                                                />

                                                <div className="bg-white p-4 rounded-xl shadow-sm border border-[#EAECF0] mb-6">
                                                    <div className="flex justify-between items-start mb-4">
                                                        <div className="text-[#101828] font-semibold text-sm font-dm-sans truncate pr-4">{file.name} <span className="text-[#475467] font-normal">({(file.size / (1024 * 1024)).toFixed(0)}mb)</span></div>
                                                    </div>

                                                    {/* Waveform Visualization */}
                                                    <div className="h-12 w-full flex items-center justify-between gap-0.5 mb-2 opacity-50 px-2 overflow-hidden bg-gray-50 rounded select-none">
                                                        {waveformHeights.map((height, i) => (
                                                            <div key={i} className={`w-1 rounded-full transition-all duration-200 ${currentTime / duration > i / 60 ? 'bg-[#7C3AED]' : 'bg-[#D0D5DD]'}`} style={{ height: `${height}%` }}></div>
                                                        ))}
                                                    </div>

                                                    {/* Progress Scrubber (Interactive) */}
                                                    <div
                                                        className="w-full bg-[#EAECF0] rounded-full h-1.5 mb-6 cursor-pointer relative group"
                                                        onClick={(e) => {
                                                            if (audioRef.current && duration) {
                                                                const rect = e.currentTarget.getBoundingClientRect();
                                                                const percent = (e.clientX - rect.left) / rect.width;
                                                                audioRef.current.currentTime = percent * duration;
                                                            }
                                                        }}
                                                    >
                                                        <div className="bg-[#7C3AED] h-1.5 rounded-full relative" style={{ width: `${(currentTime / duration) * 100}%` }}>
                                                            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-[#7C3AED] rounded-full shadow opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center justify-between mb-6">
                                                        <span className="text-[#101828] text-xs font-medium font-dm-sans w-8">{formatTime(currentTime)}</span>
                                                        <div className="flex gap-4 items-center">
                                                            {/* Rewind */}
                                                            <button
                                                                className="text-[#667085] hover:text-[#7C3AED] transition-colors"
                                                                onClick={() => { if (audioRef.current) audioRef.current.currentTime = Math.max(0, audioRef.current.currentTime - 5); }}
                                                            >
                                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M11 17L6 12L11 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                                    <path d="M18 17L13 12L18 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                                </svg>
                                                            </button>
                                                            {/* Play/Pause */}
                                                            <button
                                                                className="text-[#7C3AED] hover:text-[#6D28D9] transition-transform active:scale-95"
                                                                onClick={togglePlay}
                                                            >
                                                                {isPlaying ? (
                                                                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <circle cx="24" cy="24" r="24" fill="#F4EBFF" />
                                                                        <path d="M18 14H22V34H18V14Z" fill="#7C3AED" />
                                                                        <path d="M26 14H30V34H26V14Z" fill="#7C3AED" />
                                                                    </svg>
                                                                ) : (
                                                                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <circle cx="24" cy="24" r="24" fill="#F4EBFF" />
                                                                        <path d="M34 24L18 34V14L34 24Z" fill="#7C3AED" />
                                                                    </svg>
                                                                )}
                                                            </button>
                                                            {/* Forward */}
                                                            <button
                                                                className="text-[#667085] hover:text-[#7C3AED] transition-colors"
                                                                onClick={() => { if (audioRef.current) audioRef.current.currentTime = Math.min(duration, audioRef.current.currentTime + 5); }}
                                                            >
                                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M13 17L18 12L13 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                                    <path d="M6 17L11 12L6 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                                </svg>
                                                            </button>
                                                        </div>
                                                        <span className="text-[#101828] text-xs font-medium font-dm-sans w-8 text-right">{formatTime(duration)}</span>
                                                    </div>

                                                    <div className="flex gap-4 items-center justify-center border-t border-[#EAECF0] pt-4">
                                                        <button onClick={triggerFileInput} className="px-4 py-2 text-[#475467] hover:text-[#344054] text-sm font-semibold font-dm-sans flex items-center gap-2 transition-colors">
                                                            Replace File
                                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M13.3334 8L10.0001 4.66667V7.33333H2.66675V8.66667H10.0001V11.3333L13.3334 8Z" fill="currentColor" />
                                                            </svg>
                                                        </button>
                                                        <div className="w-px h-4 bg-[#EAECF0]"></div>
                                                        <button onClick={() => {
                                                            setFile(null);
                                                            setIsPlaying(false);
                                                            setCurrentTime(0);
                                                            setDuration(0);
                                                        }} className="text-[#F04438] hover:text-[#D92D20] text-sm font-semibold font-dm-sans flex items-center gap-2 transition-colors">
                                                            Remove File
                                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M12 4L4 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                <path d="M4 4L12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </div>
                                                <button
                                                    className='w-full block text-center font-dm-sans font-semibold text-sm rounded-lg px-6 py-2.5 bg-[#7C3AED] text-white hover:bg-[#6D28D9] transition-colors shadow-sm'
                                                    onClick={() => setCurrentStep(4)}
                                                >
                                                    Complete Project Creation
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                            {/* Step 4 */}
                            <div className="w-full flex-shrink-0">
                                <div className="max-w-3xl mx-auto text-center py-12">
                                    <h3 className='text-3xl font-neue-haas-medium font-semibold text-ink mb-4'>Welcome to your Project Workspace</h3>
                                    <p className='text-[#717680] text-lg font-dm-sans mb-8'>
                                        Your project "{projectName || 'Untitled Project'}" has been created successfully.
                                    </p>
                                    <div className="p-8 bg-green-50 rounded-2xl border border-green-100 inline-block mb-8">
                                        <svg className="w-16 h-16 text-green-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <p className="text-green-800 font-medium">Project files uploaded and payment confirmed.</p>
                                    </div>
                                    <div className="flex justify-center gap-4">
                                        <Link to="/workspace" className='px-6 py-3 bg-[#7C3AED] text-white rounded-lg font-semibold hover:bg-[#6D28D9] transition-colors'>
                                            Go to Dashboard
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* payment success modal */}
            <ReUseableModal
                isOpen={paymentSuccessModalIsOpen}
                onClose={() => {
                    setPaymentSuccessModalIsOpen(false)
                }}
                showHeader={false} // Hide header
                sections={
                    <div>
                        <div className="flex justify-center mb-8">
                            <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="4" y="4" width="48" height="48" rx="24" fill="#D1FADF" />
                                <rect x="4" y="4" width="48" height="48" rx="24" stroke="#ECFDF3" stroke-width="8" />
                                <path d="M38 27.0799V27.9999C37.9988 30.1563 37.3005 32.2545 36.0093 33.9817C34.7182 35.7088 32.9033 36.9723 30.8354 37.5838C28.7674 38.1952 26.5573 38.1218 24.5345 37.3744C22.5117 36.6271 20.7847 35.246 19.611 33.4369C18.4373 31.6279 17.8798 29.4879 18.0217 27.3362C18.1636 25.1844 18.9972 23.1362 20.3983 21.4969C21.7994 19.8577 23.6928 18.7152 25.7962 18.24C27.8996 17.7648 30.1003 17.9822 32.07 18.8599M38 19.9999L28 30.0099L25 27.0099" stroke="#039855" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </div>
                        <h3 className='text-[#181D27] text-xl/[30px] font-dm-sans font-semibold text-center'>{UI_MESSAGES.paymentInitializedTitle}</h3>

                        <p className='text-[#535862] text-base font-dm-sans mb-6'>{UI_MESSAGES.paymentInitializedBody}</p>

                        {paymentError && (
                            <p className='text-sm text-red-600 mb-4 text-center'>{paymentError}</p>
                        )}

                        <button
                            type='button'
                            className='w-full mb-2 block text-center font-dm-sans font-semibold text-sm rounded-lg px-6 py-2.5 bg-[#7C3AED] text-white'
                            onClick={handleVerifyPayment}
                            disabled={isPaymentVerifying}
                        >
                            {isPaymentVerifying ? UI_MESSAGES.paymentVerifyLoading : UI_MESSAGES.paymentVerifyButton}
                        </button>

                        <button
                            type='button'
                            className='w-full block text-center font-dm-sans font-semibold text-sm rounded-lg px-6 py-2.5 bg-[#F2EBFD] text-[#7C3AED]'
                            onClick={() => setPaymentSuccessModalIsOpen(false)}
                        >
                            {UI_MESSAGES.paymentCloseButton}
                        </button>
                    </div>
                }
            />

            {/* uploads completed modal */}
            <ReUseableModal
                isOpen={isUploadsCompletedModalOpen}
                onClose={() => {
                    setIsUploadsCompletedModalOpen(false)
                    setCurrentStep(3)
                }}
                showHeader={false} // Hide header
                sections={
                    <div>
                        <div className="flex justify-center mb-8">
                            <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="4" y="4" width="48" height="48" rx="24" fill="#D1FADF" />
                                <rect x="4" y="4" width="48" height="48" rx="24" stroke="#ECFDF3" stroke-width="8" />
                                <path d="M38 27.0799V27.9999C37.9988 30.1563 37.3005 32.2545 36.0093 33.9817C34.7182 35.7088 32.9033 36.9723 30.8354 37.5838C28.7674 38.1952 26.5573 38.1218 24.5345 37.3744C22.5117 36.6271 20.7847 35.246 19.611 33.4369C18.4373 31.6279 17.8798 29.4879 18.0217 27.3362C18.1636 25.1844 18.9972 23.1362 20.3983 21.4969C21.7994 19.8577 23.6928 18.7152 25.7962 18.24C27.8996 17.7648 30.1003 17.9822 32.07 18.8599M38 19.9999L28 30.0099L25 27.0099" stroke="#039855" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </div>
                        <h3 className='text-[#181D27] text-xl/[30px] font-dm-sans font-semibold text-center'>{UI_MESSAGES.uploadSuccessTitle}</h3>

                        <p className='text-[#535862] text-base font-dm-sans mb-6'>{UI_MESSAGES.uploadSuccessBody}</p>

                        <button type='button' className='w-full mb-2 block text-center font-dm-sans font-semibold text-sm rounded-lg px-6 py-2.5 bg-[#7C3AED] text-white' onClick={() => {
                            setIsUploadsCompletedModalOpen(false)
                            navigate('/my-projects')
                        }}>{UI_MESSAGES.uploadSuccessPrimary}</button>

                        <Link to="/projects/create" className='w-full block text-center font-dm-sans font-semibold text-sm rounded-lg px-6 py-2.5 bg-[#F2EBFD] text-[#7C3AED]'>{UI_MESSAGES.uploadSuccessSecondary}</Link>
                    </div>
                }
            />

            {/* view selected service */}
            <ReUseableModal
                isOpen={isViewSelectedServiceModalOpen}
                onClose={() => {
                    setIsViewSelectedServiceModalOpen(false)
                }}
                size='sm'
                title={SERVICE_DETAIL_COPY.title}
                sections={
                    <div>
                        <div className='p-4 mb-2'>
                            <h3 className='text-ink font-dm-sans text-base font-semibold mb-4'>{SERVICE_DETAIL_COPY.whatYouGetTitle}</h3>
                            {SERVICE_DETAIL_COPY.whatYouGetItems.map((item) => (
                                <div key={item} className="flex mb-4 gap-x-2 items-center">
                                    {detailIcon}
                                    <p className='text-[#414651] font-dm-sans text-xs font-medium'>{item}</p>
                                </div>
                            ))}
                        </div>
                        <div className='p-4'>
                            <h3 className='text-ink font-dm-sans text-base font-semibold mb-4'>{SERVICE_DETAIL_COPY.getStartedTitle}</h3>
                            {SERVICE_DETAIL_COPY.getStartedItems.map((item) => (
                                <div key={item} className="flex mb-4 gap-x-2 items-center">
                                    {detailIcon}
                                    <p className='text-[#414651] font-dm-sans text-xs font-medium'>{item}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                }
            />

            {/* change selected service */}
            <ReUseableModal
                isOpen={isChangeServiceModalOpen}
                onClose={() => {
                    setIsChangeServiceModalOpen(false)
                }}
                size='xxl'
                title={COPY.changeServiceTitle}
                sections={
                    <div className='grid md:grid-cols-3 gap-6 grid-cols-1'>
                        {SERVICES.map((service) => (
                            <div key={service.id} className='p-2 bg-[#FAFAFA] rounded-2xl'>
                                <div className="flex items-center justify-between mb-[13px]">
                                    <h3 className='font-dm-sans text-ink text-xl/[30px] font-bold'>{service.name}</h3>
                                    <span className="text-sm font-semibold text-[#7C3AED]">{`${CURRENCY_SYMBOL}${service.price.toFixed(2)}`}</span>
                                </div>
                                <p className='text-[#717680] font-dm-sans text-sm font-medium mb-[13px]'>{service.description}</p>
                                <button
                                    className='w-full block bg-[#7C3AED] text-white font-dm-sans text-sm font-medium py-2 px-6 rounded-lg'
                                    onClick={() => {
                                        setSelectedServiceId(service.id)
                                        setIsChangeServiceModalOpen(false)
                                    }}
                                >
                                    {selectedServiceId === service.id ? COPY.selectedService : COPY.selectService}
                                </button>
                            </div>
                        ))}
                    </div>
                }
            />
        </div>
    )
}

export default Create
