"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { toBnDate } from "@/lib/utils";
import { User, LogOut, ChevronDown } from "lucide-react";

const Header = () => {
  const router = useRouter();
  const [date, setDate] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    setDate(toBnDate());
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
  const userInitial = (user?.name || user?.email || "U").trim().charAt(0).toUpperCase();

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Logo + Title + Date */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            aria-label="বাজার দর"
            className="flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-2xl bg-[#1f7a4d] text-2xl sm:text-3xl text-white shadow-xs"
          >
            🛒
          </Link>

          <div>
            <Link href="/" className="text-xl sm:text-2xl font-black text-gray-900 hover:text-[#1f7a4d] transition-colors">
              বাজার দর
            </Link>

            <p className="text-xs text-gray-500 font-medium">
              {date}
            </p>
          </div>
        </div>

        {/* Right Side: Auth Buttons / Profile Dropdown */}
        <div className="flex items-center gap-2 sm:gap-3 text-[14px]">
          {isPending ? (
            <div className="flex items-center gap-2">
              <div className="h-9 w-20 animate-pulse rounded-lg bg-gray-100"></div>
            </div>
          ) : user ? (
            /* User Profile Dropdown */
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setIsDropdownOpen((prev) => !prev)}
                className="flex items-center gap-2.5 rounded-xl border border-[#d3ddd0] bg-[#fafcf9] px-3 py-1.5 text-sm font-semibold text-[#17301f] transition hover:bg-[#f0f4ee] focus:outline-none focus:ring-2 focus:ring-[#1f7a4d]/20 cursor-pointer"
              >
                {user.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={user.image}
                    alt={user.name || "প্রোফাইল"}
                    className="h-7 w-7 rounded-lg object-cover border border-[#d3ddd0]"
                  />
                ) : (
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#1f7a4d] text-xs font-bold text-white">
                    {userInitial}
                  </div>
                )}
                <span className="max-w-[120px] sm:max-w-[150px] truncate font-semibold">
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
                <div className="absolute right-0 mt-2 w-64 rounded-2xl border border-[#e3eae0] bg-white p-2 shadow-lg z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  {/* User details header */}
                  <div className="flex items-center gap-3 rounded-xl bg-[#f0f4ee] p-3 mb-1">
                    {user.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={user.image}
                        alt={user.name || "প্রোফাইল"}
                        className="h-10 w-10 rounded-xl object-cover border border-[#d3ddd0]"
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

                  <div className="h-px bg-[#e3eae0] my-1" />

                  {/* My Profile Link */}
                  <Link
                    href="/profile"
                    onClick={() => setIsDropdownOpen(false)}
                    className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium text-[#17301f] transition hover:bg-[#f0f4ee]"
                  >
                    <User className="h-4 w-4 text-[#1f7a4d]" />
                    <span>আমার প্রোফাইল</span>
                  </Link>

                  <div className="h-px bg-[#e3eae0] my-1" />

                  {/* Sign Out Button */}
                  <button
                    type="button"
                    onClick={handleSignOut}
                    className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium text-[#c0392b] transition hover:bg-[#fdf2f2] cursor-pointer"
                  >
                    <LogOut className="h-4 w-4 text-[#c0392b]" />
                    <span>সাইন আউট</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Logged out state */
            <div className="flex items-center gap-2">
              <Link
                href="/signin"
                className="rounded-xl px-3.5 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-100"
              >
                সাইন ইন
              </Link>

              <Link
                href="/signup"
                className="rounded-xl bg-[#1f7a4d] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#186340] shadow-2xs"
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