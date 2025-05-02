"use client"

import Container from "@/components/common/Container";
import {
  useEffect,
  useState,
} from "react";
import Image from "next/image";
import FundProgress from "@/components/Home/FundProgress";
import { FaAngleUp } from "react-icons/fa";
import GetPaidTabs from "@/components/Home/GetPaidTabs";
import Link from "next/link";



interface HowItWorksSection {
  for_creators?:{
    creator_tabs?:{
      tab_1_heading?: string;
      tab_1_content?: string;
      tab_1_video?: string;
      tab_2_heading?: string;
      tab_2_content?: string;
      tab_2_counter?: number; 
      tab_2_total?: number; 
      tab_3_heading?: string; 
      tab_3_content?: string; 
      tab_3_video?: string; 
      tab_4_heading?: string; 
      tab_4_content?: string; 
      tab_4_video?: string; 
      tab_5_heading?: string; 
      tab_5_content?: string; 
      tab_5_button?: {
        title: string;
        url: string;
      } 
    } 
  }
}

interface PageData {
  how_it_work_section?: HowItWorksSection;
}

export const CreatorSlides = () => {

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

  return (
    <>
      <div className="box  transition-opacity duration-500">
        <div className="w-full">
          <Container>
            <div className="flex justify-end">
              <div className="w-10/12 min-[1200px]:max-[1280px]:w-full  ">
                <div className="flex justify-end items-center">
                  <div className="w-6/12">
                    <div>
                    {data?.how_it_work_section?.for_creators?.creator_tabs?.tab_1_heading && (
                      <h3 className="text-[#9662FD] font-[NeueHaasDisplayRoman] text-[50px] mb-[10px]">
                        {data.how_it_work_section.for_creators.creator_tabs.tab_1_heading}
                      </h3>
                    )}
                     {data?.how_it_work_section?.for_creators?.creator_tabs?.tab_1_content && (
                      <p className="text-white  font-[NeueHaasDisplayRoman] text-[30px]">
                        {data.how_it_work_section.for_creators.creator_tabs.tab_1_content}
                      </p>
                     )}
                    </div>
                  </div>
                  <div className="w-5/12">
                    <div className="flex justify-center">
                      <div className="relative w-[68%]">
                        <Image
                          src="/assets/images/pink-circle.svg"
                          alt=""
                          width={228}
                          height={228}
                          className="absolute top-[30px] right-[-50px] -z-1"
                        />

                        <Image
                          src="/assets/images/purple-circle.svg"
                          alt=""
                          width={42}
                          height={42}
                          className="absolute top-[71%] right-[-17px] -z-1"
                        />
                        <Image
                          src="/assets/images/blue-circle.svg"
                          alt=""
                          width={98}
                          height={98}
                          className="absolute top-[50%] left-[-26px] -z-1"
                        />

                        <div className=" h-[518px] w-full bg-white  rounded-[16px] overflow-hidden relative">
                          {/* <video
                            autoPlay={true}
                            playsInline
                            muted
                            loop
                            className="w-full h-full   aspect-video object-contain "
                            src="/assets/images/create-trailer.webm"
                          /> */}
                         {data?.how_it_work_section?.for_creators?.creator_tabs?.tab_1_video && (
                        <video muted loop playsInline controls autoPlay className="w-full h-full   aspect-video object-contain ">
                          <source src={data.how_it_work_section.for_creators.creator_tabs.tab_1_video} type="video/mp4" />
                        </video>
                         )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </div>
      </div>

      <div className="box  transition-opacity duration-500">
        <div className="w-full">
          <Container>
            <div className="flex justify-end">
              <div className="w-10/12 min-[1200px]:max-[1280px]:w-full ">
                <div className="flex gap-[30px] justify-end items-center">
                  <div className="w-6/12">
                    <div>
                    {data?.how_it_work_section?.for_creators?.creator_tabs?.tab_2_heading && (
                      <h3 className="text-[#9662FD] font-[NeueHaasDisplayRoman] text-[50px] mb-[10px]">
                        {data.how_it_work_section.for_creators.creator_tabs.tab_2_heading}
                      </h3>
                    )}
                     {data?.how_it_work_section?.for_creators?.creator_tabs?.tab_2_content && (
                      <p className="text-white  font-[NeueHaasDisplayRoman] text-[30px]">
                        {data.how_it_work_section.for_creators.creator_tabs.tab_2_content}
                      </p>
                     )}
                    </div>
                  </div>
                  <div className="w-5/12">
                    <div className="flex justify-center">
                      <div className="relative ">
                        <Image
                          src="/assets/images/card-background.svg"
                          alt=""
                          width={459}
                          height={307}
                          className="absolute left-0 w-[459px] h-[459px] top-[-140px] -z-1 "
                        />

                        <div className="shadow-[0px_0px_30px_0px_#6C22FF33] bg-[#0F172C] rounded-tl-[16px] rounded-tr-[16px] ">
                          <div className="flex items-center gap-[8px] px-[10px] pt-[10px] pb-[20px]  ">
                            <button className="font-[NeueHaasDisplayRoman] border border-transparent flex justify-center items-center text-[16px] text-white bg-[#9562FD] rounded-[10px] w-[190px] h-[37px]">
                              {" "}
                              Back it ( min $1)
                            </button>
                            <button className="font-[NeueHaasDisplayRoman] border border-[#314158] flex justify-center items-center text-[16px] text-white  rounded-[10px] w-[190px] h-[37px]">
                              Bakers{" "}
                            </button>
                            <button className="w-[37px] border border-[#314158] h-[37px] rounded-[10px] flex justify-center items-center text-white">
                              <FaAngleUp />{" "}
                            </button>
                          </div>

                          <FundProgress raised={0} goal={data?.how_it_work_section?.for_creators?.creator_tabs?.tab_2_total || 0} />
                        </div>

                        <div className="bg-[#0F172C] shadow-[0px_4px_10px_0px_#FFFFFF0D_inset] rounded-br-[16px] rounded-bl-[16px] p-2">
                          <ul className="flex justify-center gap-[55px]">
                            <li className="flex justify-center">
                              <Image
                                src="/assets/images/btm1.svg"
                                alt=""
                                width={33}
                                height={33}
                              />
                            </li>
                            <li className="flex justify-center">
                              <Image
                                src="/assets/images/btm2.svg"
                                alt=""
                                width={33}
                                height={33}
                              />
                            </li>
                            <li className="flex justify-center">
                              <Image
                                src="/assets/images/btm3.svg"
                                alt=""
                                width={49}
                                height={40.5}
                              />
                            </li>
                            <li className="flex justify-center">
                              <Image
                                src="/assets/images/btm4.svg"
                                alt=""
                                width={33}
                                height={33}
                              />
                            </li>
                            <li className="flex justify-center">
                              <Image
                                src="/assets/images/btm5.svg"
                                alt=""
                                width={33}
                                height={33}
                              />
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </div>
      </div>

      <div className="box  transition-opacity duration-500">
        <div className="w-full">
          <Container>
            <div className="flex justify-end">
              <div className="w-10/12 min-[1200px]:max-[1280px]:w-full ">
                <div className="flex gap-[20px] justify-end items-center">
                  <div className="w-6/12">
                  <div>
                    {data?.how_it_work_section?.for_creators?.creator_tabs?.tab_3_heading && (
                      <h3 className="text-[#9662FD] font-[NeueHaasDisplayRoman] text-[50px] mb-[10px]">
                        {data.how_it_work_section.for_creators.creator_tabs.tab_3_heading}
                      </h3>
                    )}
                     {data?.how_it_work_section?.for_creators?.creator_tabs?.tab_3_content && (
                      <p className="text-white  font-[NeueHaasDisplayRoman] text-[30px]">
                        {data.how_it_work_section.for_creators.creator_tabs.tab_3_content}
                      </p>
                     )}
                    </div>
                  </div>
                  <div className="w-5/12">
                    <div className="flex justify-center">
                      <div className="relative w-[68%]">
                        <Image
                          src="/assets/images/pink-circle.svg"
                          alt=""
                          width={228}
                          height={228}
                          className="absolute top-[150px] left-[-60px] -z-1"
                        />

                        <Image
                          src="/assets/images/orange-circle.svg"
                          alt=""
                          width={42}
                          height={42}
                          className="absolute top-[80px] right-[-20px] -z-1"
                        />
                        <Image
                          src="/assets/images/blue-circle.svg"
                          alt=""
                          width={98}
                          height={98}
                          className="absolute bottom-[10px] right-[-40px] -z-1"
                        />

                        <div className=" h-[518px] w-full bg-white  rounded-[16px] overflow-hidden relative">
                        {data?.how_it_work_section?.for_creators?.creator_tabs?.tab_3_video && (
                        <video muted loop playsInline controls autoPlay className="w-full h-full   aspect-video object-contain ">
                          <source src={data.how_it_work_section.for_creators.creator_tabs.tab_3_video} type="video/mp4" />
                        </video>
                         )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </div>
      </div>

      <div className="box  transition-opacity duration-500">
        <div className="w-full">
          <Container>
            <div className="flex justify-end">
              <div className="w-10/12 min-[1200px]:max-[1280px]:w-full ">
                <div className="flex gap-[20px] justify-end items-center">
                  <div className="w-6/12">
                  <div>
                    {data?.how_it_work_section?.for_creators?.creator_tabs?.tab_4_heading && (
                      <h3 className="text-[#9662FD] font-[NeueHaasDisplayRoman] text-[50px] mb-[10px]">
                        {data.how_it_work_section.for_creators.creator_tabs.tab_4_heading}
                      </h3>
                    )}
                     {data?.how_it_work_section?.for_creators?.creator_tabs?.tab_4_content && (
                      <p className="text-white  font-[NeueHaasDisplayRoman] text-[30px]">
                        {data.how_it_work_section.for_creators.creator_tabs.tab_4_content}
                      </p>
                     )}
                    </div>
                  </div>
                  <div className="w-5/12">
                    <div className="flex justify-center">
                      <div className="relative w-[68%]">
                        <Image
                          src="/assets/images/pink-circle.svg"
                          alt=""
                          width={228}
                          height={228}
                          className="absolute bottom-0 left-[-6px] -z-1"
                        />

                        <Image
                          src="/assets/images/orange-circle.svg"
                          alt=""
                          width={42}
                          height={42}
                          className="absolute top-[190px] right-[-20px] -z-1"
                        />
                        <Image
                          src="/assets/images/blue-circle.svg"
                          alt=""
                          width={98}
                          height={98}
                          className="absolute top-[-30px] left-[-6px] -z-1"
                        />

                        <div className=" h-[518px] w-full bg-white  rounded-[16px] overflow-hidden relative">
                        {data?.how_it_work_section?.for_creators?.creator_tabs?.tab_4_video && (
                        <video muted loop playsInline controls autoPlay className="w-full h-full   aspect-video object-contain ">
                          <source src={data.how_it_work_section.for_creators.creator_tabs.tab_4_video} type="video/mp4" />
                        </video>
                         )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </div>
      </div>

      <div className="box  transition-opacity duration-500">
        <div className="w-full">
          <Container>
            <div className="flex justify-end">
              <div className="w-10/12 min-[1200px]:max-[1280px]:w-full ">
                <div className="flex gap-[20px] justify-end items-center">
                  <div className="w-6/12">
                    <div>
                    {data?.how_it_work_section?.for_creators?.creator_tabs?.tab_5_heading && (
                      <h3 className="text-[#9662FD] font-[NeueHaasDisplayRoman] text-[50px] mb-[10px]">
                        {data.how_it_work_section.for_creators.creator_tabs.tab_5_heading}
                      </h3>
                    )}
                     {data?.how_it_work_section?.for_creators?.creator_tabs?.tab_5_content && (
                      <p className="text-white  font-[NeueHaasDisplayRoman] text-[30px]">
                        {data.how_it_work_section.for_creators.creator_tabs.tab_5_content}
                      </p>
                     )}
                    {data?.how_it_work_section?.for_creators?.creator_tabs?.tab_5_button?.title && (
                      <div className="mt-[30px]">
                        <Link
                          href={data.how_it_work_section.for_creators.creator_tabs.tab_5_button.url}
                          className="bg-[#9662FD] inline-flex justify-center rounded-[30px] text-[16px] px-[35px] py-[13px] font-[NeueHaasDisplayMedium] text-white "
                        >
                          {data.how_it_work_section.for_creators.creator_tabs.tab_5_button.title}
                        </Link>
                      </div>
                    )}
                    </div>
                  </div>
                  <div className="w-5/12">
                    <div className="flex justify-center">
                      <div className="relative w-full">
                        <Image
                          src="/assets/images/pink-circle.svg"
                          alt=""
                          width={228}
                          height={228}
                          className="absolute bottom-[-50px] left-[90px] -z-1"
                        />

                        <Image
                          src="/assets/images/orange-circle.svg"
                          alt=""
                          width={42}
                          height={42}
                          className="absolute top-[140px] right-[-20px] -z-1"
                        />
                        <Image
                          src="/assets/images/blue-circle.svg"
                          alt=""
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
              </div>
            </div>
          </Container>
        </div>
      </div>
    </>
  );
};
