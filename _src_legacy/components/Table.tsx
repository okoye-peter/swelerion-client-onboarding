import React, { type ReactNode } from 'react';

export interface Column<T> {
    header: string;
    accessor: keyof T | ((item: T) => ReactNode);
    className?: string; // For custom cell styling
}

interface Props<T> {
    columns: Column<T>[];
    data: T[];
    totalItems: number;
    currentPage: number;
    pageSize: number;
    onPageChange: (page: number) => void;
    searchPlaceholder?: string;
    onSearch?: (query: string) => void;
    headerAction?: ReactNode;
    isLoading?: boolean;
}

export function Table<T extends { id: string | number }>({
    columns,
    data,
    totalItems,
    currentPage,
    pageSize,
    onPageChange,
    searchPlaceholder = 'Search...',
    onSearch,
    headerAction,
    isLoading = false,
}: Props<T>) {
    const totalPages = Math.ceil(totalItems / pageSize);

    // Generate page numbers for pagination
    const getPageNumbers = () => {
        const pages = [];
        // Add all pages for now, can be optimized for large numbers later
        for (let i = 1; i <= totalPages; i++) {
            pages.push(i);
        }
        return pages;
    };

    return (
        <div className="bg-white rounded-3xl border border-[#E9EAEB] shadow-sm py-6 px-2">
            {/* Header: Search and Action */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
                <div className="relative w-full md:w-80">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M8.33341 3.33268C5.57199 3.33268 3.33341 5.57126 3.33341 8.33268C3.33341 11.0941 5.57199 13.3327 8.33341 13.3327C11.0948 13.3327 13.3334 11.0941 13.3334 8.33268C13.3334 5.57126 11.0948 3.33268 8.33341 3.33268ZM1.66675 8.33268C1.66675 4.65078 4.65152 1.66602 8.33341 1.66602C12.0153 1.66602 15.0001 4.65078 15.0001 8.33268C15.0001 9.87328 14.4775 11.2918 13.6 12.4207L18.0893 16.9101C18.4148 17.2355 18.4148 17.7632 18.0893 18.0886C17.7639 18.414 17.2363 18.414 16.9108 18.0886L12.4215 13.5992C11.2925 14.4768 9.87401 14.9993 8.33341 14.9993C4.65152 14.9993 1.66675 12.0146 1.66675 8.33268Z" fill="#717680" />
                        </svg>
                    </div>
                    <input
                        type="text"
                        placeholder={searchPlaceholder}
                        className="block w-full pl-10 pr-3.5 py-2.5 rounded-lg leading-5 placeholder-[#A4A7AE] focus:outline-none focus:ring-2 focus:ring-[#7C3AED] focus:border-[#7C3AED] text-sm bg-[#FAFAFA] font-dm-sans"
                        onChange={(e) => onSearch?.(e.target.value)}
                    />
                </div>
                {headerAction && <div>{headerAction}</div>}
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-[#E9EAEB] border-b border-[#E9EAEB]">
                    <thead className="bg-[#FAFAFA]">
                        <tr>
                            {columns.map((col, index) => (
                                <th
                                    key={index}
                                    scope="col"
                                    className={`px-6 py-3 text-left text-sm font-semibold text-[#414651] tracking-wider ${col.className || ''}`}
                                >
                                    {col.header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-[#E9EAEB]">
                        {isLoading ? (
                            <tr>
                                <td colSpan={columns.length} className="px-6 py-4 text-center text-sm text-gray-500">
                                    Loading...
                                </td>
                            </tr>
                        ) : data.length === 0 ? (
                            <tr>
                                <td colSpan={columns.length} className="px-6 py-4 text-center text-sm text-gray-500">
                                    No results found
                                </td>
                            </tr>
                        ) : (
                            data.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                                    {columns.map((col, colIndex) => (
                                        <td
                                            key={`${item.id}-${colIndex}`}
                                            className="px-6 py-4 whitespace-nowrap text-sm text-[#414651] font-normal font-dm-sans"
                                        >
                                            {typeof col.accessor === 'function'
                                                ? col.accessor(item)
                                                : (item[col.accessor] as ReactNode)}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between border-t border-[#E9EAEB] bg-white px-6 pt-3 pb-4 mt-6">
                {/* Previous Button */}
                <button
                    onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="flex items-center gap-2 font-dm-sans rounded-lg border border-[#D5D7DA] bg-white px-3.5 py-2 text-sm font-medium text-[#252B37] shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.8334 9.99935H4.16675M4.16675 9.99935L10.0001 15.8327M4.16675 9.99935L10.0001 4.16602" stroke="#252B37" stroke-width="1.67" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>

                    Previous
                </button>

                {/* Page Numbers */}
                <div className="hidden sm:flex items-center gap-1">
                    {getPageNumbers().map((page) => (
                        <button
                            key={page}
                            onClick={() => onPageChange(page)}
                            className={`relative inline-flex items-center p-3 px-5 text-sm font-normal rounded-lg focus:z-20 ${page === currentPage
                                ? 'bg-[#F9F5FF] text-[#7F56D9]'
                                : 'text-[#667085] hover:bg-gray-50 hover:text-[#181D27]'
                                }`}
                        >
                            {page}
                        </button>
                    ))}
                </div>

                {/* Next Button */}
                <button
                    onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="flex font-dm-sans items-center gap-2 rounded-lg border border-[#D5D7DA] bg-white px-3.5 py-2 text-sm font-medium text-[#252B37] shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Next
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4.1665 9.99935H15.8332M15.8332 9.99935L9.99984 4.16602M15.8332 9.99935L9.99984 15.8327" stroke="#252B37" stroke-width="1.67" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>

                </button>
            </div>
        </div>
    );
}
