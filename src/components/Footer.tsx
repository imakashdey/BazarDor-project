const Footer = () => {
  return (
    <footer className="mt-auto border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
    <div className="flex items-start justify-between gap-2 text-center sm:items-center sm:gap-3 sm:text-left">
      <p className="flex-1 text-[11px] font-semibold leading-5 text-gray-700 sm:text-sm sm:leading-6">
        বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
      </p>

      <p className="flex-1 text-[11px] leading-5 text-gray-500 sm:text-right sm:text-sm sm:leading-6">
        সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
      </p>
    </div>
      </div>
    </footer>
  );
};

export default Footer;