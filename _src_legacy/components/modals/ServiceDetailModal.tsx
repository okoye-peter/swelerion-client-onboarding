import BaseModal from './BaseModal';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    service: {
        title: string;
        benefits: string[];
        requirements: string[];
    };
}

export default function ServiceDetailsModal({
    isOpen,
    onClose,
    service
}: Props) {
    return (
        <BaseModal
            isOpen={isOpen}
            onClose={onClose}
            title={service.title}
            size="md"
        >
            <div className="space-y-8">
                {/* What You Get Section */}
                <div>
                    <h3 className="mb-4 text-lg font-semibold text-gray-900">
                        What You Get With This Service
                    </h3>
                    <ul className="space-y-3">
                        {service.benefits.map((benefit, index) => (
                            <li key={index} className="flex items-start gap-3">
                                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M8.00016 2.66634C5.05464 2.66634 2.66683 5.05416 2.66683 7.99967C2.66683 10.9452 5.05464 13.333 8.00016 13.333C10.9457 13.333 13.3335 10.9452 13.3335 7.99967C13.3335 5.05416 10.9457 2.66634 8.00016 2.66634ZM1.3335 7.99967C1.3335 4.31778 4.31826 1.33301 8.00016 1.33301C11.6821 1.33301 14.6668 4.31778 14.6668 7.99967C14.6668 11.6816 11.6821 14.6663 8.00016 14.6663C4.31826 14.6663 1.3335 11.6816 1.3335 7.99967ZM10.4716 6.19494C10.7319 6.45529 10.7319 6.8774 10.4716 7.13775L7.8049 9.80441C7.54455 10.0648 7.12244 10.0648 6.86209 9.80441L5.52876 8.47108C5.26841 8.21073 5.26841 7.78862 5.52876 7.52827C5.78911 7.26792 6.21122 7.26792 6.47157 7.52827L7.3335 8.3902L9.52876 6.19494C9.78911 5.93459 10.2112 5.93459 10.4716 6.19494Z" fill="#78BA14" />
                                    </svg>

                                </div>
                                <span className="leading-relaxed text-gray-700">
                                    {benefit}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* What You Need Section */}
                <div>
                    <h3 className="mb-4 text-lg font-semibold text-gray-900">
                        What do i need to get started?
                    </h3>
                    <ul className="space-y-3">
                        {service.requirements.map((requirement, index) => (
                            <li key={index} className="flex items-start gap-3">
                                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M8.00016 2.66634C5.05464 2.66634 2.66683 5.05416 2.66683 7.99967C2.66683 10.9452 5.05464 13.333 8.00016 13.333C10.9457 13.333 13.3335 10.9452 13.3335 7.99967C13.3335 5.05416 10.9457 2.66634 8.00016 2.66634ZM1.3335 7.99967C1.3335 4.31778 4.31826 1.33301 8.00016 1.33301C11.6821 1.33301 14.6668 4.31778 14.6668 7.99967C14.6668 11.6816 11.6821 14.6663 8.00016 14.6663C4.31826 14.6663 1.3335 11.6816 1.3335 7.99967ZM10.4716 6.19494C10.7319 6.45529 10.7319 6.8774 10.4716 7.13775L7.8049 9.80441C7.54455 10.0648 7.12244 10.0648 6.86209 9.80441L5.52876 8.47108C5.26841 8.21073 5.26841 7.78862 5.52876 7.52827C5.78911 7.26792 6.21122 7.26792 6.47157 7.52827L7.3335 8.3902L9.52876 6.19494C9.78911 5.93459 10.2112 5.93459 10.4716 6.19494Z" fill="#78BA14" />
                                    </svg>

                                </div>
                                <span className="leading-relaxed text-gray-700">
                                    {requirement}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </BaseModal>
    );
}