"use server";

import { Client, Users } from "node-appwrite";

interface VerifyResult {
    success: boolean;
    error?: string;
}

export async function verifyEmailAction(userId: string, secret: string): Promise<VerifyResult> {
    const endpoint = process.env.APPWRITE_ENDPOINT!
    const projectId = process.env.APPWRITE_PROJECT_ID!
    const apiKey = process.env.APPWRITE_API_KEY!

    if (!endpoint || !projectId || !apiKey) {
        console.error("Missing Appwrite configuration");
        return { success: false, error: "Server configuration error" };
    }

    try {
        const client = new Client()
            .setEndpoint(endpoint)
            .setProject(projectId)
            .setKey(apiKey);

        const users = new Users(client);

        // ✅ Correct method for v21.x
        await users.updateEmailVerification(userId, true);

        return { success: true };
    } catch (error: any) {
        console.error("Verification failed:", error);
        return {
            success: false,
            error: error?.message || "Verification failed"
        };
    }
}
