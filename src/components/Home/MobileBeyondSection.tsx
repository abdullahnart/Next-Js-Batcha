"use client";

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Container from "@/components/common/Container";
import RightGradShape from "../common/RightGradShape";
import Image from "next/image";

const MobileBeyondSection: React.FC = () => {
  // Slider settings with accessibility and performance optimizations
  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    adaptiveHeight: true,

    lazyLoad: "ondemand" as const, // Lazy-load slides for performance
    dotsClass: "slick-dots custom-dots", // Custom class for styling dots
  };

  return (
    <section
      className="bg-[#0B151F] relative py-[120px]"
      aria-label="Beyond Section"
    >
      <RightGradShape className="h-[457px] !top-[50%] inset-0 w-full opacity-[1] py-[120px]" />

      <Container>
        <div className="relative z-20">
          <div className="mb-4">
            <div className="w-full max-w-[683px] mx-auto">
              <div className="">
                <h3 className="mb-[30px] text-center text-white text-[30px] font-[NeueHaasDisplay75Bold] leading-[1.4]">
                  Batcha X: Go Beyond Backing.
                  <span className="block text-[#9662FD]">
                    Become part of the action!
                  </span>
                </h3>

                <p className="text-center text-white text-[18px] font-[NeueHaasDisplayRoman]">
                  Get ready for a whole new level of involvement! Some creators
                  will activate Batcha X on their campaigns, offering a unique
                  opportunity to their most dedicated backers to be part of the
                  final video
                </p>
              </div>
            </div>
          </div>

          <div role="" aria-roledescription="carousel" className="cs-slider">
            <Slider {...sliderSettings}>
              <div className="outline-none" tabIndex={-1}>
                <div className="beyond-card max-w-[600px] mx-auto">
                  <div className="flex flex-col justify-center gap-[30px] items-center">
                    <div className=" w-full text-center">
                      <h4 className="text-[#9662FD] font-[NeueHaasDisplayMedium] text-[26px] mb-[30px]">
                        Creator Activates
                      </h4>

                      <p className=" text-white text-[18px] font-[NeueHaasDisplayRoman]">
                        The creator decides to enable Batcha X for their
                        campaign and chooses the number of winners and terms of
                        participation
                      </p>
                    </div>

                    <div className="m-[0_0_0_auto] w-full max-w-[417px]">
                      <Image
                        src="/assets/images/activates.svg"
                        alt=""
                      
                        width={417}
                        height={320}
                        className="w-full"
                        unoptimized
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="outline-none" tabIndex={-1}>
                <div className="beyond-card max-w-[600px] mx-auto">
                  <div className="flex flex-col-reverse justify-center gap-[30px] items-center">
                    <div className="mx-auto w-full max-w-[417px]">
                      <div className="flex justify-end">
                        <div className="relative w-full ">
                          <Image
                            src="/assets/images/c-ellipse.svg"
                            alt=""
                          
                            width={295}
                            height={295}
                            className="absolute left-[-99px]  top-[120px] z-0 "
                            unoptimized
                          />

                          <div className=" h-[540px]    rounded-[16px] overflow-hidden relative">
                            <video
                              autoPlay={true}
                              playsInline
                              muted
                              loop
                              className="w-full h-full   aspect-video object-cover min-[320px]:max-[1200px]:object-[unset] object-[96%_-51px] "
                              src="/assets/images/win-video.mp4"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className=" w-full text-center">
                      <div className="pl-[20px] min-[320px]:max-[1200]:pl-[0px]">
                        <h4 className="text-[#9662FD] font-[NeueHaasDisplayMedium] text-[26px] mb-[30px]">
                          Top Backers Win
                        </h4>

                        <p className=" text-white text-[18px] font-[NeueHaasDisplayRoman]">
                          When the campaign is funded successfully, the backers
                          who contributed the highest amounts win the Batcha X
                          opportunity. If the creator chose 3 winners, the top 3
                          backers win!
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="outline-none" tabIndex={-1}>
                <div className=" beyond-card  max-w-[600px] mx-auto">
                  <div className="flex flex-col justify-center gap-[30px] items-center">
                    <div className="w-full text-center">
                      <h4 className="text-[#9662FD] font-[NeueHaasDisplayMedium] text-[26px] mb-[30px]">
                        Creator Activates
                      </h4>

                      <p className=" text-white text-[18px] font-[NeueHaasDisplayRoman]">
                        The creator decides to enable Batcha X for their
                        campaign and chooses the number of winners and terms of
                        participation
                      </p>
                    </div>

                    <div className="mx-auto w-full max-w-[417px]">
                      <Image
                        src="/assets/images/prize.svg"
                        alt=""
                      unoptimized
                        width={455}
                        height={362}
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Slider>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default MobileBeyondSection;
