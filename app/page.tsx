"use client";

import ArticleSection from "@/components/ArticleSection";
import BlogSection from "@/components/BlogSection";
import FeaturesSection from "@/components/FeatureSection";
import HeroSection from "@/components/HeroSection";
import LogoPartnerSection from "@/components/LogoPartnerSection";
import PortfolioSection from "@/components/PortfolioSection";
import TestimonialSection from "@/components/TestimonialSection";

export default function HomePage() {
  return (
    <div>
      <HeroSection />

      <ArticleSection />

      <PortfolioSection />

      <BlogSection />

      <FeaturesSection />

      <TestimonialSection />

      <LogoPartnerSection />
    </div>
  );
}
