"use client";

import React, { useState, useMemo } from "react";
import Slider from "react-slick";
import LeftGradShape from "../common/LeftGradShape";

import Image from "next/image";
import Container from "@/components/common/Container";
import FundProgress from "@/components/Home/FundProgress";
import { FaAngleUp } from "react-icons/fa";
import GetPaidTabs from "@/components/Home/GetPaidTabs";
import Link from "next/link";

interface ViewItem {
  text: string;
  arrow?: string; 
}

interface Banner {
  src: string;
  width: number;
  height: number;
}

interface Views {
  creators: ViewItem[];
  backers: ViewItem[];
}

interface Banners {
  creators: Banner;
  backers: Banner;
}

const views: Views = {
  creators: [
    { text: "Create Trailer", arrow: "/assets/images/blue-arrow.svg" },
    { text: "Raise funds", arrow: "/assets/images/red-arrow.svg" },
    { text: "Upload Final video", arrow: "/assets/images/purple-arrow.svg" },
    { text: "Voting Results", arrow: "/assets/images/green-arrow.svg" },
    { text: "Get Paid" },
  ],
  backers: [
    { text: "Explore Trailers", arrow: "/assets/images/blue-arrow.svg" },
    { text: "Back it", arrow: "/assets/images/red-arrow.svg" },
    { text: "Watch Final Video", arrow: "/assets/images/purple-arrow.svg" },
    { text: "Vote" },
  ],
};

const banners: Banners = {
  creators: {
    src: "/assets/images/creators-banner.png",
    width: 1019,
    height: 331,
  },
  backers: {
    src: "/assets/images/backers-banner.png",
    width: 1237,
    height: 370,
  },
};

interface ViewContentProps {
  view: keyof Views; // Restrict to "creators" or "backers"
}

const ViewContent: React.FC<ViewContentProps> = ({ view }) => (
  <div className="text-center">
    <ul className="flex items-center justify-center gap-y-0 gap-[5px] flex-wrap text-white font-medium">
      {views[view].map((item, index) => (
        <li
          key={index}
          className="flex items-center gap-[5px] font-[NeueHaasDisplayRoman] text-[26px] text-white"
        >
          {item.text}
          {item.arrow && (
            <Image src={item.arrow} alt="" unoptimized width={25} height={18} />
          )}
        </li>
      ))}
    </ul>
    <div className="py-[40px]">
      <Image
        src={banners[view].src}
        alt=""
        unoptimized
        width={banners[view].width}
        height={banners[view].height}
        className="w-full"
      />
    </div>
  </div>
);

