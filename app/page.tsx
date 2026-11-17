import * as React from "react";
import { Navbar } from "@/components/features/navbar/navbar";
import { Hero } from "@/components/features/hero/hero";
import { TechMarquee } from "@/components/features/marquee/tech-marquee";
import { LetsBuild } from "@/components/features/value-prop/lets-build";
import { BusinessOutcomes } from "@/components/features/value-prop/business-outcomes";
import { ImpactStats } from "@/components/features/showcase/impact-stats";
import { OurWorks } from "@/components/features/showcase/our-works";
import { ProcessPipeline } from "@/components/features/services/process-pipeline";
import { ServicesBanner } from "@/components/features/services/services-banner";
import { PricingSection } from "@/components/features/pricing/pricing-section";
import { OurApproach } from "@/components/features/approach/our-approach";
import { TestimonialsSection } from "@/components/features/testimonials/testimonials-section";
import { ConversionCTA } from "@/components/features/cta/conversion-cta";
import { FAQSection } from "@/components/features/faq/faq-section";
import { Footer } from "@/components/features/footer/footer";

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-bg-canvas text-text-secondary selection:bg-accent selection:text-black">
      {/* 1. Header / Sticky Navbar */}
      <Navbar />

      {/* Main Content Flow */}
      <main>
        {/* 2. Band 1: Hero */}
        <Hero />

        {/* 3. Band 2: Manifesto / Let's build */}
        <LetsBuild />

        {/* 4. Band 3: Social Proof / Tech Marquee */}
        <TechMarquee />

        {/* 5. Band 4: What we help businesses achieve */}
        <BusinessOutcomes />

        {/* 6. Band 5: Launch faster, Operate smarter (Impact & Stats) */}
        <ImpactStats />

        {/* 7. Band 6: Our Works (Portfolio & Case Studies) */}
        <OurWorks />

        {/* 8. Band 7: From first idea to systems that run (Process Pipeline) */}
        <ProcessPipeline />

        {/* 9. Band 8: Services marquee banner */}
        <ServicesBanner />

        {/* 10. Band 9: Transparent Pricing Tiers */}
        <PricingSection />

        {/* 11. Band 10: Our Approach */}
        <OurApproach />

        {/* 12. Band 11: Testimonials */}
        <TestimonialsSection />

        {/* 13. Band 12: Conversion CTA Banner */}
        <ConversionCTA />

        {/* 14. Band 13: Frequently Asked Questions */}
        <FAQSection />
      </main>

      {/* 15. Band 14: Comprehensive Footer */}
      <Footer />
    </div>
  );
}

