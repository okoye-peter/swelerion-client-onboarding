import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { getSubmissions } from '@/app/actions/submissions';
import { Search, Eye, ChevronLeft, ChevronRight, FileText } from 'lucide-react';
import { OnboardingData } from './OnboardingWizard';

export interface Submission extends OnboardingData {
    id: string;
    status: "new" | "in-progress" | "completed";
    submittedAt: string;
}

export function SubmissionsList() {
    const router = useRouter();
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [submissions, setSubmissions] = useState<Submission[]>([]);
    const [total, setTotal] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(true);
    const perPage = 10;

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const result = await getSubmissions(currentPage, perPage, searchQuery);
                // Need to cast the result to match our Submission interface because of the optional/missing file properties
                setSubmissions(result.data as unknown as Submission[]);
                setTotal(result.total);
                setTotalPages(result.totalPages);
            } catch (error) {
                console.error("Failed to fetch submissions", error);
            } finally {
                setLoading(false);
            }
        };

        // Debounce search
        const timer = setTimeout(() => {
            fetchData();
        }, 300);

        return () => clearTimeout(timer);
    }, [currentPage, searchQuery]);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        });
    };

    const getStatusBadge = (status: string) => {
        const statusMap: Record<string, { label: string; variant: "default" | "secondary" | "outline" }> = {
            new: { label: 'New', variant: 'default' },
            'in-progress': { label: 'In Progress', variant: 'secondary' },
            completed: { label: 'Completed', variant: 'outline' },
        };
        const defaultStatus = { label: status, variant: 'outline' as const };
        const { label, variant } = statusMap[status] || defaultStatus;
        return <Badge variant={variant}>{label}</Badge>;
    };

    const handleViewDetails = (id: string) => {
        router.push(`/submissions/${id}`);
    };

    const handleNewSubmission = () => {
        router.push('/');
    };

    return (
        <div className="container max-w-7xl py-8 mx-auto">
            <Card>
                <CardHeader>
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div>
                            <CardTitle className="text-2xl font-bold">Submissions</CardTitle>
                            <p className="mt-1 text-sm text-muted-foreground">
                                View and manage all client onboarding submissions
                            </p>
                        </div>
                        <Button onClick={handleNewSubmission} className="w-full md:w-auto">
                            <FileText className="w-4 h-4 mr-2" />
                            New Submission
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    {/* Search Bar */}
                    <div className="mb-6">
                        <div className="relative">
                            <Search className="absolute w-4 h-4 transform -translate-y-1/2 left-3 top-1/2 text-muted-foreground" />
                            <Input
                                type="text"
                                placeholder="Search by name, company, or project..."
                                value={searchQuery}
                                onChange={(e) => {
                                    setSearchQuery(e.target.value);
                                    setCurrentPage(1);
                                }}
                                className="pl-10 focus:outline-none"
                            />
                        </div>
                    </div>

                    {loading ? (
                        <div className="flex justify-center py-12">
                            <p className="text-muted-foreground">Loading submissions...</p>
                        </div>
                    ) : (
                        <>
                            {/* Desktop Table View */}
                            <div className="hidden overflow-x-auto md:block">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b">
                                            <th className="px-4 py-3 text-xs font-medium text-left text-muted-foreground">
                                                ID
                                            </th>
                                            <th className="px-4 py-3 text-xs font-medium text-left text-muted-foreground">
                                                Client
                                            </th>
                                            <th className="px-4 py-3 text-xs font-medium text-left text-muted-foreground">
                                                Company
                                            </th>
                                            <th className="px-4 py-3 text-xs font-medium text-left text-muted-foreground">
                                                Project Type
                                            </th>
                                            <th className="px-4 py-3 text-xs font-medium text-left text-muted-foreground">
                                                Status
                                            </th>
                                            <th className="px-4 py-3 text-xs font-medium text-left text-muted-foreground">
                                                Date
                                            </th>
                                            <th className="px-4 py-3 text-xs font-medium text-right text-muted-foreground">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {submissions.map((submission) => (
                                            <tr
                                                key={submission.id}
                                                className="transition-colors border-b hover:bg-muted/50"
                                            >
                                                <td className="px-4 py-4 text-sm font-mono">
                                                    #{submission.id.substring(0, 8)}...
                                                </td>
                                                <td className="px-4 py-4 text-sm">
                                                    {submission.clientInfo.firstName}{' '}
                                                    {submission.clientInfo.lastName}
                                                </td>
                                                <td className="px-4 py-4 text-sm">
                                                    {submission.clientInfo.company}
                                                </td>
                                                <td className="px-4 py-4 text-sm">
                                                    {submission.projectDetails.projectType}
                                                </td>
                                                <td className="px-4 py-4">{getStatusBadge(submission.status)}</td>
                                                <td className="px-4 py-4 text-sm text-muted-foreground">
                                                    {formatDate(submission.submittedAt)}
                                                </td>
                                                <td className="px-4 py-4 text-right">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => handleViewDetails(submission.id)}
                                                    >
                                                        <Eye className="w-4 h-4 mr-2" />
                                                        View
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Mobile Card View */}
                            <div className="space-y-4 md:hidden">
                                {submissions.map((submission) => (
                                    <Card key={submission.id} className="overflow-hidden">
                                        <CardContent className="p-4">
                                            <div className="flex items-start justify-between mb-3">
                                                <div>
                                                    <p className="text-sm font-mono text-muted-foreground">
                                                        #{submission.id.substring(0, 8)}...
                                                    </p>
                                                    <h3 className="mt-1 font-medium">
                                                        {submission.clientInfo.firstName}{' '}
                                                        {submission.clientInfo.lastName}
                                                    </h3>
                                                </div>
                                                {getStatusBadge(submission.status)}
                                            </div>
                                            <div className="space-y-2 text-sm">
                                                <div>
                                                    <span className="text-muted-foreground">Company: </span>
                                                    <span>{submission.clientInfo.company}</span>
                                                </div>
                                                <div>
                                                    <span className="text-muted-foreground">Project: </span>
                                                    <span>{submission.projectDetails.projectType}</span>
                                                </div>
                                                <div>
                                                    <span className="text-muted-foreground">Date: </span>
                                                    <span>{formatDate(submission.submittedAt)}</span>
                                                </div>
                                            </div>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="w-full mt-4"
                                                onClick={() => handleViewDetails(submission.id)}
                                            >
                                                <Eye className="w-4 h-4 mr-2" />
                                                View Details
                                            </Button>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>

                            {/* Empty State */}
                            {submissions.length === 0 && (
                                <div className="py-12 text-center">
                                    <FileText className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                                    <h3 className="mb-2 text-lg font-medium">No submissions found</h3>
                                    <p className="text-sm text-muted-foreground">
                                        {searchQuery
                                            ? 'Try adjusting your search query'
                                            : 'Get started by creating a new submission'}
                                    </p>
                                </div>
                            )}

                            {/* Pagination */}
                            {submissions.length > 0 && (
                                <div className="flex flex-col items-center justify-between gap-4 pt-6 mt-6 border-t md:flex-row">
                                    <p className="text-sm text-muted-foreground">
                                        Showing {(currentPage - 1) * perPage + 1} to{' '}
                                        {Math.min(currentPage * perPage, total)} of {total} submissions
                                    </p>
                                    <div className="flex items-center gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                                            disabled={currentPage === 1}
                                        >
                                            <ChevronLeft className="w-4 h-4" />
                                            Previous
                                        </Button>
                                        <div className="flex gap-1">
                                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                                <Button
                                                    key={page}
                                                    variant={currentPage === page ? 'default' : 'outline'}
                                                    size="sm"
                                                    onClick={() => setCurrentPage(page)}
                                                    className="w-10"
                                                >
                                                    {page}
                                                </Button>
                                            ))}
                                        </div>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() =>
                                                setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                                            }
                                            disabled={currentPage === totalPages}
                                        >
                                            Next
                                            <ChevronRight className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
