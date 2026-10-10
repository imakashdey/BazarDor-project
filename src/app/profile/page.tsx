"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { FormEvent } from "react";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const [name, setName] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const user = session?.user;

  // Protect route
  useEffect(() => {
    if (!isPending && !session) {
      router.replace("/signin?redirect=/profile&reason=auth_required");
    }
  }, [isPending, session, router]);

  // Pre-fill name
  useEffect(() => {
    if (user?.name) setName(user.name);
  }, [user?.name]);

  const handleSignOut = async () => {
    try {
      await authClient.signOut();
      toast.success("সফলভাবে সাইন আউট করা হয়েছে");
      router.push("/signin");
      router.refresh();
    } catch {
      toast.error("সাইন আউট করতে সমস্যা হয়েছে");
    }
  };

  const handleSave = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage(null);

    const trimmed = name.trim();
    if (!trimmed) {
      const msg = "নাম খালি রাখা যাবে না।";
      setMessage({ type: "error", text: msg });
      toast.error(msg);
      return;
    }

    setIsSaving(true);
    try {
      const { error } = await authClient.updateUser({ name: trimmed });

      if (error) {
        const msg = error.message || "তথ্য সংরক্ষণ করা যায়নি।";
        setMessage({ type: "error", text: msg });
        toast.error(msg);
        return;
      }

      toast.success("তথ্য সফলভাবে সংরক্ষণ হয়েছে!");
      setMessage({ type: "success", text: "তথ্য সংরক্ষণ হয়েছে।" });
      router.refresh();
    } catch {
      const msg = "সমস্যা হয়েছে। আবার চেষ্টা করুন।";
      setMessage({ type: "error", text: msg });
      toast.error(msg);
    } finally {
      setIsSaving(false);
    }
  };

  const inputClass =
    "w-full rounded-[10px] border border-[#d3ddd0] bg-white px-4 py-3 text-sm text-[#17301f] outline-none transition placeholder:text-[#8b998d] focus:border-[#1f7a4d] focus:ring-2 focus:ring-[#1f7a4d]/10 disabled:cursor-not-allowed disabled:bg-[#f4f7f2]";

  if (isPending || !user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f0f4ee] px-4">
        <p className="text-sm text-[#4a5f50]">লোড হচ্ছে...</p>
      </main>
    );
  }

  const initial = (user.name || user.email || "?").trim().charAt(0).toUpperCase();

  return (
    <main className="min-h-screen bg-[#f0f4ee] px-4 py-12 text-[#17301f]">
      <div className="mx-auto flex w-full max-w-[580px] flex-col gap-6">
        {/* Title & Subtitle */}
        <div>
          <h1 className="mb-1 text-[28px] font-bold leading-tight">
            আমার প্রোফাইল
          </h1>
          <p className="text-sm text-[#4a5f50]">
            আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
          </p>
        </div>

        {/* Card 1: User Profile Card */}
        <section className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[#e3eae0] bg-[#fafcf9] p-5 shadow-[0_1px_2px_rgba(23,48,31,0.04),0_12px_32px_rgba(23,48,31,0.06)]">
          <div className="flex min-w-0 items-center gap-4">
            {user.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={user.image}
                alt={user.name || "প্রোফাইল ছবি"}
                className="h-16 w-16 shrink-0 rounded-xl object-cover border border-[#d3ddd0] bg-white"
              />
            ) : (
              <div
                aria-hidden="true"
                className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-[#1f7a4d] text-2xl font-bold text-white shadow-xs"
              >
                {initial}
              </div>
            )}

            <div className="min-w-0">
              <p className="truncate text-base font-bold text-[#17301f]">
                {user.name || "নাম দেওয়া নেই"}
              </p>
              <p className="truncate text-xs sm:text-sm text-[#4a5f50]">
                {user.email}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/profile/update"
              className="inline-flex items-center gap-1.5 rounded-lg border border-[#1f7a4d] bg-[#1f7a4d] px-3.5 py-2 text-xs sm:text-sm font-semibold text-white transition hover:bg-[#186340] focus:outline-none focus:ring-2 focus:ring-[#1f7a4d]/30 cursor-pointer shadow-2xs"
            >
              তথ্য আপডেট করুন
            </Link>

            <button
              type="button"
              onClick={handleSignOut}
              className="inline-flex items-center gap-1.5 rounded-lg border border-[#e0a3a3] bg-white px-3.5 py-2 text-xs sm:text-sm font-semibold text-[#c0392b] transition hover:bg-[#fdf2f2] focus:outline-none focus:ring-2 focus:ring-[#c0392b]/20 cursor-pointer"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
                aria-hidden="true"
              >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <path d="m16 17 5-5-5-5" />
                <path d="M21 12H9" />
              </svg>
              সাইন আউট
            </button>
          </div>
        </section>

        {/* Card 2: তথ্য Form */}
        <form
          onSubmit={handleSave}
          className="flex flex-col gap-5 rounded-2xl border border-[#e3eae0] bg-[#fafcf9] p-5 shadow-[0_1px_2px_rgba(23,48,31,0.04),0_12px_32px_rgba(23,48,31,0.06)] sm:p-6"
        >
          <h2 className="text-base font-bold text-[#17301f]">তথ্য</h2>

          <div>
            <label htmlFor="name" className="mb-2 block text-xs font-semibold text-[#17301f]">
              নাম
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="আপনার পুরো নাম"
              autoComplete="name"
              required
              className={inputClass}
            />
          </div>

          {message && (
            <p
              role="alert"
              className={`rounded-lg px-3.5 py-2.5 text-xs font-medium ${
                message.type === "success"
                  ? "bg-[#eaf5ee] text-[#1f7a4d] border border-emerald-200"
                  : "bg-red-50 text-red-600 border border-red-200"
              }`}
            >
              {message.text}
            </p>
          )}

          <button
            type="submit"
            disabled={isSaving}
            className="w-full rounded-[10px] bg-[#1f7a4d] px-4 py-3 text-[15px] font-semibold text-white transition hover:bg-[#17643e] focus:outline-none focus:ring-2 focus:ring-[#1f7a4d]/30 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
          >
            {isSaving ? "সংরক্ষণ হচ্ছে..." : "সংরক্ষণ করুন"}
          </button>
        </form>

        <Link
          href="/"
          className="text-sm text-[#4a5f50] transition hover:text-[#1f7a4d]"
        >
          ← হোম পেজে ফিরে যান
        </Link>
      </div>
    </main>
  );
}