import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/layout/landing/Hero";
import { Features } from "@/components/layout/landing/Features";
import { Steps } from "@/components/layout/landing/Steps";
import { CTA } from "@/components/layout/landing/CTA";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <Hero />
      <Features />
      <Steps />
      <CTA />
      <Footer />
    </main>
  );
}
