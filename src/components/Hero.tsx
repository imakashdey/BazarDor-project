"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { toBnDate } from "@/lib/utils";

const Hero = () => {
  const [date, setDate] = useState("");

  useEffect(() => {
    setDate(toBnDate());
  }, []);

  return (
    <section className="bg-green-50/60 px-4 py-6">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-3xl border border-gray-200 bg-white/80 px-6 py-6 md:px-12">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          {/* Left */}
          <div className="max-w-xl">
            <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
              {date}
            </span>

            <h1 className="mt-3 text-3xl font-extrabold text-gray-900 md:text-4xl">
              আজকের বাজারের দাম এক নজরে
            </h1>

            <p className="mt-4 text-sm leading-relaxed text-gray-600 pb-4">
              চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
              বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
            </p>

            <a
              href="#সব-পণ্য"
              className="mt-6 inline-block rounded-lg border border-green-600 px-6 py-2 text-sm font-semibold text-green-700 transition hover:bg-green-600 hover:text-white"
            >
              সব দাম দেখুন
            </a>
          </div>

          {/* Right: your image */}
          <div className="self-center">
            <Image
              src="/bazar-hero.png"
              alt="ফলের ঝুড়ি"
              width={260}
              height={200}
              className="h-44 w-auto md:h-52"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;