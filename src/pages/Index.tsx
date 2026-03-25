import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import Pricing from "@/components/landing/Pricing";
import Contact from "@/components/landing/Contact";

const Index = () => (
  <div className="min-h-screen">
    <Navbar />
    <Hero />
    <Features />
    <Pricing />
    <Contact />
    <footer className="py-8 text-center text-sm text-muted-foreground border-t">
      © 2026 BizPlan. All rights reserved.
    </footer>
  </div>
);

export default Index;
