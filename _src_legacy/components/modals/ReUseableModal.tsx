// ReUseableModal.tsx
import BaseModal from './BaseModal';
import { type ReactNode, cloneElement, isValidElement } from 'react';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    sections: ReactNode;
    showHeader?: boolean;
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
}

export default function ReUseableModal({
    isOpen,
    onClose,
    title,
    sections,
    showHeader = true,
    size = 'md'
}: Props) {
    // Clone sections and inject onClose function if it's a valid React element
    const sectionsWithClose = isValidElement(sections)
        ? cloneElement(sections as React.ReactElement<{ onClose?: () => void }>, { onClose })
        : sections;

    return (
        <BaseModal 
            isOpen={isOpen} 
            onClose={onClose} 
            title={title} 
            showHeader={showHeader}
            size={size}
        >
            <div className="space-y-8">
                {sectionsWithClose}
            </div>
        </BaseModal>
    );
}