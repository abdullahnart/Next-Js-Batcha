import React, { useState, useEffect } from "react";
import DOMPurify from 'dompurify';
import Container from "@/components/common/Container";
import Image from "next/image";
import AnimatedSection from "@/components/AnimatedSection";
import GradientShapes from "@/components/common/GradientShapes";



interface BeyondSection {
  heading_1?: string;
  heading_2?: string;
  content?: string;
  box1_heading?: string;
  box1_content?: string;
  box1_image?: string;
  box2_video?: string;
  box2_heading?: string;
  box2_content?: string;
  box3_heading?: string;
  box3_content?: string;
  box3_image?: string;
  bottom_heading?: string;
}

interface PageData {
  beyond_section?: BeyondSection;
  // Add other sections if needed
}

const BeyondSection = () => {

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

    const sanitizedContent = DOMPurify.sanitize(
      data?.beyond_section?.bottom_heading || ''
    );

  return (
    <section className="bg-[#0B151F] relative    pt-[120px] ">
     

      <GradientShapes/>

      <Container>
        <div className="flex justify-center mb-[100px]">
          <AnimatedSection direction="top">
            <div className="w-full max-w-[683px]">
              <div className="">
                {data?.beyond_section?.heading_1 && (
                <h3 className="mb-[30px] text-center text-white text-[46px] font-[NeueHaasDisplay75Bold] leading-[1.4]">
                {data.beyond_section.heading_1}
                <span className="block text-[#9662FD]">
                {data.beyond_section.heading_2}
                </span>
              </h3>
                )}
                {data?.beyond_section?.content && (
                <p className="text-center text-white text-[18px] font-[NeueHaasDisplayRoman]">
                  {data.beyond_section.content}
                </p>
                )}
               
              </div>
            </div>
          </AnimatedSection>
        </div>
        <div className="flex justify-center ">
          <div className="w-8/12">
            <AnimatedSection direction="left">
              <div className="bg-[linear-gradient(90deg,rgba(150,98,253,0.25)_43.48%,rgba(40,36,59,0)_75.03%)] p-[50px] rounded-[20px] mb-[100px]">
                <div className="flex gap-[30px] items-center">
                  <div className="w-5/12">  
                  {data?.beyond_section?.box1_heading && (
                    <h4 className="text-[#9662FD] font-[NeueHaasDisplayMedium] text-[26px] mb-[30px]">
                    {data.beyond_section.box1_heading}
                  </h4>
                  )}
                  {data?.beyond_section?.box1_content && (
                    <p className=" text-white text-[18px] font-[NeueHaasDisplayRoman]">
                      {data.beyond_section.box1_content}
                    </p>
                    )}
                  </div>

                  <div className="w-7/12">
                  
                    <Image
                      src={data?.beyond_section?.box1_image ?? '/default.jpg'}
                      alt=""
                      width={417}
                      height={320}
                      className="w-full"
                      unoptimized
                    />
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right">
              <div className=" shadow-xl bg-[linear-gradient(-90deg,_rgba(150,98,253,0.25)_43.48%,_rgba(40,36,59,0)_75.03%)] px-[50px] rounded-[20px] mb-[100px]">
                <div className="flex gap-[30px] items-center">
                  <div className="w-5/12">
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
                            className="w-full h-full   aspect-video object-cover object-[96%_-51px] "
                            src={data?.beyond_section?.box2_video ?? '/default.jpg'}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="w-7/12">
                    <div className="pl-[20px]">
                    {data?.beyond_section?.box2_heading && (
                    <h4 className="text-[#9662FD] font-[NeueHaasDisplayMedium] text-[26px] mb-[30px]">
                    {data.beyond_section.box2_heading}
                    </h4>
                    )}                      

                    {data?.beyond_section?.box2_content && (
                    <p className=" text-white text-[18px] font-[NeueHaasDisplayRoman]">
                      {data.beyond_section.box2_content}
                    </p>
                    )}
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="left">
              <div className="bg-[linear-gradient(90deg,rgba(150,98,253,0.25)_43.48%,rgba(40,36,59,0)_75.03%)] p-[50px] rounded-[20px] mb-[100px]">
              <div className="flex gap-[30px] items-center">
                  <div className="w-5/12">  
                  {data?.beyond_section?.box3_heading && (
                    <h4 className="text-[#9662FD] font-[NeueHaasDisplayMedium] text-[26px] mb-[30px]">
                    {data.beyond_section.box3_heading}
                  </h4>
                  )}
                  {data?.beyond_section?.box3_content && (
                    <p className=" text-white text-[18px] font-[NeueHaasDisplayRoman]">
                      {data.beyond_section.box3_content}
                    </p>
                    )}
                  </div>

                  <div className="w-7/12">
                  
                    <Image
                      src={data?.beyond_section?.box3_image ?? '/default.jpg'}
                      alt=""
                      width={417}
                      height={320}
                      className="w-full"
                      unoptimized
                    />
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
        <AnimatedSection direction="bottom">
          <div className="w-full">
            <div className="flex justify-center">
              <h3 dangerouslySetInnerHTML={{ __html: sanitizedContent }} className="mb-[10px] text-center text-white text-[46px] font-[NeueHaasDisplayRoman] leading-[1.4]">
              </h3>
             <div  />
            </div>
          </div>
        </AnimatedSection>
      </Container>
    </section>
  );
};

export default BeyondSection;
