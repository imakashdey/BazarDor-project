import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import PriceTicker from "../components/PriceTicker";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <main>
      <Header />
      <Navbar />
       <PriceTicker />
       <Hero/>
    </main>
  );
}