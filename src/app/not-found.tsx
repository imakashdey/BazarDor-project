import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <h1 className="text-6xl font-bold text-red-600">404</h1>

      <h2 className="mt-4 text-2xl font-semibold">
        পেজটি খুঁজে পাওয়া যায়নি
      </h2>

      <p className="mt-2 text-gray-600">
        আপনি যে পেজটি খুঁজছেন সেটি হয়তো সরিয়ে ফেলা হয়েছে অথবা ভুল URL।
      </p>

      <Link
        href="/"
        className="mt-6 rounded-md bg-red-600 px-6 py-3 text-white hover:bg-red-700"
      >
        হোম পেজে ফিরে যান
      </Link>
    </main>
  );
}