"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { User, Mail, Calendar, Edit3, LogOut, ArrowLeft, ShieldCheck } from "lucide-react";
import { toBnDate } from "@/lib/utils";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const user = session?.user;

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

  if (isPending || !user) {
    return (
      <main className="flex min-h-[calc(100vh-140px)] items-center justify-center bg-gray-50/50 px-4">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-emerald-600"></div>
          <p className="text-sm font-medium text-gray-500">প্রোফাইল লোড হচ্ছে...</p>
        </div>
      </main>
    );
  }

  const initial = (user.name || user.email || "U").trim().charAt(0).toUpperCase();

  return (
    <main className="min-h-[calc(100vh-140px)] bg-gray-50/50 px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-2xl space-y-6">

        {/* Back Link */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-gray-600 hover:text-emerald-700 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>হোমে ফিরে যান</span>
          </Link>
        </div>

        {/* Header */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-950">
            আমার প্রোফাইল
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-gray-500">
            আপনার অ্যাকাউন্টের যাবতীয় তথ্য এবং সেটিংস এখানে দেখতে পাবেন।
          </p>
        </div>

        {/* Profile Details Card */}
        <div className="overflow-hidden rounded-3xl border border-gray-200/90 bg-white shadow-xs">
          {/* Cover gradient */}
          <div className="h-28 bg-gradient-to-r from-emerald-700 via-teal-700 to-green-600 p-6 flex items-end"></div>

          {/* User info banner */}
          <div className="relative px-6 pb-6 pt-0">
            <div className="-mt-12 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              {/* Avatar */}
              <div className="flex items-end gap-4">
                {user.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={user.image}
                    alt={user.name || "User"}
                    className="h-24 w-24 rounded-2xl border-4 border-white object-cover shadow-sm bg-white"
                  />
                ) : (
                  <div className="flex h-24 w-24 items-center justify-center rounded-2xl border-4 border-white bg-emerald-700 text-3xl font-black text-white shadow-sm">
                    {initial}
                  </div>
                )}

                <div className="mb-1">
                  <h2 className="text-xl font-bold text-gray-950 flex items-center gap-2">
                    <span>{user.name || "নাম দেওয়া নেই"}</span>
                    <ShieldCheck className="h-4 w-4 text-emerald-600" />
                  </h2>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
              </div>

              {/* Action Buttons: Update Information route button + Sign out */}
              <div className="flex flex-wrap items-center gap-2.5 pt-2 sm:pt-0">
                <Link
                  href="/profile/update"
                  className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-700 px-4 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-2xs transition hover:bg-emerald-800"
                >
                  <Edit3 className="h-4 w-4" />
                  <span>তথ্য পরিবর্তন করুন</span>
                </Link>

                <button
                  type="button"
                  onClick={handleSignOut}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-red-200 bg-red-50/60 px-4 py-2.5 text-xs sm:text-sm font-semibold text-red-700 transition hover:bg-red-100"
                >
                  <LogOut className="h-4 w-4" />
                  <span>সাইন আউট</span>
                </button>
              </div>
            </div>

            {/* Additional User Info Fields */}
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 border-t border-gray-100 pt-6">
              <div className="flex items-start gap-3 rounded-2xl border border-gray-100 bg-gray-50/50 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-800">
                  <User className="h-5 w-5" />
                </div>
                <div>
                  <span className="block text-xs text-gray-500 font-medium">ব্যবহারকারীর নাম</span>
                  <span className="text-sm font-bold text-gray-900">{user.name || "নাই"}</span>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-2xl border border-gray-100 bg-gray-50/50 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-800">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <span className="block text-xs text-gray-500 font-medium">ইমেইল ঠিকানা</span>
                  <span className="text-sm font-bold text-gray-900">{user.email}</span>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-2xl border border-gray-100 bg-gray-50/50 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-800">
                  <Calendar className="h-5 w-5" />
                </div>
                <div>
                  <span className="block text-xs text-gray-500 font-medium">অ্যাকাউন্ট খোলার তারিখ</span>
                  <span className="text-sm font-bold text-gray-900">
                    {user.createdAt ? toBnDate(new Date(user.createdAt)) : "হালনাগাদকৃত"}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-2xl border border-gray-100 bg-gray-50/50 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-800">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <span className="block text-xs text-gray-500 font-medium">অ্যাকাউন্ট স্ট্যাটাস</span>
                  <span className="inline-flex items-center gap-1 text-sm font-bold text-emerald-700">
                    <span className="h-2 w-2 rounded-full bg-emerald-600"></span>
                    সক্রিয় সদস্য
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}