const MobileHowItWorksSection: React.FC = () => {
  const [selectedView, setSelectedView] = useState<"creators" | "backers">(
    "creators"
  );

  const handleViewSelection = (view: "creators" | "backers") => {
    setSelectedView(view);
  };

  // Slider settings with accessibility and performance optimizations
  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,

    accessibility: true, 
    adaptiveHeight: true, // Adjust height based on content
    lazyLoad: "ondemand" as const, // Lazy-load slides for performance
    dotsClass: "slick-dots custom-dots", // Custom class for styling dots
  };

  const creatorSlides = useMemo(
    () => [
      <div key="creator-step-1" className="outline-none" tabIndex={-1}>
        <div className="flex gap-[30px] flex-col slide-card max-w-[600px] mx-auto">
          <div className="max-w-[500px] mx-auto">
            <div className="text-center">
              <h3 className="text-[#9662FD] font-[NeueHaasDisplayRoman] text-[30px] mb-[10px]">
                Share Your Idea
              </h3>
              <p className="text-white font-[NeueHaasDisplayRoman] text-[16px]">
                Create a compelling short trailer video. What will you do?
                What's your funding goal? Be bold, be clear!
              </p>
            </div>
          </div>
          <div className="w-full max-w-[492px] mx-auto">
            <div className="flex justify-center">
              <div className="relative w-[246px]">
                <Image
                  src="/assets/images/pink-circle.svg"
                  alt=""
                  unoptimized
                  width={228}
                  height={228}
                  className="absolute top-[30px] right-[-30px] -z-1"
                />
                <Image
                  src="/assets/images/purple-circle.svg"
                  alt=""
                  unoptimized
                  width={42}
                  height={42}
                  className="absolute top-[71%] right-[-17px] -z-1"
                />
                <Image
                  src="/assets/images/blue-circle.svg"
                  alt=""
                  unoptimized
                  width={98}
                  height={98}
                  className="absolute top-[50%] left-[-26px] -z-1"
                />
                <div className="h-[518px] w-full bg-white rounded-[16px] overflow-hidden relative">
                  <video
                    autoPlay={true}
                    playsInline
                    muted
                    loop
                    className="w-full h-full aspect-video object-contain"
                    src="/assets/images/create-trailer.webm"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>,
      <div key="creator-step-2" className="outline-none" tabIndex={-1}>
        <div className="flex gap-[50px] flex-col slide-card max-w-[600px] mx-auto">
          <div className="max-w-[500px] mx-auto">
            <div className="text-center">
              <h3 className="text-[#9662FD] font-[NeueHaasDisplayRoman] text-[30px] mb-[10px]">
                Get Funded
              </h3>
              <p className="text-white font-[NeueHaasDisplayRoman] text-[16px]">
                Share your trailer and watch the support roll in from backers
                who want to see your content come to life.
              </p>
            </div>
          </div>
          <div className="w-full max-w-[500px] mx-auto">
            <div className="relative ">
              <Image
                src="/assets/images/card-background.svg"
                alt=""
                unoptimized
                width={459}
                height={307}
                className="absolute left-0 w-[459px] h-[459px] top-[-140px] -z-1 "
              />

              <div className="shadow-[0px_0px_30px_0px_#6C22FF33] bg-[#0F172C] rounded-tl-[16px] rounded-tr-[16px] ">
                <div className="min-[320px]:max-[374px]:flex-wrap min-[320px]:max-[374px]:justify-center flex items-center gap-[8px] px-[10px] pt-[10px] pb-[20px]  ">
                  <button className="font-[NeueHaasDisplayRoman] border border-transparent flex justify-center items-center text-[13px] text-white bg-[#9562FD] rounded-[10px] w-[190px] h-[37px]">
                    Back it ( min $1)
                  </button>
                  <button className="font-[NeueHaasDisplayRoman] border border-[#314158] flex justify-center items-center text-[13px] text-white  rounded-[10px] w-[190px] h-[37px]">
                    Bakers
                  </button>
                  <button className="w-[37px] border border-[#314158] h-[37px] rounded-[10px] flex justify-center items-center text-white">
                    <FaAngleUp />
                  </button>
                </div>

                <FundProgress raised={0} goal={100} />
              </div>

              <div className="bg-[#0F172C] shadow-[0px_4px_10px_0px_#FFFFFF0D_inset] rounded-br-[16px] rounded-bl-[16px] p-2">
                <ul className="flex justify-center gap-[55px] min-[320px]:max-[529px]:gap-[20px]">
                  <li className="flex justify-center">
                    <Image
                      src="/assets/images/btm1.svg"
                      alt=""
                      unoptimized
                      width={33}
                      height={33}
                    />
                  </li>
                  <li className="flex justify-center">
                    <Image
                      src="/assets/images/btm2.svg"
                      alt=""
                      unoptimized
                      width={33}
                      height={33}
                    />
                  </li>
                  <li className="flex justify-center">
                    <Image
                      src="/assets/images/btm3.svg"
                      alt=""
                      unoptimized
                      width={49}
                      height={40.5}
                    />
                  </li>
                  <li className="flex justify-center">
                    <Image
                      src="/assets/images/btm4.svg"
                      alt=""
                      unoptimized
                      width={33}
                      height={33}
                    />
                  </li>
                  <li className="flex justify-center">
                    <Image
                      src="/assets/images/btm5.svg"
                      alt=""
                      unoptimized
                      width={33}
                      height={33}
                    />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>,

      <div key="creator-step-3" className="outline-none" tabIndex={-1}>
        <div className="flex gap-[30px] flex-col slide-card max-w-[600px] mx-auto">
          <div className="max-w-[500px] mx-auto">
            <div className="text-center">
              <h3 className="text-[#9662FD] font-[NeueHaasDisplayRoman] text-[30px] mb-[10px]">
                Deliver Your Promise
              </h3>
              <p className="text-white font-[NeueHaasDisplayRoman] text-[16px]">
                Once you are happy with the raised amount, it's time to shine!
                Create the final video showing you doing exactly what you
                promised in the trailer.
              </p>
            </div>
          </div>
          <div className="w-full max-w-[492px] mx-auto">
            <div className="flex justify-center">
              <div className="relative w-[246px]">
                <Image
                  src="/assets/images/pink-circle.svg"
                  alt=""
                  unoptimized
                  width={228}
                  height={228}
                  className="absolute top-[150px] left-[-30px] -z-1"
                />

                <Image
                  src="/assets/images/orange-circle.svg"
                  alt=""
                  unoptimized
                  width={42}
                  height={42}
                  className="absolute top-[80px] right-[-20px] -z-1"
                />
                <Image
                  src="/assets/images/blue-circle.svg"
                  alt=""
                  unoptimized
                  width={98}
                  height={98}
                  className="absolute bottom-[10px] right-[-30px] -z-1"
                />

                <div className=" h-[518px] w-full bg-white  rounded-[16px] overflow-hidden relative">
                  <video
                    autoPlay={true}
                    playsInline
                    muted
                    loop
                    preload="auto"
                    className="w-full h-full   aspect-video object-contain"
                    src="/assets/images/deliver-promise.webm"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>,

      <div key="creator-step-4" className="outline-none" tabIndex={-1}>
        <div className="flex gap-[30px] flex-col slide-card max-w-[600px] mx-auto">
          <div className="max-w-[500px] mx-auto">
            <div className="text-center">
              <h3 className="text-[#9662FD] font-[NeueHaasDisplayRoman] text-[30px] mb-[10px]">
                Backers Vote
              </h3>
              <p className="text-white font-[NeueHaasDisplayRoman] text-[16px]">
                Your backers watch the exclusive video and vote on whether you
                kept your promise. You can accept the results or appeal for a
                moderator review.
              </p>
            </div>
          </div>
          <div className="w-full max-w-[492px] mx-auto">
            <div className="flex justify-center">
              <div className="relative w-[246px]">
                <Image
                  src="/assets/images/pink-circle.svg"
                  alt=""
                  unoptimized
                  width={228}
                  height={228}
                  className="absolute bottom-0 left-[-6px] -z-1"
                />

                <Image
                  src="/assets/images/orange-circle.svg"
                  alt=""
                  unoptimized
                  width={42}
                  height={42}
                  className="absolute top-[190px] right-[-20px] -z-1"
                />
                <Image
                  src="/assets/images/blue-circle.svg"
                  alt=""
                  unoptimized
                  width={98}
                  height={98}
                  className="absolute top-[-30px] left-[-6px] -z-1"
                />

                <div className=" h-[518px] w-full bg-white  rounded-[16px] overflow-hidden relative">
                  <video
                    autoPlay={true}
                    playsInline
                    muted
                    loop
                    className="w-full h-full   aspect-video object-contain"
                    src="/assets/images/backers-vote.mp4"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>,
      <div key="creator-step-5" className="outline-none" tabIndex={-1}>
        <div className="flex gap-[30px] flex-col slide-card max-w-[600px] mx-auto">
          <div className="max-w-[500px] mx-auto">
            <div className="text-center">
              <h3 className="text-[#9662FD] font-[NeueHaasDisplayRoman] text-[30px] mb-[10px]">
                Get Paid
              </h3>
              <p className="text-white font-[NeueHaasDisplayRoman] text-[16px]">
                If the majority confirms you delivered, the funds are released
                to you! Build your reputation and earn directly from your most
                engaged fans.
              </p>
              <div className="mt-[30px]">
                <Link
                  href="#"
                  className="bg-[#9662FD] inline-flex justify-center rounded-[30px] text-[13px] px-[27px] py-[13px] font-[NeueHaasDisplayMedium] text-white "
                >
                  Register to create a trailer
                </Link>
              </div>
            </div>
          </div>
          <div className="w-full max-w-[492px] mx-auto">
            <div className="flex justify-center">
              <div className="relative w-full">
                <Image
                  src="/assets/images/pink-circle.svg"
                  alt=""
                  unoptimized

                  width={228}
                  height={228}
                  className="absolute bottom-[-50px] left-[30px] -z-1"
                />

                <Image
                  src="/assets/images/orange-circle.svg"
                  alt=""
                  unoptimized
                  width={42}
                  height={42}
                  className="absolute top-[140px] right-[-20px] -z-1"
                />
                <Image
                  src="/assets/images/blue-circle.svg"
                  alt=""
                  unoptimized
                  width={98}
                  height={98}
                  className="absolute top-[-50px] left-[42px] -z-1"
                />

                <div className="bg-[#0F172C] rounded-[30px] ">
                  <div className="border-b border-[#545B63] p-[20px] mb-[10px]">
                    <div className="flex items-center gap-[9px]">
                      <div className="">
                        <Image
                          src="/assets/images/wllet-ham.svg"
                          width={32}
                          height={33}
                          unoptimized
                          alt=""
                        />
                      </div>
                      <div>
                        <h6 className="text-white font-[NeueHaasDisplayMedium] text-[18px]">
                          Wallet
                        </h6>
                      </div>
                    </div>
                  </div>

                  <GetPaidTabs />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>,
    ],
    []
  );

  const backerSlides = useMemo(
    () => [
      <div key="backer-step-1" className="outline-none" tabIndex={-1}>
        <div className="flex gap-[30px] flex-col slide-card max-w-[600px] mx-auto">
          <div className="max-w-[500px] mx-auto">
            <div className="text-center">
              <h3 className="text-[#9662FD] font-[NeueHaasDisplayRoman] text-[30px] mb-[10px]">
                Browse Video Trailers
              </h3>
              <p className="text-white font-[NeueHaasDisplayRoman] text-[16px]">
                Scroll through endless potential. Preview unique video ideas
                creators want to make exclusively for their backers.
              </p>
            </div>
          </div>
          <div className="w-full max-w-[492px] mx-auto">
            <div className="flex justify-center">
              <div className="relative w-[246px]">
                <Image
                  src="/assets/images/pink-circle.svg"
                  alt=""
                  unoptimized
                  width={228}
                  height={228}
                  className="absolute top-[30px] right-[-30px] -z-1"
                />
                <Image
                  src="/assets/images/orange-circle.svg"
                  alt=""
                  unoptimized
                  width={42}
                  height={42}
                  className="absolute top-[30px] left-[-30px] -z-1"
                />

                <Image
                  src="/assets/images/purple-circle.svg"
                  alt=""
                  unoptimized
                  width={42}
                  height={42}
                  className="absolute top-[71%] right-[-10px] -z-1"
                />
                <Image
                  src="/assets/images/blue-circle.svg"
                  alt=""
                  unoptimized
                  width={98}
                  height={98}
                  className="absolute top-[50%] left-[-30px] -z-1"
                />

                <div className=" h-[518px] w-full bg-white  rounded-[16px] overflow-hidden relative">
                  <video
                    autoPlay={true}
                    playsInline
                    muted
                    loop
                    className="w-full h-full   aspect-video object-contain "
                    src="/assets/images/back-it.mp4"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>,
      <div key="backer-step-2" className="outline-none" tabIndex={-1}>
        <div className="flex gap-[30px] flex-col slide-card max-w-[600px] mx-auto">
          <div className="max-w-[500px] mx-auto">
            <div className="text-center">
              <h3 className="text-[#9662FD] font-[NeueHaasDisplayRoman] text-[30px] mb-[10px]">
                Make It Happen
              </h3>
              <p className="text-white font-[NeueHaasDisplayRoman] text-[16px]">
                Fund the projects that excite you. Set your contribution amount
                and help creators reach their goal to produce the final
                exclusive content.
              </p>
            </div>
          </div>
          <div className="w-full max-w-[492px] mx-auto">
            <div className="flex justify-center">
              <div className="relative w-[246px]">
                <Image
                  src="/assets/images/pink-circle.svg"
                  alt=""
                  unoptimized
                  width={228}
                  height={228}
                  className="absolute top-[30px] right-[-30px] -z-1"
                />
                <Image
                  src="/assets/images/orange-circle.svg"
                  alt=""
                  unoptimized
                  width={42}
                  height={42}
                  className="absolute top-[30px] left-[-30px] -z-1"
                />

                <Image
                  src="/assets/images/purple-circle.svg"
                  alt=""
                  unoptimized
                  width={42}
                  height={42}
                  className="absolute top-[71%] right-[-10px] -z-1"
                />
                <Image
                  src="/assets/images/blue-circle.svg"
                  alt=""
                  unoptimized
                  width={98}
                  height={98}
                  className="absolute top-[50%] left-[-30px] -z-1"
                />

                <div className=" h-[518px] w-full bg-white  rounded-[16px] overflow-hidden relative">
                  <video
                    autoPlay={true}
                    playsInline
                    muted
                    loop
                    className="w-full h-full   aspect-video object-contain "
                    src="/assets/images/back-it.mp4"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>,
      <div key="backer-step-3" className="outline-none" tabIndex={-1}>
        <div className="flex gap-[30px] flex-col slide-card max-w-[600px] mx-auto">
          <div className="max-w-[500px] mx-auto">
            <div className="text-center">
              <h3 className="text-[#9662FD] font-[NeueHaasDisplayRoman] text-[30px] mb-[10px]">
                Access the Exclusive
              </h3>
              <p className="text-white font-[NeueHaasDisplayRoman] text-[16px]">
                See your support in action! Gain exclusive entry to view the
                final video content – the direct result of the community's
                backing.
              </p>
            </div>
          </div>
          <div className="w-full max-w-[492px] mx-auto">
            <div className="flex justify-center">
              <div className="relative ">
                <Image
                  src="/assets/images/exclusive.png"
                  alt=""
                  unoptimized
                  width={430}
                  height={546}
                />
              </div>
            </div>
          </div>
        </div>
      </div>,
      <div key="backer-step-4" className="outline-none" tabIndex={-1}>
        <div className="flex gap-[30px] flex-col slide-card max-w-[600px] mx-auto">
          <div className="max-w-[500px] mx-auto">
            <div className="text-center">
              <h3 className="text-[#9662FD] font-[NeueHaasDisplayRoman] text-[30px] mb-[10px]">
                Your Voice Matters
              </h3>
              <p className="text-white font-[NeueHaasDisplayRoman] text-[16px]">
                Hold creators accountable. Use your vote to confirm if the
                creator successfully delivered the exclusive content they
                promised. Your vote directs the funds to the creator or back to
                your wallet, in which case you can back other creators on the
                platform.
              </p>
              <div className="mt-[30px]">
                <Link
                  href="#"
                  className="bg-[#9662FD] inline-flex justify-center rounded-[30px] text-[13px] px-[27px] py-[13px] font-[NeueHaasDisplayMedium] text-white "
                >
                  Start browsing trailers
                </Link>
              </div>
            </div>
          </div>
          <div className="w-full max-w-[492px] mx-auto">
            <div className="flex justify-center">
              <div className="relative w-[246px]">
                <Image
                  src="/assets/images/pink-circle.svg"
                  alt=""
                  unoptimized
                  width={228}
                  height={228}
                  className="absolute top-[30px] right-[-30px] -z-1"
                />
                <Image
                  src="/assets/images/orange-circle.svg"
                  alt=""
                  unoptimized
                  width={42}
                  height={42}
                  className="absolute top-[30px] left-[-30px] -z-1"
                />

                <Image
                  src="/assets/images/purple-circle.svg"
                  alt=""
                  unoptimized
                  width={42}
                  height={42}
                  className="absolute top-[71%] right-[-10px] -z-1"
                />
                <Image
                  src="/assets/images/blue-circle.svg"
                  alt=""
                  unoptimized
                  width={98}
                  height={98}
                  className="absolute top-[50%] left-[-30px] -z-1"
                />

                <div className=" h-[518px] w-full bg-white  rounded-[16px] overflow-hidden relative">
                  <video
                    autoPlay={true}
                    playsInline
                    muted
                    loop
                    className="w-full h-full   aspect-video object-contain "
                    src="/assets/images/back-it.mp4"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>,
    ],
    []
  );

  const slides = selectedView === "creators" ? creatorSlides : backerSlides;

  return (
    <section
      className="bg-[#0B151F] relative py-[120px]"
      aria-label="How It Works Section"
    >
      <LeftGradShape className="h-[457px] !top-[162px] inset-0 w-full opacity-[70%] py-[120px]" />

      <Container>
        <div className="relative z-20">
          <div className="mb-4">
            <h1 className="text-center mb-8 bg-[linear-gradient(334.27deg,_#FC3E70_-4.61%,_#705DF2_112.9%)] bg-clip-text text-transparent text-[26px] font-[NeueHaasDisplay75Bold]">
              How It Works
            </h1>
          </div>

          <div className="flex justify-center gap-8 mb-8" role="tablist">
            <button
              onClick={() => handleViewSelection("creators")}
              className={`pb-3 cursor-pointer ${
                selectedView === "creators"
                  ? "text-white underline decoration-[#9662FD] underline-offset-[25px]"
                  : "text-[#FFFFFF66]"
              } transition-colors font-[NeueHaasDisplayRoman] text-[20px]`}
              aria-selected={selectedView === "creators"}
              aria-controls="creators-panel"
              role="tab"
            >
              For Creators
            </button>
            <button
              onClick={() => handleViewSelection("backers")}
              className={`pb-3 cursor-pointer ${
                selectedView === "backers"
                  ? "text-white underline decoration-[#9662FD] underline-offset-[25px]"
                  : "text-[#FFFFFF66]"
              } transition-colors font-[NeueHaasDisplayRoman] text-[20px]`}
              aria-selected={selectedView === "backers"}
              aria-controls="backers-panel"
              role="tab"
            >
              For Backers
            </button>
          </div>

          {/* Render ViewContent for selected view */}
          <ViewContent view={selectedView} />

          {/* Slider */}
          <div
            id={
              selectedView === "creators" ? "creators-panel" : "backers-panel"
            }
            role="tabpanel"
            aria-roledescription="carousel"
            className="cs-slider"
          >
            {slides.length > 0 ? (
              <Slider {...sliderSettings}>{slides}</Slider>
            ) : (
              <div className="text-center p-6 text-gray-400">
                No slides available
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default MobileHowItWorksSection;
