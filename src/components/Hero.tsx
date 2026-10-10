import Image from "next/image";
import { toBnDate } from "@/lib/utils";
import { ArrowDown } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50/50 via-white to-gray-50/30 px-4 py-8 sm:py-12">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-3xl border border-emerald-100 bg-gradient-to-r from-emerald-900/[0.03] via-white to-emerald-800/[0.04] p-6 sm:p-10 md:p-12 shadow-sm">
          {/* Decorative background blob */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-emerald-200/30 blur-3xl" />
          <div className="pointer-events-none absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-green-200/20 blur-3xl" />

          <div className="relative grid grid-cols-1 items-center gap-8 md:grid-cols-12">
            {/* Left Content */}
            <div className="md:col-span-7">
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-1 text-xs font-bold text-emerald-800 shadow-2xs">
                <span className="inline-block h-2 w-2 rounded-full bg-emerald-600 animate-pulse" />
                <span>{toBnDate()}</span>
                <span className="text-emerald-400">•</span>
                <span className="font-medium text-emerald-700">দৈনিক হালনাগাদ</span>
              </div>

              {/* Main Heading */}
              <h1 className="mt-4 text-3xl font-black tracking-tight text-gray-950 sm:text-4xl lg:text-5xl lg:leading-[1.15]">
                আজকের বাজারের দরদাম{" "}
                <span className="bg-gradient-to-r from-emerald-700 to-green-600 bg-clip-text text-transparent">
                  এক নজরে
                </span>
              </h1>

              {/* Subtitle */}
              <p className="mt-4 text-sm leading-relaxed text-gray-600 sm:text-base max-w-xl">
                চাল, ডাল, তেল, শাকসবজি, মাছ, মাংস ও মসলার সঠিক বাজারদর — বাজারভিত্তিক সর্বনিম্ন-সর্বোচ্চ
                মূল্য, গড় হিসাব এবং দৈনন্দিন মূল্য পরিবর্তন এক ঠিকানায়।
              </p>

              {/* Action Buttons */}
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <a
                  href="#সব-পণ্য"
                  className="inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-emerald-800 hover:shadow hover:-translate-y-0.5 active:translate-y-0"
                >
                  <span>সব পণ্য ও দাম দেখুন</span>
                  <ArrowDown className="h-4 w-4" />
                </a>

                <a
                  href="#আজ-দাম-বেড়েছে"
                  className="inline-flex items-center gap-1.5 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50 hover:text-gray-900"
                >
                  <span>দাম বৃদ্ধি ও হ্রাস</span>
                </a>
              </div>

              {/* Feature points */}
              <div className="mt-8 flex flex-wrap items-center gap-4 text-xs font-medium text-gray-500 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-1.5">
                  <span className="text-emerald-600">✓</span>
                  <span>সঠিক বাজার দর</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-emerald-600">✓</span>
                  <span>বিভাগীয় তুলনা</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-emerald-600">✓</span>
                  <span>স্বচ্ছ মূল্য তালিকা</span>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="flex justify-center md:col-span-5 md:justify-end">
              <div className="relative">
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-emerald-500/20 to-lime-500/10 blur-xl"></div>
                <div className="relative rounded-3xl bg-gradient-to-b from-white/90 to-emerald-50/50 p-4 shadow-sm border border-emerald-100">
                  <Image
                    src="/bazar-hero.png"
                    alt="বাজার দর পণ্য সামগ্রী"
                    width={320}
                    height={260}
                    className="h-48 w-auto object-contain sm:h-56 md:h-64"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;