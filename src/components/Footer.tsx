import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
          {/* Left branding */}
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-700 text-sm font-bold text-white">
              🛒
            </span>
            <p className="text-sm font-bold text-gray-800">
              বাজার দর — <span className="font-normal text-gray-600">প্রয়োজনীয় পণ্যের দাম এক নজরে।</span>
            </p>
          </div>

          {/* Right disclaimer */}
          <p className="text-xs text-gray-500 max-w-md text-center sm:text-right">
            সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
          </p>
        </div>

        {/* Bottom copyright line */}
        <div className="mt-6 border-t border-gray-100 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-400">
          <p>© 2026 বাজার দর (BazarDor). সর্বস্বত্ব সংরক্ষিত।</p>
          <div className="flex items-center gap-4">
            <Link href="/" className="hover:text-emerald-700 transition-colors">
              হোম
            </Link>
            <span>•</span>
            <Link href="/signin" className="hover:text-emerald-700 transition-colors">
              সাইন ইন
            </Link>
            <span>•</span>
            <Link href="/signup" className="hover:text-emerald-700 transition-colors">
              সাইন আপ
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;