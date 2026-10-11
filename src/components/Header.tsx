
"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { User, LogOut, ChevronDown } from "lucide-react";

const Header = () => {
  const router = useRouter();
  const [date, setDate] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const { data: session, isPending } = authClient.useSession();

  // Bangladesh date
  useEffect(() => {
    const updateDate = () => {
      const bangladeshDate = new Intl.DateTimeFormat("bn-BD", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "Asia/Dhaka",
      }).format(new Date());

      setDate(bangladeshDate);
    };

    updateDate();
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Sign out
  const handleSignOut = async () => {
    try {
      setIsDropdownOpen(false);

      await authClient.signOut();

      toast.success("সফলভাবে সাইন আউট করা হয়েছে");

      router.push("/signin");
      router.refresh();
    } catch {
      toast.error("সাইন আউট করতে সমস্যা হয়েছে");
    }
  };

  const user = session?.user;

  const userInitial = (
    user?.name || user?.email || "U"
  )
    .trim()
    .charAt(0)
    .toUpperCase();

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-3 py-2.5 sm:gap-4 sm:px-4 sm:py-3">

        {/* Logo + Title + Date */}
        <div className="flex min-w-0 items-center gap-2 sm:gap-3">
          <Link
            href="/"
            aria-label="বাজার দর"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#1f7a4d] text-xl text-white shadow-xs sm:h-12 sm:w-12 sm:rounded-2xl sm:text-2xl"
          >
            🛒
          </Link>

          <div className="min-w-0">
  <Link
    href="/"
    className="block truncate text-lg font-black leading-snug text-gray-900 transition-colors hover:text-[#1f7a4d] sm:text-xl lg:text-2xl"
  >
    বাজার দর
  </Link>

  <p className="mt-0.5 max-w-[140px] truncate text-[10px] font-medium leading-4 text-gray-500 sm:max-w-none sm:text-[13px] sm:leading-5">
    {date || "তারিখ লোড হচ্ছে..."}
  </p>
</div>
        </div>

        {/* Right Side: Auth Buttons / Profile Dropdown */}
        <div className="flex shrink-0 items-center gap-1.5 text-[13px] sm:gap-2 sm:text-[14px]">

          {isPending ? (
            <div className="flex items-center gap-2">
              <div className="h-9 w-20 animate-pulse rounded-lg bg-gray-100" />
            </div>
          ) : user ? (

            /* User Profile Dropdown */
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() =>
                  setIsDropdownOpen((prev) => !prev)
                }
                aria-expanded={isDropdownOpen}
                aria-label="প্রোফাইল মেনু"
                className="flex cursor-pointer items-center gap-1.5 rounded-lg border border-[#d3ddd0] bg-[#fafcf9] px-2 py-1 text-[13px] font-semibold text-[#17301f] transition hover:bg-[#f0f4ee] focus:outline-none focus:ring-2 focus:ring-[#1f7a4d]/20 sm:gap-2.5 sm:rounded-xl sm:px-3 sm:py-1.5 sm:text-sm"
              >
                {user.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={user.image}
                    alt={user.name || "প্রোফাইল"}
                    className="h-7 w-7 rounded-lg border border-[#d3ddd0] object-cover"
                  />
                ) : (
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#1f7a4d] text-xs font-bold text-white">
                    {userInitial}
                  </div>
                )}

                <span className="max-w-[70px] truncate font-semibold sm:max-w-[120px] lg:max-w-[150px]">
                  {user.name || "ব্যবহারকারী"}
                </span>

                <ChevronDown
                  className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="animate-in fade-in slide-in-from-top-2 absolute right-0 z-50 mt-2 w-56 rounded-2xl border border-[#e3eae0] bg-white p-2 shadow-lg duration-150 sm:w-64">

                  {/* User Details */}
                  <div className="mb-1 flex items-center gap-3 rounded-xl bg-[#f0f4ee] p-3">
                    {user.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={user.image}
                        alt={user.name || "প্রোফাইল"}
                        className="h-10 w-10 rounded-xl border border-[#d3ddd0] object-cover"
                      />
                    ) : (
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#1f7a4d] text-base font-bold text-white">
                        {userInitial}
                      </div>
                    )}

                    <div className="min-w-0">
                      <p className="truncate text-sm font-bold text-[#17301f]">
                        {user.name || "ব্যবহারকারী"}
                      </p>

                      <p className="truncate text-xs text-[#4a5f50]">
                        {user.email}
                      </p>
                    </div>
                  </div>

                  <div className="my-1 h-px bg-[#e3eae0]" />

                  {/* My Profile */}
                  <Link
                    href="/profile"
                    onClick={() => setIsDropdownOpen(false)}
                    className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium text-[#17301f] transition hover:bg-[#f0f4ee]"
                  >
                    <User className="h-4 w-4 text-[#1f7a4d]" />
                    <span>আমার প্রোফাইল</span>
                  </Link>

                  <div className="my-1 h-px bg-[#e3eae0]" />

                  {/* Sign Out */}
                  <button
                    type="button"
                    onClick={handleSignOut}
                    className="flex w-full cursor-pointer items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium text-[#c0392b] transition hover:bg-[#fdf2f2]"
                  >
                    <LogOut className="h-4 w-4 text-[#c0392b]" />
                    <span>সাইন আউট</span>
                  </button>
                </div>
              )}
            </div>
          ) : (

            /* Logged Out State */
            <div className="flex items-center gap-2">
              <Link
                href="/signin"
                className="rounded-lg px-2.5 py-1.5 text-[13px] font-semibold text-gray-700 transition hover:bg-gray-100 sm:rounded-xl sm:px-3.5 sm:py-2 sm:text-sm"
              >
                সাইন ইন
              </Link>

              <Link
                href="/signup"
                className="rounded-lg bg-[#1f7a4d] px-3 py-1.5 text-[13px] font-semibold text-white shadow-2xs transition hover:bg-[#186340] sm:rounded-xl sm:px-4 sm:py-2 sm:text-sm"
              >
                সাইন আপ
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
