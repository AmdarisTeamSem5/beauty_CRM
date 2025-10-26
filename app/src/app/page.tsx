import { Hero } from "@/components/layout/landing/hero";
import { Features } from "@/components/layout/landing/features";
import { Steps } from "@/components/layout/landing/steps";
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
