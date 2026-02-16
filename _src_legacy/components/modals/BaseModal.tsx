// BaseModal.tsx
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
    showCloseButton?: boolean;
    showHeader?: boolean;
}

export default function BaseModal({
    isOpen,
    onClose,
    title,
    children,
    size = 'md',
    showCloseButton = true,
    showHeader = true
}: Props) {
    const [isMounted, setIsMounted] = useState(isOpen);
    const [isActive, setIsActive] = useState(false);

    if (isOpen && !isMounted) {
        setIsMounted(true);
    }

    if (!isOpen && isActive) {
        setIsActive(false);
    }

    useEffect(() => {
        let timer: ReturnType<typeof setTimeout>;

        if (isOpen) {
            // Delay adding the active class to trigger the transition
            requestAnimationFrame(() => {
                setIsActive(true);
            });
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
            timer = setTimeout(() => {
                setIsMounted(false);
            }, 300); // Match transition duration
        }

        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEsc);
        }

        return () => {
            clearTimeout(timer);
            document.removeEventListener('keydown', handleEsc);
            // Ensure overflow is reset if unmounting abruptly
            if (isOpen) {
                document.body.style.overflow = 'unset';
            }
        };
    }, [isOpen, onClose]);

    if (!isMounted) return null;

    const sizeClasses = {
        sm: 'max-w-md',
        md: 'max-w-lg',
        lg: 'max-w-2xl',
        xl: 'max-w-4xl',
        xxl: 'max-w-7xl',
    };

    return createPortal(
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            onClick={onClose}
        >
            {/* Backdrop with blur */}
            <div className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0'}`} />

            {/* Modal Container */}
            <div
                className={`relative bg-white rounded-xl shadow-2xl ${sizeClasses[size]} w-full max-h-[85vh] overflow-hidden flex flex-col transform transition-all duration-300 ${isActive ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4'}`}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header - Conditionally rendered */}
                {showHeader && (
                    <div className="flex items-center justify-between p-4 bg-[#FAFAFA]">
                        <h2 className="text-2xl font-semibold text-[#252B37] font-neue-haas-medium">
                            {title}
                        </h2>

                        {showCloseButton && (
                            <button
                                onClick={onClose}
                                className="p-2 text-gray-400 transition-colors rounded-full hover:text-gray-600 hover:bg-gray-100"
                                aria-label="Close modal"
                            >
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M3.52827 3.52827C3.78862 3.26792 4.21073 3.26792 4.47108 3.52827L7.99967 7.05687L11.5283 3.52827C11.7886 3.26792 12.2107 3.26792 12.4711 3.52827C12.7314 3.78862 12.7314 4.21073 12.4711 4.47108L8.94248 7.99967L12.4711 11.5283C12.7314 11.7886 12.7314 12.2107 12.4711 12.4711C12.2107 12.7314 11.7886 12.7314 11.5283 12.4711L7.99967 8.94248L4.47108 12.4711C4.21073 12.7314 3.78862 12.7314 3.52827 12.4711C3.26792 12.2107 3.26792 11.7886 3.52827 11.5283L7.05687 7.99967L3.52827 4.47108C3.26792 4.21073 3.26792 3.78862 3.52827 3.52827Z" fill="#252B37" />
                                </svg>

                            </button>
                        )}
                    </div>
                )}

                {/* Content - Scrollable */}
                <div className="flex-1 p-6 overflow-y-auto">
                    {children}
                </div>
            </div>
        </div>,
        document.body
    );
}