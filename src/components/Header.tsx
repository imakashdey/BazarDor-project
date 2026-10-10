"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { toBnDate } from "@/lib/utils";
import { LogIn, UserPlus, User, LogOut } from "lucide-react";

const Header = () => {
  const router = useRouter();
  const [date, setDate] = useState("");
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    setDate(toBnDate());
  }, []);

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

  const user = session?.user;
  const userInitial = (user?.name || user?.email || "U").trim().charAt(0).toUpperCase();

  return (
    <header className="sticky top-0 z-40 border-b border-emerald-100 bg-white/95 backdrop-blur-md shadow-xs">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Logo + Title + Date */}
        <Link
          href="/"
          className="group flex items-center gap-3 transition-transform hover:scale-[1.01]"
          aria-label="বাজার দর হোমপেজ"
        >
          <div className="flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-600 to-green-700 text-2xl sm:text-3xl shadow-sm text-white transition-all group-hover:shadow-md group-hover:from-emerald-700 group-hover:to-green-800">
            🛒
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl sm:text-2xl font-black tracking-tight text-gray-900 group-hover:text-emerald-800 transition-colors">
                বাজার দর
              </span>
              <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
                লাইভ
              </span>
            </div>
            <p className="text-xs font-medium text-gray-500">
              {date || "আজকের তাজা দর"}
            </p>
          </div>
        </Link>

        {/* Right Side: Auth Buttons / Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          {isPending ? (
            <div className="flex items-center gap-2">
              <div className="h-9 w-20 animate-pulse rounded-lg bg-gray-100"></div>
              <div className="h-9 w-20 animate-pulse rounded-lg bg-gray-100"></div>
            </div>
          ) : user ? (
            <div className="flex items-center gap-2 sm:gap-3">
              <Link
                href="/profile"
                className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50/70 px-3 py-1.5 text-xs sm:text-sm font-semibold text-emerald-900 transition hover:bg-emerald-100/80"
              >
                {user.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={user.image}
                    alt={user.name || "User"}
                    className="h-6 w-6 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-700 text-xs font-bold text-white">
                    {userInitial}
                  </div>
                )}
                <span className="hidden sm:inline-block max-w-[120px] truncate font-medium">
                  {user.name || "প্রোফাইল"}
                </span>
              </Link>

              <button
                type="button"
                onClick={handleSignOut}
                className="flex items-center gap-1.5 rounded-xl border border-red-200 bg-red-50/60 px-3 py-1.5 text-xs sm:text-sm font-medium text-red-700 transition hover:bg-red-100"
                title="সাইন আউট"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline-block">সাইন আউট</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/signin"
                className="flex items-center gap-1.5 rounded-xl border border-gray-200 bg-white px-3.5 py-2 text-xs sm:text-sm font-semibold text-gray-700 transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-800"
              >
                <LogIn className="h-4 w-4 text-gray-500" />
                <span>সাইন ইন</span>
              </Link>

              <Link
                href="/signup"
                className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-green-700 px-4 py-2 text-xs sm:text-sm font-semibold text-white shadow-xs transition hover:from-emerald-700 hover:to-green-800 hover:shadow-sm"
              >
                <UserPlus className="h-4 w-4" />
                <span>সাইন আপ</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;