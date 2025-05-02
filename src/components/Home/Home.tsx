"use client";

import React, { useRef, useState, useEffect } from "react";
import Header from "@/components/common/Header";
import BannerSection from "@/components/Home/BannerSection";
import HowItWorksSection from "./HowItWorksSection";
import BeyondSection from "@/components/Home/BeyondSection";
import WhyAwesomeSection from "@/components/Home/WhyAwesomeSection";
import VideoSection from "@/components/Home/VideoSection";
import FaqSection from "@/components/Home/FaqSection";
import Footer from "@/components/common/Footer";
import { useDeviceType } from "@/hooks/useDeviceType";
import MobileHowItWorksSection from "@/components/Home/MobileHowItWorksSection";
import MobileBeyondSection from "@/components/Home/MobileBeyondSection";

export default function Home() {
  const headerRef = useRef<{
    header: HTMLDivElement;
    logo: HTMLDivElement;
    text: HTMLDivElement;
    ctaText: HTMLDivElement;
  } | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const { isMobile } = useDeviceType({ mobileMin: 320, mobileMax: 1199 });

  useEffect(() => {
      setIsLoading(false);   
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center bg-[linear-gradient(360deg,_#261B3C_27.44%,_#170C2C_80.65%)] min-h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#3e81fc] "></div>
        </div>
      ) : (
        <>
          <Header ref={headerRef} />
          <BannerSection headerRef={headerRef} />
          {isMobile ? <MobileHowItWorksSection /> : <HowItWorksSection />}
          {isMobile ? <MobileBeyondSection /> : <BeyondSection />}
          <WhyAwesomeSection />
          <VideoSection />
          <FaqSection />
          <Footer />
        </>
      )}
    </>
  );
}