import { Hind_Siliguri } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import PriceTicker from "@/components/PriceTicker";
import Footer from "@/components/Footer";


const hind = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export default function RootLayout({ children }) {
  return (
    <html lang="bn" data-theme="light">

      <body className={`${hind.className} min-h-full flex flex-col`}>
        <Header />
      <Navbar />
      <PriceTicker />
      
      
        {children}
      </body>
      <Footer/>
    </html>
  );
}