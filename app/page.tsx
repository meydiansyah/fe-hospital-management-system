"use client";

import ArticleSection from "@/components/ArticleSection";
import BlogSection from "@/components/BlogSection";
import FeaturesSection from "@/components/FeatureSection";
import HeroSection from "@/components/HeroSection";
import LogoPartnerSection from "@/components/LogoPartnerSection";
import PortfolioSection from "@/components/PortfolioSection";
import TestimonialSection from "@/components/TestimonialSection";
import SearchSection from "@/components/SearchSection";
import SuperiorCoESection from "@/components/SuperiorCoE";
import DedicationStatsSection from "@/components/DedicationStatsSection";
import VisitHospitalSection from "@/components/VisitHospitalSection";
import PromotionSection from "@/components/PromotionSection";
import StorySection from "@/components/StorySection";
import StageSection from "@/components/StageSection";
import NewsUpdateSection from "@/components/NewsUpdateSection";
import FaqSection from "@/components/FaqSection";

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <SearchSection />
      <SuperiorCoESection />
      <DedicationStatsSection />
      <VisitHospitalSection />
      <PromotionSection />
      <StorySection />
      <StageSection />
      <NewsUpdateSection />

      <ArticleSection />

      {/* <PortfolioSection /> */}

      {/* <BlogSection /> */}

      {/* <FeaturesSection /> */}

      {/* <TestimonialSection /> */}

      <FaqSection />

      {/* <LogoPartnerSection /> */}
    </div>
  );
}
