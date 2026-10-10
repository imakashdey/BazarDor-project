"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { FormEvent } from "react";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function UpdateProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const user = session?.user;

  // Protect route
  useEffect(() => {
    if (!isPending && !session) {
      router.replace("/signin?redirect=/profile/update&reason=auth_required");
    }
  }, [isPending, session, router]);

  // Pre-fill user data
  useEffect(() => {
    if (user?.name) setName(user.name);
    if (user?.image) setImage(user.image);
  }, [user?.name, user?.image]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");

    const trimmedName = name.trim();
    if (!trimmedName) {
      const msg = "নামের ঘর খালি রাখা যাবে না।";
      setErrorMessage(msg);
      toast.error(msg);
      return;
    }

    setIsSaving(true);

    try {
      // BetterAuth updateUser API
      const { error } = await authClient.updateUser({
        name: trimmedName,
        image: image.trim() || undefined,
      });

      if (error) {
        const msg = error.message || "তথ্য আপডেট করা যায়নি। আবার চেষ্টা করুন।";
        setErrorMessage(msg);
        toast.error(msg);
        return;
      }

      toast.success("প্রোফাইলের তথ্য সফলভাবে আপডেট হয়েছে!");
      router.push("/profile");
      router.refresh();
    } catch {
      const msg = "একটি সমস্যা হয়েছে। আবার চেষ্টা করুন।";
      setErrorMessage(msg);
      toast.error(msg);
    } finally {
      setIsSaving(false);
    }
  };

  const inputClass =
    "w-full rounded-[10px] border border-[#d3ddd0] bg-white px-4 py-3 text-sm text-[#17301f] outline-none transition placeholder:text-[#8b998d] focus:border-[#1f7a4d] focus:ring-2 focus:ring-[#1f7a4d]/10 disabled:cursor-not-allowed disabled:bg-[#f4f7f2] disabled:text-[#6b7c6f]";

  if (isPending || !user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f0f4ee] px-4">
        <p className="text-sm text-[#4a5f50]">লোড হচ্ছে...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f0f4ee] px-4 py-12 text-[#17301f]">
      <div className="mx-auto flex w-full max-w-[520px] flex-col gap-5">
        {/* Heading */}
        <div>
          <h1 className="mb-1 text-[28px] font-bold leading-tight">
            তথ্য আপডেট করুন
          </h1>
          <p className="text-sm text-[#4a5f50]">
            আপনার নাম এবং প্রোফাইল ছবি পরিবর্তন করুন।
          </p>
        </div>

        {/* Update Form Card */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 rounded-2xl border border-[#e3eae0] bg-[#fafcf9] p-5 shadow-[0_1px_2px_rgba(23,48,31,0.04),0_12px_32px_rgba(23,48,31,0.06)] sm:p-6"
        >
          <h2 className="text-base font-semibold">প্রোফাইল তথ্য</h2>

          {/* Name Field */}
          <div>
            <label htmlFor="name" className="mb-2 block text-sm font-medium">
              আপনার পুরো নাম <span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="আপনার পুরো নাম"
              autoComplete="name"
              className={inputClass}
            />
          </div>

          {/* Image URL Field */}
          <div>
            <label htmlFor="image" className="mb-2 block text-sm font-medium">
              প্রোফাইল ছবি লিংক (Image URL - ঐচ্ছিক)
            </label>
            <input
              id="image"
              name="image"
              type="url"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="https://example.com/photo.jpg"
              className={inputClass}
            />
            <p className="mt-1 text-xs text-[#7a897d]">
              সরাসরি যেকোনো ছবির লিঙ্ক প্রদান করতে পারেন।
            </p>
          </div>

          {/* Email (Read-only) */}
          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium text-[#7a897d]">
              ইমেইল (পরিবর্তনযোগ্য নয়)
            </label>
            <input
              id="email"
              type="email"
              disabled
              value={user.email}
              className={inputClass}
            />
          </div>

          {errorMessage && (
            <p
              role="alert"
              className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600 border border-red-200"
            >
              {errorMessage}
            </p>
          )}

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              type="submit"
              disabled={isSaving}
              className="flex-1 rounded-[10px] bg-[#1f7a4d] px-4 py-3 text-[15px] font-semibold text-white transition hover:bg-[#17643e] focus:outline-none focus:ring-2 focus:ring-[#1f7a4d]/30 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSaving ? "আপডেট হচ্ছে..." : "তথ্য সংরক্ষণ করুন"}
            </button>

            <Link
              href="/profile"
              className="flex items-center justify-center rounded-[10px] border border-[#d3ddd0] bg-white px-5 py-3 text-sm font-semibold text-[#17301f] transition hover:bg-[#f4f8f2]"
            >
              বাতিল
            </Link>
          </div>
        </form>

        <Link
          href="/profile"
          className="text-sm text-[#4a5f50] transition hover:text-[#1f7a4d]"
        >
          ← প্রোফাইলে ফিরে যান
        </Link>
      </div>
    </main>
  );
}
