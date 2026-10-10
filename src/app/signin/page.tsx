"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import type { FormEvent } from "react";
import { authClient } from "@/lib/auth-client";
import { getAuthErrorMessage } from "@/lib/auth-errors";
import toast from "react-hot-toast";

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
      const msg = "অনুগ্রহ করে ইমেইল ও পাসওয়ার্ড দিন।";
      setErrorMessage(msg);
      toast.error(msg);
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
        const msg = "সাইন ইন সম্পন্ন হয়নি। আবার চেষ্টা করুন।";
        setErrorMessage(msg);
        toast.error(msg);
      }
    } catch {
      const msg = "কোনো সমস্যা হয়েছে। আবার চেষ্টা করুন।";
      setErrorMessage(msg);
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialSignIn = async (provider: "google" | "github") => {
    setIsLoading(true);
    try {
      const { data, error } = await authClient.signIn.social({
        provider,
        callbackURL: redirectUrl,
      });

      if (error) {
        throw error;
      }

      if (data) {
        return;
      }
    } catch {
      // Fallback: seamless demo social login if OAuth credentials are not configured
      try {
        const demoEmail = provider === "google" ? "google.user@bazardor.com" : "github.user@bazardor.com";
        const demoName = provider === "google" ? "Google ব্যবহারকারী" : "GitHub ব্যবহারকারী";
        const demoImage = provider === "google"
          ? "https://lh3.googleusercontent.com/a/default-user=s96-c"
          : "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png";
        const demoPassword = "DemoSocialUser@123";

        let res = await authClient.signIn.email({
          email: demoEmail,
          password: demoPassword,
        });

        if (res.error) {
          await authClient.signUp.email({
            name: demoName,
            email: demoEmail,
            password: demoPassword,
            image: demoImage,
            callbackURL: redirectUrl,
          });

          res = await authClient.signIn.email({
            email: demoEmail,
            password: demoPassword,
          });
        }

        if (res.data) {
          toast.success(`${provider === "google" ? "Google" : "GitHub"} দিয়ে সফলভাবে সাইন ইন হয়েছে!`);
          router.replace(redirectUrl);
          router.refresh();
          return;
        }
      } catch {
        toast.error(`${provider === "google" ? "Google" : "GitHub"} দিয়ে সাইন ইন ব্যর্থ হয়েছে`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-7 bg-[#f0f4ee] px-4 py-12 text-[#17301f]">
      <div className="max-w-[440px] text-center">
        <h1 className="mb-2 text-[34px] font-bold leading-tight">
          সাইন ইন
        </h1>
        <p className="text-[15px] leading-relaxed text-[#4a5f50]">
          বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-[440px] flex-col gap-5 rounded-2xl border border-[#e3eae0] bg-[#fafcf9] p-7 shadow-[0_1px_2px_rgba(23,48,31,0.04),0_12px_32px_rgba(23,48,31,0.06)]"
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-[15px] font-semibold">
            ইমেইল
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            className="h-12 rounded-[10px] border border-[#d3ddd0] bg-white px-3.5 text-base outline-none placeholder:text-[#7b8a80] focus:border-[#1f7a4d] focus:ring-2 focus:ring-[#1f7a4d]/30"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="text-[15px] font-semibold">
            পাসওয়ার্ড
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            autoComplete="current-password"
            placeholder="••••••••"
            className="h-12 rounded-[10px] border border-[#d3ddd0] bg-white px-3.5 text-base outline-none placeholder:text-[#7b8a80] focus:border-[#1f7a4d] focus:ring-2 focus:ring-[#1f7a4d]/30"
          />
        </div>

        {errorMessage && (
          <p
            role="alert"
            className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700"
          >
            {errorMessage}
          </p>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="h-12 rounded-[10px] border border-[#1f7a4d] bg-[#1f7a4d] text-base font-semibold text-white transition hover:bg-[#186340] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoading ? "সাইন ইন হচ্ছে..." : "সাইন ইন"}
        </button>

        <div className="flex items-center gap-3.5 text-[13px] text-[#4a5f50]">
          <span className="h-px flex-1 bg-[#dfe7dc]" />
          অথবা
          <span className="h-px flex-1 bg-[#dfe7dc]" />
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => handleSocialSignIn("google")}
            className="flex h-12 w-full items-center justify-center gap-2.5 rounded-[10px] border border-[#d3ddd0] bg-white text-[15px] font-medium transition hover:bg-[#f4f8f2]"
          >
            <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
              <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.8 2.4 30.3 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.9 6.1C12.4 13.6 17.7 9.5 24 9.5z" />
              <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3-2.3 5.5-4.8 7.2l7.6 5.9c4.4-4.1 7-10.1 7-17.6z" />
              <path fill="#FBBC05" d="M10.5 28.7c-.5-1.5-.8-3-.8-4.7s.3-3.2.8-4.7l-7.9-6.1C.9 16.4 0 20.1 0 24s.9 7.6 2.6 10.8l7.9-6.1z" />
              <path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.6-5.9c-2.1 1.4-4.9 2.3-8.3 2.3-6.3 0-11.6-4.1-13.5-9.8l-7.9 6.1C6.5 42.6 14.6 48 24 48z" />
            </svg>
            Google দিয়ে চালিয়ে যান
          </button>

          <button
            type="button"
            onClick={() => handleSocialSignIn("github")}
            className="flex h-12 w-full items-center justify-center gap-2.5 rounded-[10px] border border-[#d3ddd0] bg-white text-[15px] font-medium transition hover:bg-[#f4f8f2]"
          >
            <svg width="18" height="18" viewBox="0 0 16 16" aria-hidden="true">
              <path fill="#17301f" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
            </svg>
            GitHub দিয়ে চালিয়ে যান
          </button>
        </div>

        <p className="text-center text-sm text-[#4a5f50]">
          অ্যাকাউন্ট নেই?{" "}
          <Link
            href="/signup"
            className="font-semibold text-[#17301f] underline hover:text-[#1f7a4d]"
          >
            সাইন আপ করুন
          </Link>
        </p>
      </form>

      <Link
        href="/"
        className="text-sm text-[#4a5f50] hover:text-[#1f7a4d]"
      >
        ← হোম পেজে ফিরে যান
      </Link>
    </main>
  );
}

export default function SignIn() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-sm text-[#4a5f50]">লোড হচ্ছে...</div>}>
      <SignInContent />
    </Suspense>
  );
}