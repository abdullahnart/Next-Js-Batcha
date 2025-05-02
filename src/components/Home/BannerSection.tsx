"use client";

import React, { useRef , useState, useEffect } from "react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { useDeviceType } from "@/hooks/useDeviceType";
import Container from "@/components/common/Container";
import RightGradShape from "@/components/common/RightGradShape";

// Register plugin once for SSR compatibility
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type HeaderRefType = {
  header: HTMLDivElement;
  logo: HTMLDivElement;
  text: HTMLDivElement;
  ctaText: HTMLDivElement;
};

interface BannerSectionProps {
  headerRef: React.RefObject<HeaderRefType | null>;
}

interface HeroSection {
  banner_heading?: string;
  banner_content?: string;
  content?: string;
  banner_left_image?: string;
  banner_center_image?: string;
  banner_right_image?: string;
  back_it_image?: string;
  timer_image?: string;
  small_image?: string;
  mobile_banner?: string;
}

interface PageData {
  hero_section?: HeroSection;
  // Add other sections if needed
}

export default function BannerSection({ headerRef }: BannerSectionProps) {
  const containerRef = useRef(null);
  const imagesWrapperRef = useRef(null);
  const imageCenterRef = useRef(null);
  const imageLeftRef = useRef(null);
  const imageRightRef = useRef(null);
  const contentRef = useRef(null);
  const timeLeftRef = useRef(null);
  const messageRef = useRef(null);
  const backItRef = useRef(null);
  const trophyRef = useRef(null);
  const ellipseRef = useRef(null);
  const leftGradientRef = useRef(null);
  const rightGradientRef = useRef(null);
  const [data, setData] = useState<PageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://batchatv.clickysoft.us/wp-json/wp/v1/page');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result: PageData = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  // Use device type hook with mobile range 320–1199px
  const { isMobile, isDesktop } = useDeviceType({
    mobileMin: 320,
    mobileMax: 1199,
  });


  useGSAP(() => {
    // Only run animations on desktop (≥1200px)
    if (!isDesktop || !containerRef.current || !headerRef.current) return;

    const imagesWrapper = imagesWrapperRef.current;
    const imageCenter = imageCenterRef.current;
    const imageLeft = imageLeftRef.current;
    const imageRight = imageRightRef.current;
    const content = contentRef.current;
    const timeLeft = timeLeftRef.current;
    const messageIcon = messageRef.current;
    const backItIcon = backItRef.current;
    const trophyIcon = trophyRef.current;
    const ellipseIcon = ellipseRef.current;
    const leftGradient = leftGradientRef.current;
    const rightGradient = rightGradientRef.current;
    const header = headerRef.current.header;
    const headerLogo = headerRef.current.logo;
    const headerText = headerRef.current.text;
    const ctaText = headerRef.current.ctaText;

    if (!header || !headerLogo || !headerText || !ctaText) return;

    const mm = gsap.matchMedia();

    // Match media for min-width: 1200px
    mm.add("(min-width: 1200px)", () => {
      // Apply initial styles
      gsap.set(imagesWrapper, { y: 1000, opacity: 0 });
      gsap.set(imageCenter, { opacity: 0, scale: 0.9, zIndex: 3 });
      gsap.set(imageLeft, {
        opacity: 0,
        x: -20,
        scale: 0.8,
        zIndex: 2,
        rotation: 0,
      });
      gsap.set(imageRight, {
        opacity: 0,
        x: 20,
        scale: 0.8,
        zIndex: 2,
        rotation: 0,
      });
      gsap.set(content, { opacity: 0, y: 1000 });
      gsap.set(timeLeft, { opacity: 0, scale: 0.8 });
      gsap.set(messageIcon, { opacity: 0, scale: 0.8 });
      gsap.set(backItIcon, { opacity: 0, scale: 0.8 });
      gsap.set(trophyIcon, { opacity: 0, scale: 0.8 });
      gsap.set(ellipseIcon, { opacity: 0, scale: 0.8 });
      gsap.set(leftGradient, { x: 0, y: 0, opacity: 1, scale: 1 });
      gsap.set(rightGradient, { x: 0, y: 0, opacity: 1, scale: 1 });

      // Main timeline for scroll animations
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=300%",
          scrub: 3,
          pin: true,
          pinSpacing: true,
          invalidateOnRefresh: true,
          markers: false,
        },
      });

      // Add animations to timeline
      tl.to(
        headerLogo,
        { opacity: 1, y: 0, x: 0, scale: 1, duration: 4, ease: "power2.inOut" },
        0
      )
        .to(
          headerText,
          { opacity: 1, x: 0, duration: 6, ease: "power4.out" },
          4
        )
        .to(ctaText, { opacity: 1, y: 0, duration: 6, ease: "power4.out" }, 5)
        .fromTo(
          imagesWrapper,
          { y: 1000, opacity: 0 },
          { y: 0, opacity: 1, duration: 5, ease: "power4.out" },
          2
        )
        .fromTo(
          imageCenter,
          { opacity: 0, scale: 0.9 },
          { opacity: 1, scale: 1, duration: 6, ease: "power4.out" },
          2.5
        )
        .fromTo(
          imageLeft,
          { opacity: 0, x: -20, scale: 0.8, rotation: 0 },
          {
            opacity: 1,
            x: -180,
            scale: 1,
            rotation: -7,
            duration: 6,
            ease: "power4.out",
          },
          3
        )
        .fromTo(
          imageRight,
          { opacity: 0, x: 20, scale: 0.8, rotation: 0 },
          {
            opacity: 1,
            x: 180,
            scale: 1,
            rotation: 9,
            duration: 6,
            ease: "power4.out",
          },
          3
        )
        .fromTo(
          content,
          { opacity: 0, y: 1000 },
          { opacity: 1, y: 0, duration: 6, ease: "power4.out" },
          4
        )
        .fromTo(
          timeLeft,
          { opacity: 0, scale: 0.8 },
          { opacity: 1, scale: 1, duration: 6, ease: "power4.out" },
          5
        )
        .fromTo(
          messageIcon,
          { opacity: 0, scale: 0.8 },
          { opacity: 1, scale: 1, duration: 6, ease: "power4.out" },
          5
        )
        .fromTo(
          backItIcon,
          { opacity: 0, scale: 0.8 },
          { opacity: 1, scale: 1, duration: 6, ease: "power4.out" },
          5
        )
        .fromTo(
          trophyIcon,
          { opacity: 0, scale: 0.8 },
          { opacity: 1, scale: 1, duration: 6, ease: "power4.out" },
          5
        )
        .fromTo(
          ellipseIcon,
          { opacity: 0, scale: 0.8 },
          { opacity: 1, scale: 1, duration: 6, ease: "power4.out" },
          5
        )
        .to(
          leftGradient,
          {
            x: "80vw",
            y: "60vh",
            opacity: 1,
            scale: 1.2,
            duration: 15,
            ease: "power1.inOut",
          },
          0.5
        )
        .to(
          rightGradient,
          {
            x: "-80vw",
            y: "-60vh",
            opacity: 1,
            scale: 1.2,
            duration: 15,
            ease: "power1.inOut",
          },
          0.5
        );

      // Cleanup on unmount
      return () => {
        tl.kill();
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    });

    // Cleanup matchMedia on unmount
    return () => {
      mm.revert();
    };
  }, [isDesktop, headerRef]);

  if (isMobile) {
    return (
      <section className="bg-[#0B151F] pt-[120px] pb-[60px]  overflow-hidden ">
        <RightGradShape className=" h-[457px]  !top-[162px] inset-0  w-full " />
        <Container>
          <div className="w-full flex flex-col items-center justify-center relative z-20">
            <div className="">
              {data?.hero_section?.banner_heading && (
              <h2 className="text-center text-[34px] text-white font-[NeueHaasDisplayRoman]">
                {data.hero_section.banner_heading}
              </h2>
            )}
                        {data?.hero_section?.banner_content && (
              <p className="text-center text-[16px] mt-4 text-white font-[NeueHaasDisplayRoman]">
                {data.hero_section.banner_content}
              </p>
            ) }
            </div>
            <div className="mt-6">
              <Image
                src={data?.hero_section?.mobile_banner ?? '/default.jpg'}
                alt=""
                width={600}
                height={467}
                className="w-full"
              />
            </div>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section
      ref={containerRef}
      className="bg-[#0B151F] relative h-[100svh] flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Left gradient blob */}
      <div
        ref={leftGradientRef}
        className="w-[412px] h-[392px] rounded-full bg-[linear-gradient(334.27deg,_#3E81FC_-4.61%,_#705DF2_112.9%)] absolute left-0 top-[10px] blur-[300px]"
      ></div>

      {/* Right gradient blob */}
      <div
        ref={rightGradientRef}
        className="bg-[linear-gradient(334.27deg,_#FC3E70_-4.61%,_#705DF2_112.9%)] absolute right-0 bottom-[10px] blur-[300px] w-[468px] h-[446px]"
      ></div>

      <div className="flex w-full justify-center">
        <div className="w-10/12  min-[1524px]:max-[1600px]:pt-[60px]">
          <div
            ref={imagesWrapperRef}
            className="relative w-full flex items-center justify-center"
          >

            <Image
              ref={imageCenterRef}
              src={data?.hero_section?.banner_center_image ?? '/default.jpg'}
              alt="center"
              className="z-20 opacity-0 rounded-[40px]"
              width={260}
              height={467}
              priority
              unoptimized
            />
            <Image
              ref={imageLeftRef}
              src={data?.hero_section?.banner_left_image ?? '/default.jpg'}
              alt="left"
              className="absolute top-[60%]  transform -translate-y-1/2 opacity-0 z-10 rounded-[40px]"
              width={190}
              height={340}
              priority
              unoptimized
            />
            <Image
              ref={imageRightRef}
              src={data?.hero_section?.banner_right_image ?? '/default.jpg'}
              alt="right"
              className="absolute top-[60%] transform -translate-y-1/2 opacity-0 z-10 rounded-[40px]"
              width={190}
              height={340}
              priority
              unoptimized
            />
            <Image
              ref={timeLeftRef}
              src={data?.hero_section?.timer_image ?? '/default.jpg'}
              alt="time"
              className="min-[1600px]:max-[1800px]:left-[27%] min-[1480px]:max-[1600px]:left-[26%] min-[1366px]:max-[1480px]:left-[23%] min-[1200px]:max-[1331px]:left-[19%] absolute left-[30%] top-[76%] transform -translate-y-1/2 opacity-0 z-10"
              width={300}
              height={100}
              priority
              unoptimized
            />
            <Image
              ref={messageRef}
              src="/assets/images/message-icon.svg"
              alt="message"
              className="min-[1600px]:max-[1800px]:left-[25%] min-[1480px]:max-[1600px]:left-[23%] min-[1366px]:max-[1480px]:left-[20%] min-[1200px]:max-[1331px]:left-[15%] absolute left-[28%] top-[57%] transform -translate-y-1/2 opacity-0 z-10"
              width={53}
              height={53}
              priority
              unoptimized
            />
            <Image
              ref={backItRef}
              src={data?.hero_section?.back_it_image ?? '/default.jpg'}
              alt="back-it"
              className="min-[1600px]:max-[1800px]:left-[34%]  min-[1480px]:max-[1600]:left-[calc(100%-66%)] min-[1366px]:max-[1480px]:left-[32%]  min-[1200px]:max-[1331px]:left-[29%] absolute left-[39%] top-[20%] transform -translate-y-1/2 opacity-0 z-10"
              width={140}
              height={40}
              priority
              unoptimized
            />
            <Image
              ref={trophyRef}
              src="/assets/images/trophy.svg"
              alt="trophy"
              className="min-[1600px]:max-[1800px]:right-[26%] min-[1480px]:max-[1600px]:right-[24%] min-[1366px]:max-[1480px]:right-[20%] min-[1200px]:max-[1331px]:right-[17%] absolute right-[30%] top-[38%] transform -translate-y-1/2 opacity-0 z-10"
              width={88}
              height={53}
              priority
              unoptimized
            />
            <Image
              ref={ellipseRef}
              src={data?.hero_section?.small_image ?? '/default.jpg'}
              alt="ellipse"
              className="min-[1600px]:max-[1800px]:right-[29%] min-[1366px]:max-[1480px]:right-[25%]  min-[1480px]:max-[1600px]:right-[26%] absolute min-[1200px]:max-[1331px]:right-[20%] right-[31%] top-[66%] transform -translate-y-1/2 opacity-0 z-10"
              width={62}
              height={62}
              priority
              unoptimized
            />
          </div>
          <div ref={contentRef} className="mt-10 text-center px-4 opacity-0">
            {data?.hero_section?.banner_heading && (
              <h2 className="text-[40px] text-white font-[NeueHaasDisplayRoman]">
                {data.hero_section.banner_heading}
              </h2>
            )}
            
            {data?.hero_section?.banner_content && (
              <p className="mt-4 text-gray-300 font-[NeueHaasDisplayRoman]">
                {data.hero_section.banner_content}
              </p>
            ) }
          </div>
        </div>
      </div>
    </section>
  );
}
