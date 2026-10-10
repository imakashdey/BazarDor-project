import Link from "next/link";
import { ArrowLeft, SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-[calc(100vh-160px)] flex-col items-center justify-center px-4 py-16 text-center">
      <div className="mx-auto max-w-md space-y-6">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-red-50 text-red-600 border border-red-100 shadow-xs">
          <SearchX className="h-10 w-10" />
        </div>

        <div className="space-y-2">
          <span className="inline-block rounded-full bg-red-100 px-3 py-1 text-xs font-bold text-red-700">
            ৪০৪ ত্রুটি
          </span>
          <h1 className="text-3xl font-black text-gray-950 sm:text-4xl">
            পেজটি খুঁজে পাওয়া যায়নি
          </h1>
          <p className="text-sm text-gray-600 leading-relaxed">
            আপনি যে পেজ বা পণ্যটি খুঁজছেন তা হয়তো সরিয়ে ফেলা হয়েছে, নাম পরিবর্তন করা হয়েছে অথবা লিঙ্কটি সঠিক নয়।
          </p>
        </div>

        <div className="pt-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-6 py-3 text-sm font-bold text-white shadow-xs transition-all hover:bg-emerald-800 hover:shadow hover:-translate-y-0.5"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>হোম পেজে ফিরে যান</span>
          </Link>
        </div>
      </div>
    </main>
  );
}