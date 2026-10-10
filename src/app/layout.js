import { Hind_Siliguri } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import PriceTicker from "@/components/PriceTicker";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";

const hind = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-hind",
});

export const metadata = {
  title: "বাজার দর - আজকের বাজার দর এক নজরে",
  description: "নিত্যপ্রয়োজনীয় চাল, ডাল, তেল, সবজি, মাছ, মাংস ও মসলার দৈনন্দিন বাজারদর, বিভাগীয় পার্থক্য এবং মূল্য পরিবর্তনের সঠিক তথ্য।",
  keywords: ["বাজার দর", "BazarDor", "নিত্যপণ্য", "কাঁচাবাজার", "দৈনিক বাজারদর", "বাংলাদেশ"],
  authors: [{ name: "BazarDor Team" }],
};

export default function RootLayout({ children }) {
  return (
    <html lang="bn" className={hind.variable} data-theme="light">
      <body className={`${hind.className} min-h-screen flex flex-col bg-white text-gray-900 antialiased selection:bg-emerald-100 selection:text-emerald-900`}>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3500,
            style: {
              background: "#1f2937",
              color: "#f9fafb",
              fontSize: "14px",
              borderRadius: "12px",
              padding: "12px 16px",
              boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
            },
            success: {
              iconTheme: {
                primary: "#10b981",
                secondary: "#ffffff",
              },
              style: {
                background: "#064e3b",
                color: "#ffffff",
                border: "1px solid #059669",
              },
            },
            error: {
              iconTheme: {
                primary: "#ef4444",
                secondary: "#ffffff",
              },
              style: {
                background: "#7f1d1d",
                color: "#ffffff",
                border: "1px solid #dc2626",
              },
            },
          }}
        />

        <Header />
        <Navbar />
        <PriceTicker />

        <div className="flex-1">
          {children}
        </div>

        <Footer />
      </body>
    </html>
  );
}