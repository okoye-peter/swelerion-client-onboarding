"use server";

import { prisma } from "@/lib/prisma";

import { OnboardingData } from "@/components/OnboardingWizard";
import { revalidatePath } from "next/cache";

export async function createSubmission(data: OnboardingData) {
    try {
        const submission = await prisma.submission.create({
            data: {
                status: "new",
                clientInfo: {
                    create: data.clientInfo,
                },
                projectDetails: {
                    create: {
                        ...data.projectDetails,
                        deliverables: JSON.stringify(data.projectDetails.deliverables),
                    },
                },
                creativeBrief: {
                    create: data.creativeBrief,
                },
                assets: {
                    create: {
                        hasLogo: data.assets.hasLogo,
                        hasBrandGuidelines: data.assets.hasBrandGuidelines,
                        hasExistingAssets: data.assets.hasExistingAssets,
                        additionalNotes: data.assets.additionalNotes || "",
                        // We only store metadata for files, not the actual files in this demo
                        logoFiles: JSON.stringify(
                            data.assets.logoFiles.map((f) => ({
                                name: f.name,
                                size: f.size,
                                type: f.type,
                                path: f.path,
                                url: f.url,
                            })),
                        ),
                        guidelineFiles: JSON.stringify(
                            data.assets.guidelineFiles.map((f) => ({
                                name: f.name,
                                size: f.size,
                                type: f.type,
                                path: f.path,
                                url: f.url,
                            })),
                        ),
                        marketingFiles: JSON.stringify(
                            data.assets.marketingFiles.map((f) => ({
                                name: f.name,
                                size: f.size,
                                type: f.type,
                                path: f.path,
                                url: f.url,
                            })),
                        ),
                        inspirationFiles: JSON.stringify(
                            data.assets.inspirationFiles.map((f) => ({
                                name: f.name,
                                size: f.size,
                                type: f.type,
                                path: f.path,
                                url: f.url,
                            })),
                        ),
                    },
                },
            },
            include: {
                clientInfo: true,
            },
        });

        revalidatePath("/submissions");
        return { success: true, id: submission.id };
    } catch (error) {
        console.error("Failed to create submission:", error);
        return { success: false, error: "Failed to create submission" };
    }
}

export async function getSubmissions(page = 1, perPage = 10, search = "") {
    const skip = (page - 1) * perPage;

    const where = search
        ? {
            OR: [
                { clientInfo: { firstName: { contains: search } } },
                { clientInfo: { lastName: { contains: search } } },
                { clientInfo: { company: { contains: search } } },
                { projectDetails: { projectName: { contains: search } } },
            ],
        }
        : {};

    const [submissions, total] = await Promise.all([
        prisma.submission.findMany({
            where,
            skip,
            take: perPage,
            orderBy: { createdAt: "desc" },
            include: {
                clientInfo: true,
                projectDetails: true,
            },
        }),
        prisma.submission.count({ where }),
    ]);

    return {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        data: submissions.map((s: any) => ({
            ...s,
            submittedAt: s.createdAt.toISOString(),
            projectDetails: {
                ...s.projectDetails,
                deliverables: JSON.parse(s.projectDetails?.deliverables || "[]"),
            },
        })),
        total,
        totalPages: Math.ceil(total / perPage),
        page,
        perPage,
    };
}

export async function getSubmissionById(id: string) {
    const submission = await prisma.submission.findUnique({
        where: { id },
        include: {
            clientInfo: true,
            projectDetails: true,
            creativeBrief: true,
            assets: true,
        },
    });

    if (!submission) return null;

    return {
        ...submission,
        submittedAt: submission.createdAt.toISOString(),
        projectDetails: {
            ...submission.projectDetails!,
            deliverables: JSON.parse(submission.projectDetails?.deliverables || "[]"),
        },
        clientInfo: submission.clientInfo!,
        creativeBrief: submission.creativeBrief!,
        assets: {
            ...submission.assets!,
            logoFiles: JSON.parse(submission.assets?.logoFiles || "[]"),
            guidelineFiles: JSON.parse(submission.assets?.guidelineFiles || "[]"),
            marketingFiles: JSON.parse(submission.assets?.marketingFiles || "[]"),
            inspirationFiles: JSON.parse(submission.assets?.inspirationFiles || "[]"),
            // Add missing File objects as empty since we can't reconstruct them from DB
        },
    };
}

export async function updateSubmission(
    id: string,
    data: Partial<OnboardingData> & { status?: string },
) {
    try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const updateData: any = {
            updatedAt: new Date(),
        };

        if (data.status) updateData.status = data.status;

        if (data.clientInfo) {
            updateData.clientInfo = {
                update: data.clientInfo,
            };
        }

        if (data.projectDetails) {
            updateData.projectDetails = {
                update: {
                    ...data.projectDetails,
                    deliverables: JSON.stringify(data.projectDetails.deliverables),
                },
            };
        }

        if (data.creativeBrief) {
            updateData.creativeBrief = {
                update: data.creativeBrief,
            };
        }

        if (data.assets) {
            // Prepare assets update logic similar to create
            updateData.assets = {
                update: {
                    hasLogo: data.assets.hasLogo,
                    hasBrandGuidelines: data.assets.hasBrandGuidelines,
                    hasExistingAssets: data.assets.hasExistingAssets,
                    additionalNotes: data.assets.additionalNotes || "",
                },
            };
        }

        await prisma.submission.update({
            where: { id },
            data: updateData,
        });

        revalidatePath("/submissions");
        revalidatePath(`/submissions/${id}`);
        return { success: true };
    } catch (error) {
        console.error("Failed to update submission:", error);
        return { success: false, error: "Failed to update submission" };
    }
}
