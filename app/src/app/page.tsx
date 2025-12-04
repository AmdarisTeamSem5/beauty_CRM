
import { Hero } from "@/components/layout/landing/Hero";
import { Features } from "@/components/layout/landing/Features";
import { Steps } from "@/components/layout/landing/Steps";
import { CTA } from "@/components/layout/landing/CTA";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Hero />
      <Features />
      <Steps />
      <CTA />
    </main>
  );
}