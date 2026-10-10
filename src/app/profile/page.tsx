"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const user = session?.user;

  // Protect route
  useEffect(() => {
    if (!isPending && !session) {
      router.replace("/signin?redirect=/profile&reason=auth_required");
    }
  }, [isPending, session, router]);

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

  // Loading state
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
      <div className="mx-auto flex w-full max-w-[520px] flex-col gap-5">
        {/* Heading */}
        <div>
          <h1 className="mb-1 text-[28px] font-bold leading-tight">
            আমার প্রোফাইল
          </h1>
          <p className="text-sm text-[#4a5f50]">
            আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
          </p>
        </div>

        {/* User card with image and buttons */}
        <section className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[#e3eae0] bg-[#fafcf9] p-5 shadow-[0_1px_2px_rgba(23,48,31,0.04),0_12px_32px_rgba(23,48,31,0.06)]">
          <div className="flex min-w-0 items-center gap-4">
            {user.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={user.image}
                alt={user.name || "প্রোফাইল ছবি"}
                className="h-14 w-14 shrink-0 rounded-xl object-cover border border-[#d3ddd0]"
              />
            ) : (
              <div
                aria-hidden="true"
                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#1f7a4d] text-xl font-bold text-white shadow-xs"
              >
                {initial}
              </div>
            )}

            <div className="min-w-0">
              <p className="truncate text-base font-semibold">{user.name || "নাম দেওয়া নেই"}</p>
              <p className="truncate text-sm text-[#4a5f50]">{user.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/profile/update"
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#1f7a4d] px-3.5 py-2 text-sm font-medium text-white transition hover:bg-[#186340]"
            >
              তথ্য আপডেট
            </Link>

            <button
              type="button"
              onClick={handleSignOut}
              className="inline-flex items-center gap-1.5 rounded-lg border border-[#e0a3a3] bg-white px-3.5 py-2 text-sm font-medium text-[#c0392b] transition hover:bg-[#fdf2f2] focus:outline-none focus:ring-2 focus:ring-[#c0392b]/20"
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

        {/* User information details section */}
        <section className="flex flex-col gap-5 rounded-2xl border border-[#e3eae0] bg-[#fafcf9] p-5 shadow-[0_1px_2px_rgba(23,48,31,0.04),0_12px_32px_rgba(23,48,31,0.06)] sm:p-6">
          <div className="flex items-center justify-between border-b border-[#e3eae0] pb-3">
            <h2 className="text-base font-semibold text-[#17301f]">ব্যক্তিগত তথ্য</h2>
            <Link
              href="/profile/update"
              className="text-xs font-semibold text-[#1f7a4d] hover:underline"
            >
              পরিবর্তন করুন →
            </Link>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-xs font-medium text-[#4a5f50]">নাম</p>
              <p className="mt-1 text-sm font-semibold text-[#17301f]">
                {user.name || "তথ্য প্রদান করা হয়নি"}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium text-[#4a5f50]">ইমেইল ঠিকানা</p>
              <p className="mt-1 text-sm font-semibold text-[#17301f]">
                {user.email}
              </p>
            </div>

            {user.image && (
              <div>
                <p className="text-xs font-medium text-[#4a5f50]">প্রোফাইল ছবি লিংক</p>
                <p className="mt-1 truncate text-xs text-[#4a5f50] font-mono">
                  {user.image}
                </p>
              </div>
            )}

            <div>
              <p className="text-xs font-medium text-[#4a5f50]">অ্যাকাউন্ট স্ট্যাটাস</p>
              <p className="mt-1 inline-flex items-center gap-1.5 text-xs font-bold text-[#1f7a4d]">
                <span className="h-2 w-2 rounded-full bg-[#1f7a4d]"></span>
                সক্রিয় সদস্য
              </p>
            </div>
          </div>

          <div className="pt-2">
            <Link
              href="/profile/update"
              className="block w-full text-center rounded-[10px] bg-[#1f7a4d] px-4 py-3 text-[15px] font-semibold text-white transition hover:bg-[#17643e]"
            >
              তথ্য পরিবর্তন করুন
            </Link>
          </div>
        </section>

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