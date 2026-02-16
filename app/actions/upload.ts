"use server";

import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { cwd } from "process";

export async function uploadFile(formData: FormData) {
    try {
        const file = formData.get("file") as File;
        if (!file) {
            return { success: false, error: "No file provided" };
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Create unique filename
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        const filename = `${uniqueSuffix}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "")}`;

        // Ensure upload directory exists
        const uploadDir = join(cwd(), "public", "uploads");
        await mkdir(uploadDir, { recursive: true });

        // Write file
        const filepath = join(uploadDir, filename);
        await writeFile(filepath, buffer);

        // Return public URL
        const url = `/uploads/${filename}`;

        return { success: true, url, filename };
    } catch (error) {
        console.error("Error uploading file:", error);
        return { success: false, error: "Upload failed" };
    }
}
