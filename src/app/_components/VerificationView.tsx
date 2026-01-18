"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";
import clsx from "clsx";
import { verifyEmailAction } from "../actions";

export default function VerificationView() {
    const searchParams = useSearchParams();
    const userId = searchParams.get("userId");
    const secret = searchParams.get("secret");

    const [status, setStatus] = useState<"loading" | "success" | "error">("loading");

    useEffect(() => {
        const verify = async () => {
            if (!userId || !secret) {
                setStatus("error");
                return;
            }

            try {
                // Call server action securely
                const result = await verifyEmailAction(userId, secret);

                if (result.success) {
                    setStatus("success");
                } else {
                    console.error("Verification error:", result.error);
                    setStatus("error");
                }
            } catch (error) {
                console.error("Unexpected error:", error);
                setStatus("error");
            }
        };

        verify();
    }, [userId, secret]);

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-6 text-center">
            <div className="w-full max-w-md space-y-8 rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-900/5 sm:p-10">

                {/* Loading State */}
                {status === "loading" && (
                    <div className="flex flex-col items-center space-y-4 animate-in fade-in duration-500">
                        <div className="rounded-full bg-emerald-50 p-3">
                            <Loader2 className="h-10 w-10 animate-spin text-emerald-500" strokeWidth={1.5} />
                        </div>
                        <h1 className="text-xl font-medium text-gray-900">Verifying your email...</h1>
                    </div>
                )}

                {/* Success State */}
                {status === "success" && (
                    <div className="flex flex-col items-center space-y-6 animate-in zoom-in-95 duration-500">
                        <div className="rounded-full bg-emerald-50 p-4 ring-1 ring-emerald-100">
                            <CheckCircle2 className="h-12 w-12 text-emerald-500" strokeWidth={1.5} />
                        </div>

                        <div className="space-y-2">
                            <div className="text-sm font-medium text-emerald-600 mb-2">Assalamu’alaikum wa rahmatullahi wa barakatuh</div>
                            <h1 className="text-2xl font-bold tracking-tight text-gray-900">Email Verified Successfully</h1>
                            <p className="text-gray-500">
                                Your email address has been verified. You can now continue using the app.
                            </p>
                        </div>

                        <div className="w-full pt-4 space-y-4">
                            <a
                                href="denniiaverifyemail://" // Deep link example (replace with actual scheme)
                                className="inline-flex w-full items-center justify-center rounded-lg bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                            >
                                Open App
                            </a>
                            <p className="text-xs text-gray-400">
                                May Allah bless you with goodness.
                            </p>
                            <p className="text-xs text-gray-400">
                                You may safely close this page.
                            </p>
                        </div>
                    </div>
                )}

                {/* Error State */}
                {status === "error" && (
                    <div className="flex flex-col items-center space-y-6 animate-in zoom-in-95 duration-500">
                        <div className="rounded-full bg-red-50 p-4 ring-1 ring-red-100">
                            <XCircle className="h-12 w-12 text-red-500" strokeWidth={1.5} />
                        </div>

                        <div className="space-y-2">
                            <h1 className="text-2xl font-bold tracking-tight text-gray-900">Verification Failed</h1>
                            <p className="text-gray-500">
                                This verification link is invalid or has expired.
                            </p>
                        </div>

                        <div className="rounded-lg bg-gray-50 px-4 py-3 text-sm text-gray-600">
                            Please request a new verification email from the app.
                        </div>
                    </div>
                )}

            </div>

            {/* Footer */}
            <footer className="mt-12 text-center text-xs text-gray-400">
                © {new Date().getFullYear()} Dein App. All rights reserved.
            </footer>
        </main>
    );
}
