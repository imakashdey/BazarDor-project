"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { FormEvent } from "react";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { ArrowLeft, User, Image as ImageIcon, Loader2, Save } from "lucide-react";

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
      const msg = "একটি অপ্রত্যাশিত সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।";
      setErrorMessage(msg);
      toast.error(msg);
    } finally {
      setIsSaving(false);
    }
  };

  if (isPending || !user) {
    return (
      <main className="flex min-h-[calc(100vh-140px)] items-center justify-center bg-gray-50/50 px-4">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-emerald-600"></div>
          <p className="text-sm font-medium text-gray-500">লোড হচ্ছে...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-[calc(100vh-140px)] bg-gray-50/50 px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-xl space-y-6">

        {/* Back Link */}
        <div className="flex items-center justify-between">
          <Link
            href="/profile"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-gray-600 hover:text-emerald-700 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>প্রোফাইলে ফিরে যান</span>
          </Link>
        </div>

        {/* Title */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-950">
            তথ্য পরিবর্তন ও আপডেট
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-gray-500">
            আপনার অ্যাকাউন্টের নাম ও ব্যক্তিগত তথ্য পরিবর্তন করুন।
          </p>
        </div>

        {/* Update Form Card */}
        <div className="rounded-3xl border border-gray-200/90 bg-white p-6 sm:p-8 shadow-xs">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name field */}
            <div className="space-y-1.5">
              <label htmlFor="name" className="block text-xs font-bold text-gray-700">
                আপনার পুরো নাম <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <User className="pointer-events-none absolute left-3.5 top-3 h-4 w-4 text-gray-400" />
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="যেমন: মোঃ আকাশ দে"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50/30 py-2.5 pl-10 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-emerald-600 focus:bg-white focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>
            </div>

            {/* Image URL field */}
            <div className="space-y-1.5">
              <label htmlFor="image" className="block text-xs font-bold text-gray-700">
                প্রোফাইল ছবির লিংক (Image URL - ঐচ্ছিক)
              </label>
              <div className="relative">
                <ImageIcon className="pointer-events-none absolute left-3.5 top-3 h-4 w-4 text-gray-400" />
                <input
                  id="image"
                  name="image"
                  type="url"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="https://example.com/avatar.jpg"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50/30 py-2.5 pl-10 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-emerald-600 focus:bg-white focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>
            </div>

            {/* Email (Read-only) */}
            <div className="space-y-1.5 opacity-70">
              <label className="block text-xs font-bold text-gray-500">
                ইমেইল (পরিবর্তনযোগ্য নয়)
              </label>
              <input
                type="email"
                disabled
                value={user.email}
                className="w-full cursor-not-allowed rounded-xl border border-gray-200 bg-gray-100 py-2.5 px-4 text-sm text-gray-600"
              />
            </div>

            {errorMessage && (
              <div role="alert" className="rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-700">
                {errorMessage}
              </div>
            )}

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="submit"
                disabled={isSaving}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-700 py-3 text-sm font-bold text-white shadow-xs transition hover:bg-emerald-800 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>আপডেট হচ্ছে...</span>
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    <span>তথ্য আপডেট করুন</span>
                  </>
                )}
              </button>

              <Link
                href="/profile"
                className="flex items-center justify-center rounded-xl border border-gray-200 bg-white py-3 px-5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
              >
                বাতিল করুন
              </Link>
            </div>
          </form>
        </div>

      </div>
    </main>
  );
}
