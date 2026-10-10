"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import type { FormEvent } from "react";
import { authClient } from "@/lib/auth-client";
import { getAuthErrorMessage } from "@/lib/auth-errors";
import toast from "react-hot-toast";
import { ArrowLeft, Lock, Mail, Loader2 } from "lucide-react";

function SignInContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || searchParams.get("callbackUrl") || "/";
  const reason = searchParams.get("reason");

  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (reason === "auth_required") {
      toast("পণ্যের বিস্তারিত ও বিশেষ তথ্য দেখতে সাইন ইন প্রয়োজন", {
        icon: "🔒",
        duration: 4000,
      });
    }
  }, [reason]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");
    setIsLoading(true);

    const form = new FormData(e.currentTarget);
    const email = String(form.get("email") ?? "").trim();
    const password = String(form.get("password") ?? "");

    if (!email || !password) {
      setErrorMessage("অনুগ্রহ করে ইমেইল ও পাসওয়ার্ড পূরণ করুন।");
      toast.error("ইমেইল ও পাসওয়ার্ড দিন");
      setIsLoading(false);
      return;
    }

    try {
      const { data, error } = await authClient.signIn.email({
        email,
        password,
      });

      if (error) {
        const msg = getAuthErrorMessage(error, "ইমেইল বা পাসওয়ার্ড সঠিক নয়।");
        setErrorMessage(msg);
        toast.error(msg);
        return;
      }

      if (data) {
        toast.success("সফলভাবে সাইন ইন হয়েছে!");
        router.replace(redirectUrl);
        router.refresh();
      } else {
        setErrorMessage("সাইন ইন সম্পন্ন হয়নি। আবার চেষ্টা করুন।");
        toast.error("সাইন ইন করা যায়নি");
      }
    } catch {
      const msg = "কোনো সমস্যা হয়েছে। ইন্টারনেট সংযোগ যাচাই করে আবার চেষ্টা করুন।";
      setErrorMessage(msg);
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialSignIn = async (provider: "google" | "github") => {
    try {
      await authClient.signIn.social({
        provider,
        callbackURL: redirectUrl,
      });
    } catch {
      toast.error(`${provider === "google" ? "Google" : "GitHub"} দিয়ে সাইন ইন ব্যর্থ হয়েছে`);
    }
  };

  return (
    <main className="flex min-h-[calc(100vh-140px)] flex-col items-center justify-center bg-gray-50/50 px-4 py-12">
      <div className="w-full max-w-md space-y-6">
        {/* Title and Subtitle */}
        <div className="text-center space-y-2">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-2xl">
            🛒
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-950">
            অ্যাকাউন্টে সাইন ইন করুন
          </h1>
          <p className="text-xs sm:text-sm text-gray-600">
            বাজারদর তুলনা ও বিস্তারিত বিশ্লেষণ দেখতে আপনার অ্যাকাউন্টে প্রবেশ করুন।
          </p>
        </div>

        {/* Form Box */}
        <div className="rounded-3xl border border-gray-200/90 bg-white p-6 sm:p-8 shadow-xs space-y-5">
          {reason === "auth_required" && (
            <div className="rounded-xl border border-emerald-200 bg-emerald-50/80 p-3 text-xs text-emerald-800 flex items-center gap-2">
              <Lock className="h-4 w-4 shrink-0 text-emerald-600" />
              <span>এই পেজে প্রবেশ করতে অনুগ্রহ করে সাইন ইন করুন।</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div className="space-y-1.5">
              <label htmlFor="email" className="block text-xs font-bold text-gray-700">
                ইমেইল ঠিকানা
              </label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3.5 top-3 h-4 w-4 text-gray-400" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50/30 py-2.5 pl-10 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-emerald-600 focus:bg-white focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label htmlFor="password" className="block text-xs font-bold text-gray-700">
                পাসওয়ার্ড
              </label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3.5 top-3 h-4 w-4 text-gray-400" />
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50/30 py-2.5 pl-10 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-emerald-600 focus:bg-white focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>
            </div>

            {errorMessage && (
              <div role="alert" className="rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-700">
                {errorMessage}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 py-3 text-sm font-bold text-white shadow-xs transition hover:bg-emerald-800 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>সাইন ইন হচ্ছে...</span>
                </>
              ) : (
                <span>সাইন ইন করুন</span>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative flex items-center justify-center">
            <div className="w-full border-t border-gray-200"></div>
            <span className="absolute bg-white px-3 text-xs font-medium text-gray-400">অথবা</span>
          </div>

          {/* Social Logins */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => handleSocialSignIn("google")}
              className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white py-2.5 px-3 text-xs font-semibold text-gray-700 shadow-2xs transition hover:bg-gray-50 hover:border-gray-300"
            >
              <svg className="h-4 w-4" viewBox="0 0 48 48">
                <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.8 2.4 30.3 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.9 6.1C12.4 13.6 17.7 9.5 24 9.5z" />
                <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3-2.3 5.5-4.8 7.2l7.6 5.9c4.4-4.1 7-10.1 7-17.6z" />
                <path fill="#FBBC05" d="M10.5 28.7c-.5-1.5-.8-3-.8-4.7s.3-3.2.8-4.7l-7.9-6.1C.9 16.4 0 20.1 0 24s.9 7.6 2.6 10.8l7.9-6.1z" />
                <path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.6-5.9c-2.1 1.4-4.9 2.3-8.3 2.3-6.3 0-11.6-4.1-13.5-9.8l-7.9 6.1C6.5 42.6 14.6 48 24 48z" />
              </svg>
              <span>Google</span>
            </button>

            <button
              type="button"
              onClick={() => handleSocialSignIn("github")}
              className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white py-2.5 px-3 text-xs font-semibold text-gray-700 shadow-2xs transition hover:bg-gray-50 hover:border-gray-300"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              <span>GitHub</span>
            </button>
          </div>

          {/* Signup Link */}
          <div className="text-center pt-2">
            <p className="text-xs text-gray-600">
              অ্যাকাউন্ট নেই?{" "}
              <Link href="/signup" className="font-bold text-emerald-700 hover:text-emerald-800 hover:underline">
                নতুন অ্যাকাউন্ট তৈরি করুন
              </Link>
            </p>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center">
          <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-emerald-700">
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>হোম পেজে ফিরে যান</span>
          </Link>
        </div>
      </div>
    </main>
  );
}

export default function SignIn() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-sm text-gray-500">লোড হচ্ছে...</div>}>
      <SignInContent />
    </Suspense>
  );
}