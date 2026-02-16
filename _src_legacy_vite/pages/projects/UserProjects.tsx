import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SiteHeader from '../../components/SiteHeader';
import { Table, type Column } from '../../components/Table';
import { fetchProjects } from '../../services/api';
import {
    PROJECT_STATUS,
    PROJECT_STATUS_LABELS,
    PROJECT_TABS,
    PROJECTS_PAGE_COPY,
    PROJECTS_PAGE_SIZE,
    PROJECTS_TABLE_COPY,
} from '../../constants';

interface Project {
    id: string;
    name: string;
    projectId: string;
    serviceType: string;
    status: (typeof PROJECT_STATUS)[keyof typeof PROJECT_STATUS];
}

const UserProjects = () => {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState<(typeof PROJECT_TABS)[number]['id']>('all');
    const [projects, setProjects] = useState<Project[]>([]);
    const [totalItems, setTotalItems] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const pageSize = PROJECTS_PAGE_SIZE;

    useEffect(() => {
        const loadProjects = async () => {
            setIsLoading(true);
            setError('');
            try {
                const response = await fetchProjects({
                    status: activeTab === 'all' ? undefined : activeTab,
                    search: searchQuery || undefined,
                    page: currentPage,
                    pageSize,
                });
                setProjects(response.items);
                setTotalItems(response.total);
            } catch (err) {
                const message =
                    err instanceof Error ? err.message : PROJECTS_PAGE_COPY.loadError;
                setError(message);
            } finally {
                setIsLoading(false);
            }
        };
        void loadProjects();
    }, [activeTab, searchQuery, currentPage, pageSize]);

    const statusStyles = useMemo(
        () => ({
            ongoing: 'bg-[#FFFAEB] text-[#B54708]',
            draft: 'bg-[#F5F5F5] text-[#414651]',
            completed: 'bg-[#ECFDF3] text-[#027A48]',
        }),
        [],
    );

    const dotStyles = useMemo(
        () => ({
            ongoing: 'bg-[#F79009]',
            draft: 'bg-[#717680]',
            completed: 'bg-[#12B76A]',
        }),
        [],
    );

    const columns: Column<Project>[] = [
        { header: PROJECTS_TABLE_COPY.projectName, accessor: 'name' },
        { header: PROJECTS_TABLE_COPY.projectId, accessor: 'projectId' },
        { header: PROJECTS_TABLE_COPY.serviceType, accessor: 'serviceType' },
        {
            header: PROJECTS_TABLE_COPY.status,
            accessor: (item) => {
                return (
                    <span className={`inline-flex items-center gap-1.5 pl-2.5 pr-3 py-1 rounded-full text-xs font-medium ${statusStyles[item.status]}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${dotStyles[item.status]}`}></span>
                        {PROJECT_STATUS_LABELS[item.status]}
                    </span>
                );
            },
        },
        {
            header: PROJECTS_TABLE_COPY.action,
            accessor: (item) => (
                <button
                    onClick={() => navigate(`/projects/${encodeURIComponent(item.projectId)}`)}
                    className="text-[#7C3AED] hover:text-[#6931C9] text-sm font-semibold inline-flex items-center gap-1 bg-[#F2EBFD] px-3.5 py-2 rounded-lg transition-colors font-dm-sans"
                >
                    {PROJECTS_TABLE_COPY.viewProject}
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M10.2442 4.41009C10.5697 4.08466 11.0973 4.08466 11.4228 4.41009L16.4227 9.41009C16.7482 9.73553 16.7482 10.2632 16.4227 10.5886L11.4228 15.5886C11.0973 15.914 10.5697 15.914 10.2442 15.5886C9.9188 15.2632 9.9188 14.7355 10.2442 14.4101L13.8217 10.8327H4.16683C3.70659 10.8327 3.3335 10.4596 3.3335 9.99935C3.3335 9.53911 3.70659 9.16602 4.16683 9.16602H13.8217L10.2442 5.5886C9.9188 5.26317 9.9188 4.73553 10.2442 4.41009Z" fill="#7C3AED" />
                    </svg>
                </button>
            ),
        },
    ];

    return (
        <div className="min-h-screen bg-white text-ink">
            <SiteHeader />
            <main className="mx-auto flex w-full flex-col px-4 py-10 sm:px-6 lg:px-[50px]">
                <h3 className="text-2xl font-bold text-ink mb-10">{PROJECTS_PAGE_COPY.title}</h3>

                <div
                    className="relative px-6 py-3 rounded-lg  mb-16 text-white overflow-hidden"
                    style={{ background: 'linear-gradient(271deg, #84CC16 12.29%, #42660B 79.51%)' }}
                >
                    <div className="absolute inset-0 z-0 left-[-150px]">
                        <svg className="w-full h-full object-cover" viewBox="0 0 1276 108" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g opacity="0.3">
                                <path d="M-12 30.1571C18.6428 29.7878 49.2855 29.4195 79.9282 38.9361C110.571 48.4528 141.214 67.8553 171.856 81.0767C202.499 94.2982 233.142 101.338 263.785 88.1005C294.427 74.8625 325.073 41.348 355.715 30.1571C386.358 18.9654 417.001 30.0964 447.643 49.4713C478.286 68.8462 508.929 96.4641 539.572 81.0767C570.215 65.6893 600.857 7.29658 631.5 12.5982C662.143 17.8999 692.785 86.8959 723.428 84.5881C754.071 82.2804 784.714 8.6678 815.356 5.57448C845.999 2.48116 876.642 69.9071 907.285 82.8329C937.928 95.7587 968.572 54.1854 999.215 28.401C1029.86 2.61654 1060.5 -7.37713 1091.14 3.81924C1121.79 15.0156 1152.43 47.4029 1183.07 56.495C1213.71 65.5871 1244.36 51.3831 1275 37.18" stroke="url(#paint0_linear_341_16588)" strokeOpacity="0.5" />
                                <path d="M-12 52.9816C18.6428 79.1666 49.2855 105.352 79.9282 98.6345C110.571 91.9165 141.214 52.2973 171.856 42.4464C202.499 32.5964 233.142 52.5137 263.785 52.9816C294.427 53.4494 325.073 34.4668 355.715 40.6912C386.358 46.9146 417.001 78.3451 447.643 88.0994C478.286 97.8536 508.929 85.9325 539.572 70.5405C570.215 55.1484 600.857 36.2874 631.5 45.9587C662.143 55.6301 692.785 93.8338 723.428 88.0994C754.071 82.364 784.714 32.6894 815.356 24.8884C845.999 17.0865 876.642 51.1582 907.285 65.2729C937.928 79.3876 968.572 73.5454 999.215 60.0053C1029.86 46.4652 1060.5 25.2273 1091.14 24.8884C1121.79 24.5495 1152.43 45.1087 1183.07 56.4939C1213.71 67.8781 1244.36 70.0874 1275 72.2966" stroke="url(#paint1_linear_341_16588)" strokeOpacity="0.5" />
                                <path d="M-12 56.4948C18.6428 60.5974 49.2855 64.6991 79.9282 65.2737C110.571 65.8484 141.214 62.8941 171.856 63.5176C202.499 64.1419 233.142 68.3431 263.785 72.2975C294.427 76.2509 325.073 79.9576 355.715 82.8326C386.358 85.7077 417.001 87.7521 447.643 70.5413C478.286 53.3305 508.929 16.8654 539.572 19.6217C570.215 22.378 600.857 64.3556 631.5 81.0765C662.143 97.7974 692.785 89.2615 723.428 72.2975C754.071 55.3326 784.714 29.9386 815.356 14.3541C845.999 -1.23127 876.642 -7.00718 907.285 16.1094C937.928 39.2269 968.572 91.2368 999.215 95.123C1029.86 99.0093 1060.5 54.7717 1091.14 37.1797C1121.79 19.5876 1152.43 28.642 1183.07 31.9121C1213.71 35.1832 1244.36 32.67 1275 30.1569" stroke="url(#paint2_linear_341_16588)" strokeOpacity="0.5" />
                                <path d="M-12 88.1016C18.6428 62.4884 49.2855 36.8753 79.9282 38.9372C110.571 40.9991 141.214 70.737 171.856 63.5189C202.499 56.3018 233.142 12.1296 263.785 12.5993C294.427 13.069 325.073 58.1804 355.715 74.0541C386.358 89.9286 417.001 76.5645 447.643 74.0541C478.286 71.5446 508.929 79.8889 539.572 75.8102C570.215 71.7316 600.857 55.2308 631.5 63.5189C662.143 71.808 692.785 104.885 723.428 98.6367C754.071 92.3874 784.714 46.8128 815.356 28.402C845.999 9.9913 876.642 18.7445 907.285 24.8906C937.928 31.0358 968.572 34.5749 999.215 30.1582C1029.86 25.7406 1060.5 13.3683 1091.14 19.623C1121.79 25.8769 1152.43 50.7579 1183.07 51.2285C1213.71 51.6991 1244.36 27.7592 1275 3.82031" stroke="url(#paint3_linear_341_16588)" strokeOpacity="0.5" />
                                <path d="M-12 28.4009C18.6428 52.2477 49.2855 76.0955 79.9282 79.3205C110.571 82.5464 141.214 65.1505 171.856 60.0064C202.499 54.8622 233.142 61.9707 263.785 63.5178C294.427 65.0649 325.073 61.0507 355.715 70.5415C386.358 80.0324 417.001 103.029 447.643 93.368C478.286 83.7059 508.929 41.3866 539.572 35.4246C570.215 29.4618 600.857 59.8572 631.5 60.0064C662.143 60.1555 692.785 30.0576 723.428 17.8657C754.071 5.67387 784.714 11.3872 815.356 30.1571C845.999 48.926 876.642 80.7516 907.285 96.8794C937.928 113.007 968.572 113.439 999.215 93.368C1029.86 73.2959 1060.5 32.7218 1091.14 37.1799C1121.79 41.6389 1152.43 91.1302 1183.07 98.6356C1213.71 106.141 1244.36 71.6604 1275 37.1799" stroke="url(#paint4_linear_341_16588)" strokeOpacity="0.5" />
                                <path d="M-12 7.33009C18.6428 5.76824 49.2855 4.2073 79.9282 7.33009C110.571 10.4529 141.214 18.2612 171.856 38.9356C202.499 59.6099 233.142 93.1511 263.785 96.8789C294.427 100.607 325.073 74.5221 355.715 58.2497C386.358 41.9782 417.001 35.5199 447.643 28.4004C478.286 21.2809 508.929 13.502 539.572 23.1328C570.215 32.7637 600.857 59.8051 631.5 70.541C662.143 81.2769 692.785 75.7082 723.428 61.762C754.071 47.8159 784.714 25.4931 815.356 17.8652C845.999 10.2374 876.642 17.3053 907.285 35.4242C937.928 53.542 968.572 82.7108 999.215 91.6113C1029.86 100.512 1060.5 89.1452 1091.14 68.7849C1121.79 48.4246 1152.43 19.0716 1183.07 9.08626C1213.71 -0.900035 1244.36 8.48307 1275 17.8652" stroke="url(#paint5_linear_341_16588)" strokeOpacity="0.5" />
                                <path d="M-12 95.1204C18.6428 75.9196 49.2855 56.7178 79.9282 60.0036C110.571 63.2893 141.214 89.0609 171.856 93.3652C202.499 97.6686 233.142 80.5047 263.785 60.0036C294.427 39.5024 325.073 15.6638 355.715 9.08395C386.358 2.50316 417.001 13.1811 447.643 12.5954C478.286 12.0097 508.929 0.159451 539.572 3.81637C570.215 7.47236 600.857 26.6355 631.5 47.7122C662.143 68.7899 692.785 91.7812 723.428 93.3652C754.071 94.9482 784.714 75.1248 815.356 72.2949C845.999 69.4649 876.642 83.6285 907.285 75.8063C937.928 67.9841 968.572 38.1763 999.215 24.8867C1029.86 11.5962 1060.5 14.8249 1091.14 28.3981C1121.79 41.9713 1152.43 65.8881 1183.07 63.515C1213.71 61.1427 1244.36 32.4795 1275 3.81637" stroke="url(#paint6_linear_341_16588)" strokeOpacity="0.5" />
                            </g>
                            <defs>
                                <linearGradient id="paint0_linear_341_16588" x1="-12" y1="47.2293" x2="1275" y2="47.2293" gradientUnits="userSpaceOnUse">
                                    <stop stopColor="#78BA14" />
                                    <stop offset="0.557692" stopColor="#ADDD63" />
                                    <stop offset="1" stopColor="#ADDD63" />
                                </linearGradient>
                                <linearGradient id="paint1_linear_341_16588" x1="-12" y1="61.7216" x2="1275" y2="61.7216" gradientUnits="userSpaceOnUse">
                                    <stop stopColor="#78BA14" />
                                    <stop offset="0.557692" stopColor="#ADDD63" />
                                    <stop offset="1" stopColor="#ADDD63" />
                                </linearGradient>
                                <linearGradient id="paint2_linear_341_16588" x1="-12" y1="48.0216" x2="1275" y2="48.0216" gradientUnits="userSpaceOnUse">
                                    <stop stopColor="#78BA14" />
                                    <stop offset="0.557692" stopColor="#ADDD63" />
                                    <stop offset="1" stopColor="#ADDD63" />
                                </linearGradient>
                                <linearGradient id="paint3_linear_341_16588" x1="-12" y1="51.6187" x2="1275" y2="51.6187" gradientUnits="userSpaceOnUse">
                                    <stop stopColor="#78BA14" />
                                    <stop offset="0.557692" stopColor="#ADDD63" />
                                    <stop offset="1" stopColor="#ADDD63" />
                                </linearGradient>
                                <linearGradient id="paint4_linear_341_16588" x1="-12" y1="60.0783" x2="1275" y2="60.0783" gradientUnits="userSpaceOnUse">
                                    <stop stopColor="#78BA14" />
                                    <stop offset="0.557692" stopColor="#ADDD63" />
                                    <stop offset="1" stopColor="#ADDD63" />
                                </linearGradient>
                                <linearGradient id="paint5_linear_341_16588" x1="-12" y1="51.0218" x2="1275" y2="51.0218" gradientUnits="userSpaceOnUse">
                                    <stop stopColor="#78BA14" />
                                    <stop offset="0.557692" stopColor="#ADDD63" />
                                    <stop offset="1" stopColor="#ADDD63" />
                                </linearGradient>
                                <linearGradient id="paint6_linear_341_16588" x1="-12" y1="49.1188" x2="1275" y2="49.1188" gradientUnits="userSpaceOnUse">
                                    <stop stopColor="#78BA14" />
                                    <stop offset="0.557692" stopColor="#ADDD63" />
                                    <stop offset="1" stopColor="#ADDD63" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>
                    <div className="flex justify-end relative z-10">
                        <button>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289Z" fill="white" />
                            </svg>
                        </button>
                    </div>
                    <div className="justify-between items-center flex gap-6 relative z-10">
                        <div>
                            <h3 className="text-2xl font-semibold font-neue-haas-medium">{PROJECTS_PAGE_COPY.heroTitle}</h3>
                            <p className="text-base text-[#FAFAFA] font-dm-sans font-medium">{PROJECTS_PAGE_COPY.heroSubtitle}</p>
                        </div>
                        <button className='py-2 px-3.5 bg-[#F2EBFD] text-[#7C3AED] rounded-lg font-dm-sans font-semibold flex items-center gap-2 text-base h-fit'>
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.8335 10.0007L16.6668 3.33398V16.6673L5.8335 10.0007Z" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            {PROJECTS_PAGE_COPY.watchTutorial}
                        </button>
                    </div>
                </div>

                <div className="flex items-center  border-b-4 border-[#E9EAEB] mb-10">
                    {PROJECT_TABS.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => {
                                setActiveTab(tab.id);
                                setCurrentPage(1); // Reset to first page when tab changes
                            }}
                            className={`pb-3 text-base font-dm-sans font-semibold transition-colors px-4 relative ${activeTab === tab.id
                                ? 'text-[#7C3AED]'
                                : 'text-[#667085] hover:text-[#414651]'
                                }`}
                        >
                            {tab.label}
                            {activeTab === tab.id && (
                                <span className="absolute -bottom-1 left-0 w-full h-[4px] bg-[#7C3AED] rounded-t-sm" />
                            )}
                        </button>
                    ))}
                </div>

                {error ? (
                    <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                        {error}
                    </div>
                ) : null}

                <Table
                    columns={columns}
                    data={projects}
                    totalItems={totalItems}
                    currentPage={currentPage}
                    pageSize={pageSize}
                    onPageChange={setCurrentPage}
                    searchPlaceholder={PROJECTS_PAGE_COPY.searchPlaceholder}
                    onSearch={(query) => {
                        setSearchQuery(query);
                        setCurrentPage(1);
                    }}
                    isLoading={isLoading}
                    headerAction={
                        <button
                            onClick={() => navigate('/projects/create')}
                            className="inline-flex items-center gap-2 bg-[#7C3AED] hover:bg-[#6931C9] text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors shadow-sm"
                        >
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10 4.16666V15.8333M4.16666 10H15.8333" stroke="white" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            {PROJECTS_PAGE_COPY.startProject}
                        </button>
                    }
                />
            </main >
        </div >
    );
};

export default UserProjects;
