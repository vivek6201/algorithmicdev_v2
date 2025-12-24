import { lazyLoad } from "@/lib/lazy";

const HeroSection = lazyLoad(() => import("@/components/pages/essential/home/hero-section"));
const FeaturesSection = lazyLoad(() => import("@/components/pages/essential/home/features-section"));
const FaqSection = lazyLoad(() => import("@/components/pages/essential/home/faq-section"));

export default function page() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <FaqSection />
    </>
  )
}
