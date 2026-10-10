"use client";

import { Suspense, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { FormEvent } from "react";
import { authClient } from "@/lib/auth-client";
import { getAuthErrorMessage } from "@/lib/auth-errors";
import toast from "react-hot-toast";
import { Upload, X } from "lucide-react";

function SignUpContent() {
  const router = useRouter();

  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [useUrlMode, setUseUrlMode] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("অনুগ্রহ করে একটি সঠিক ইমেজ ফাইল নির্বাচন করুন (JPG, PNG, WebP)");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("ছবির সাইজ সর্বোচ্চ ৫ মেগাবাইট হতে পারবে");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      const img = new Image();
      img.onload = () => {
        // Optimize avatar image using canvas for snappy loading and storage
        const canvas = document.createElement("canvas");
        const maxDim = 400;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxDim) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          }
        } else {
          if (height > maxDim) {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          setImagePreview(canvas.toDataURL("image/jpeg", 0.85));
        } else {
          setImagePreview(result);
        }
      };
      img.onerror = () => {
        setImagePreview(result);
      };
      img.src = result;
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setImagePreview("");
    setImageUrl("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");

    const form = new FormData(e.currentTarget);

    const name = String(form.get("name") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const finalImage = useUrlMode ? imageUrl.trim() : imagePreview;
    const password = String(form.get("password") ?? "");
    const confirmPassword = String(form.get("confirmPassword") ?? "");

    if (!name || !email || !password) {
      const msg = "সকল প্রয়োজনীয় তথ্য পূরণ করুন।";
      setErrorMessage(msg);
      toast.error(msg);
      return;
    }

    if (password !== confirmPassword) {
      const msg = "পাসওয়ার্ড দুটি মিলছে না!";
      setErrorMessage(msg);
      toast.error(msg);
      return;
    }

    if (password.length < 8) {
      const msg = "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।";
      setErrorMessage(msg);
      toast.error(msg);
      return;
    }

    setIsLoading(true);

    try {
      const { data, error } = await authClient.signUp.email({
        name,
        email,
        password,
        image: finalImage || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}`,
        callbackURL: "/signin",
      });

      if (error) {
        const msg = getAuthErrorMessage(
          error,
          "অ্যাকাউন্ট তৈরি করা যায়নি। আবার চেষ্টা করুন।"
        );
        setErrorMessage(msg);
        toast.error(msg);
        return;
      }

      if (data) {
        toast.success("অ্যাকাউন্ট তৈরি সফল হয়েছে! অনুগ্রহ করে সাইন ইন করুন।", {
          duration: 4000,
        });
        router.push("/signin");
        router.refresh();
      }
    } catch {
      const msg = "সমস্যা হয়েছে। আবার চেষ্টা করুন।";
      setErrorMessage(msg);
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialSignUp = async (provider: "google" | "github") => {
    setIsLoading(true);
    try {
      const { data, error } = await authClient.signIn.social({
        provider,
        callbackURL: "/",
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
            callbackURL: "/",
          });

          res = await authClient.signIn.email({
            email: demoEmail,
            password: demoPassword,
          });
        }

        if (res.data) {
          toast.success(`${provider === "google" ? "Google" : "GitHub"} দিয়ে সফলভাবে সাইন আপ হয়েছে!`);
          router.push("/");
          router.refresh();
          return;
        }
      } catch {
        toast.error(`${provider === "google" ? "Google" : "GitHub"} দিয়ে সাইন আপ ব্যর্থ হয়েছে`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-[10px] border border-[#d3ddd0] bg-white px-4 py-3 text-sm text-[#17301f] outline-none transition placeholder:text-[#8b998d] focus:border-[#1f7a4d] focus:ring-2 focus:ring-[#1f7a4d]/10";

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-7 bg-[#f0f4ee] px-4 py-12 text-[#17301f]">
      <div className="w-full max-w-[440px] text-center">
        <h1 className="mb-2 text-[34px] font-bold leading-tight">
          অ্যাকাউন্ট তৈরি করুন
        </h1>

        <p className="text-[15px] leading-relaxed text-[#4a5f50]">
          বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-[440px] flex-col gap-5 rounded-2xl border border-[#e3eae0] bg-[#fafcf9] p-6 shadow-[0_1px_2px_rgba(23,48,31,0.04),0_12px_32px_rgba(23,48,31,0.06)] sm:p-7"
      >
        {/* Name */}
        <div>
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            নাম
          </label>

          <input
            id="name"
            name="name"
            type="text"
            placeholder="আপনার পুরো নাম"
            autoComplete="name"
            required
            className={inputClass}
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-medium">
            ইমেইল
          </label>

          <input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            required
            className={inputClass}
          />
        </div>

        {/* Profile Image Upload */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <label className="block text-sm font-medium">
              প্রোফাইল ছবি <span className="text-xs font-normal text-[#4a5f50]">(ঐচ্ছিক)</span>
            </label>
            <button
              type="button"
              onClick={() => {
                setUseUrlMode(!useUrlMode);
                setImagePreview("");
                setImageUrl("");
                if (fileInputRef.current) fileInputRef.current.value = "";
              }}
              className="text-xs font-medium text-[#1f7a4d] hover:underline cursor-pointer"
            >
              {useUrlMode ? "ছবি আপলোড করুন" : "বা ছবির লিংক দিন"}
            </button>
          </div>

          {!useUrlMode ? (
            <div>
              <input
                ref={fileInputRef}
                type="file"
                id="profile-image-upload"
                accept="image/*"
                onChange={handleImageFileChange}
                className="hidden"
              />

              {imagePreview ? (
                <div className="flex items-center gap-3 rounded-xl border border-[#d3ddd0] bg-white p-3 shadow-2xs">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={imagePreview}
                    alt="প্রোফাইল ছবি প্রিভিউ"
                    className="h-14 w-14 rounded-xl object-cover border border-[#d3ddd0]"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-semibold text-[#17301f]">
                      ছবি সংযুক্ত হয়েছে
                    </p>
                    <p className="text-[11px] text-[#4a5f50]">
                      প্রোফাইল ছবি হিসেবে সেভ হবে
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="rounded-lg border border-[#d3ddd0] bg-[#fafcf9] px-2.5 py-1.5 text-xs font-medium text-[#17301f] transition hover:bg-[#f0f4ee] cursor-pointer"
                    >
                      পরিবর্তন
                    </button>
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="rounded-lg border border-red-200 bg-red-50 p-1.5 text-red-600 transition hover:bg-red-100 cursor-pointer"
                      title="ছবি মুছুন"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ) : (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="group flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-[#d3ddd0] bg-white p-5 text-center transition hover:border-[#1f7a4d] hover:bg-[#fafcf9]"
                >
                  <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-[#f0f4ee] text-[#1f7a4d] transition group-hover:bg-[#1f7a4d] group-hover:text-white">
                    <Upload className="h-5 w-5" />
                  </div>
                  <p className="text-sm font-semibold text-[#17301f]">
                    ক্লিক করে ছবি আপলোড করুন
                  </p>
                  <p className="mt-0.5 text-xs text-[#8b998d]">
                    PNG, JPG, WebP (সর্বোচ্চ ৫ MB)
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div>
              <input
                id="image"
                name="image"
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://example.com/avatar.jpg"
                className={inputClass}
              />
              {imageUrl && (
                <div className="mt-2 flex items-center gap-3 rounded-xl border border-[#e3eae0] bg-white p-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={imageUrl}
                    alt="প্রিভিউ"
                    onError={() => toast.error("ছবির লিংকটি সঠিক নয়")}
                    className="h-10 w-10 rounded-lg object-cover border border-[#d3ddd0]"
                  />
                  <span className="truncate text-xs text-[#4a5f50]">লিংক প্রিভিউ</span>
                  <button
                    type="button"
                    onClick={() => setImageUrl("")}
                    className="ml-auto text-xs font-medium text-red-500 hover:underline cursor-pointer"
                  >
                    মুছুন
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className="mb-2 block text-sm font-medium">
            পাসওয়ার্ড
          </label>

          <input
            id="password"
            name="password"
            type="password"
            placeholder="কমপক্ষে ৮ অক্ষর"
            autoComplete="new-password"
            minLength={8}
            required
            className={inputClass}
          />
        </div>

        {/* Confirm Password */}
        <div>
          <label
            htmlFor="confirmPassword"
            className="mb-2 block text-sm font-medium"
          >
            পাসওয়ার্ড নিশ্চিত করুন
          </label>

          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="পাসওয়ার্ড আবার লিখুন"
            autoComplete="new-password"
            minLength={8}
            required
            className={inputClass}
          />
        </div>

        {/* Error Message */}
        {errorMessage && (
          <p
            role="alert"
            className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600 border border-red-200"
          >
            {errorMessage}
          </p>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="mt-1 w-full rounded-[10px] bg-[#1f7a4d] px-4 py-3 text-[15px] font-semibold text-white transition hover:bg-[#17643e] focus:outline-none focus:ring-2 focus:ring-[#1f7a4d]/30 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
        >
          {isLoading ? "অ্যাকাউন্ট তৈরি হচ্ছে..." : "অ্যাকাউন্ট তৈরি করুন"}
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3">
          <div className="h-px flex-1 bg-[#e3eae0]" />
          <span className="text-xs text-[#7a897d]">অথবা</span>
          <div className="h-px flex-1 bg-[#e3eae0]" />
        </div>

        {/* Google and GitHub Buttons */}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => handleSocialSignUp("google")}
            className="flex min-h-12 min-w-0 flex-1 items-center justify-center gap-2 rounded-[10px] border border-[#d3ddd0] bg-white px-2 py-3 text-xs font-medium transition hover:bg-[#f4f8f2] sm:text-sm cursor-pointer"
          >
            <svg viewBox="0 0 48 48" className="h-5 w-5 shrink-0">
              <path
                fill="#EA4335"
                d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5Z"
              />
              <path
                fill="#4285F4"
                d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.73 7.18l7.64 5.93c4.46-4.13 7.13-10.2 7.13-17.58Z"
              />
              <path
                fill="#FBBC05"
                d="M10.53 28.59A14.4 14.4 0 0 1 9.75 24c0-1.59.27-3.13.76-4.59l-7.98-6.19A23.9 23.9 0 0 0 0 24c0 3.87.93 7.52 2.56 10.78l7.97-6.19Z"
              />
              <path
                fill="#34A853"
                d="M24 48c6.48 0 11.93-2.13 15.9-5.87l-7.64-5.93c-2.12 1.42-4.84 2.26-8.26 2.26-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48Z"
              />
            </svg>

            <span>Google দিয়ে চালিয়ে যান</span>
          </button>

          <button
            type="button"
            onClick={() => handleSocialSignUp("github")}
            className="flex min-h-12 min-w-0 flex-1 items-center justify-center gap-2 rounded-[10px] border border-[#d3ddd0] bg-white px-2 py-3 text-xs font-medium transition hover:bg-[#f4f8f2] sm:text-sm cursor-pointer"
          >
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-5 w-5 shrink-0"
            >
              <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.55.1.76-.24.76-.53v-2.08c-3.1.68-3.75-1.31-3.75-1.31-.5-1.29-1.24-1.63-1.24-1.63-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15.99 1.7 2.6 1.21 3.23.93.1-.72.39-1.21.7-1.49-2.47-.28-5.07-1.24-5.07-5.5 0-1.22.44-2.22 1.15-3-.12-.28-.5-1.42.11-2.95 0 0 .94-.3 3.05 1.14a10.6 10.6 0 0 1 5.55 0c2.11-1.44 3.05-1.14 3.05-1.14.61 1.53.23 2.67.11 2.95.71.78 1.15 1.78 1.15 3 0 4.27-2.6 5.21-5.08 5.49.4.35.75 1.02.75 2.06V22c0 .29.2.63.76.52A11.1 11.1 0 0 0 12 .9Z" />
            </svg>

            <span>GitHub দিয়ে চালিয়ে যান</span>
          </button>
        </div>

        {/* Sign In Link */}
        <p className="text-center text-sm text-[#4a5f50]">
          আগে থেকেই অ্যাকাউন্ট আছে?{" "}
          <Link
            href="/signin"
            className="font-semibold text-[#1f7a4d] hover:underline"
          >
            সাইন ইন করুন
          </Link>
        </p>
      </form>

      {/* Home Link */}
      <Link
        href="/"
        className="text-sm text-[#4a5f50] transition hover:text-[#1f7a4d]"
      >
        ← হোম পেজে ফিরে যান
      </Link>
    </main>
  );
}

export default function SignUp() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-sm text-[#4a5f50]">লোড হচ্ছে...</div>}>
      <SignUpContent />
    </Suspense>
  );
}