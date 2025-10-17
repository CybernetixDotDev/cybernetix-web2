import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import Hero from "@/components/Hero";
import Values from "@/components/Values";
import Tech from "@/components/Tech";
import CallToAction from "@/components/CallToAction";

export default function Page() {
  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      <Hero />
      <Values />
      <Tech />
      <CallToAction />
      <Footer />
    </main>
  );
}