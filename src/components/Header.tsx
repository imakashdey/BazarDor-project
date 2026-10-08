"use client";

import Image from "next/image";
import Link from "next/link";

const Header = () => {
  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  return (
    <header className="border-t-2 border-gray-700 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">

        {/* Logo + Title + Date */}
        <div className="flex items-center gap-3">
          <Link
          href="/"
          aria-label="বাজার দর"
          className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-green-700 text-3xl"
        >
          🛒
        </Link>

          <div>
            <h1 className="text-2xl font-bold text-black">
              বাজার দর
            </h1>

            <p className="text-xs text-gray-600">
              {date}
            </p>
          </div>
        </div>

        {/* Right Buttons */}
        <div className="flex items-center gap-2 text-[14px]">
          <Link
            href="/signin"
            className="rounded-md px-3 py-2 text-sm text-black font-semibold transition hover:bg-gray-100"
          >
            সাইন ইন
          </Link>

          <Link
            href="/signup"
            className="rounded-md text-black font-semibold px-4 py-2 transition hover:bg-red-800"
          >
            সাইন আপ
          </Link>
        </div>

      </div>
    </header>
  );
};

export default Header;