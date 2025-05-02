"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Plus, Minus } from "lucide-react";
import { useState,  useEffect } from "react";
import Container from "../common/Container";
import Image from "next/image";
import GradientShapes from "@/components/common/GradientShapes";


interface HelpCenterLink {
  title: string;
  url?: string;
}

interface FAQItemData {
  title: string;
  content: string;
  
}
interface FAQSec {
  faq?: FAQItemData[];
  badge?: string;
  main_heading?: string;
  sub_heading?: string;
  help_center_text?: HelpCenterLink;
}
interface PageData {
  faq_section?: FAQSec;
}

const faqs = [
  {
    question: "How many followers do I need to become a Batcha Creator?",
    answer:
      "Anyone can become a Batcha Creator, regardless of their follower count. What matters most is having an audience willing to pay for your content.",
  },
  {
    question: "How old do I have to be to use Batcha?",
    answer: "You must be at least 18 years old to use Batcha.",
  },
  {
    question: "Is explicit content allowed?",
    answer:
      "Yes, but it must comply with our community guidelines and terms of service.",
  },
  {
    question: "What is the difference between Batcha and Batcha X content?",
    answer:
      "Batcha X content includes premium, age-restricted material that requires additional user verification.",
  },
  {
    question: "How do I promote my trailers?",
    answer:
      "You can share your trailers on social media or embed them on your website using our promotional tools.",
  },
  {
    question: "What if I am not happy with the voting results of the backers?",
    answer:
      "Creators can always provide feedback and appeal results through the platform.",
  },
];

export default function FAQSection() {
  const [openItem, setOpenItem] = useState<string | null>("faq-0");
  const [data, setData] = useState<PageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const toggleItem = (value: string) => {
    setOpenItem((prev) => (prev === value ? null : value));
  };

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

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (error) return <div className="text-center py-20 text-red-500">Error: {error}</div>;
  if (!data?.faq_section?.faq?.length) return <div className="text-center py-20">No FAQs available</div>;
console.log(data);
  return (
    <section className="bg-black pt-[150px] pb-[80px] relative">
      <div className="min-[320px]:max-[768px]:hidden block">
        <GradientShapes />
      </div>
      <Container className="min-[320px]:max-[768px]:px-[0px]">
        <div className="flex justify-center">
          <div className="min-[320px]:max-[768px]:w-full min-[768px]:max-[1200px]:w-9/12  w-6/12">
            <div className="flex justify-center">
              {data?.faq_section?.badge && (
              <p className="rounded-[8px] py-[5px] px-[12px] text-[14px] bg-[#272727] flex gap-[8px] items-center font-[NeueHaasDisplayMedium] tracking-[0.08px] text-[#9662FD] uppercase border border-[#9662FD] shadow-[0_0_0_1px_#9662FD] ">
                <Image
                  src="/assets/images/help-icon.svg"
                  alt=""
                  width={18}
                  height={18}
                />
                {data.faq_section.badge}
              </p>
            )}
            </div>
            {data?.faq_section?.main_heading && (
            <h3 className="min-[320px]:max-[1200px]:text-[35px]     text-white text-[52px] font-[NeueHaasDisplayRoman] text-center mt-10 min-[1200px]:max-[1400px]:text-[40px]">
              {data.faq_section.main_heading}
            </h3>
            )}
            <div className="relative z-10">
              <Accordion
                type="single"
                collapsible
                className="mt-10 w-full space-y-4"
                value={openItem ?? undefined}
                onValueChange={(value) => setOpenItem(value)}
              >
                {data?.faq_section?.faq.map((faq, index) => {
                  const value = `faq-${index}`;
                  const isOpen = openItem === value;

                  return (
                    <AccordionItem
                      key={index}
                      value={value}
                      className="min-[320px]:max-[768px]:bg-[#FFFFFF14] min-[320px]:max-[529px]:!rounded-none bg-[linear-gradient(180deg,_rgba(255,255,255,0)_0%,_rgba(171,171,171,0.06)_100%)]  rounded-[14px] border border-[#FFFFFF14]     
                 data-[state=open]:bg-[#1A191C]
                 data-[state=open]:bg-[linear-gradient(180deg,_rgba(255,255,255,0)_0%,_rgba(171,171,171,0.06)_100%)]
                data-[state=open]:min-[320px]:max-[768px]:bg-[#FFFFFF14]
                 data-[state=open]:border-[#FFFFFF29]"
                    >
                      <AccordionTrigger
                        onClick={() => toggleItem(value)}
                        className="font-[NeueHaasDisplayMedium] min-[320px]:max-[529px]:!rounded-none cursor-pointer text-[16px] text-[#EBEBEB]  pt-[20px] px-[20px] flex justify-between items-center w-full text-left text-base font-medium  [&>svg]:hidden"
                      >
                        <span>{faq.title}</span>
                        <span className="ml-4">
                          {isOpen ? (
                            <Minus className="h-5 w-5 text-[#EBEBEB]" />
                          ) : (
                            <Plus className="h-5 w-5 text-[#EBEBEB]" />
                          )}
                        </span>
                      </AccordionTrigger>
                      <AccordionContent className=" text-[#D1D1D1] text-left  font-[NeueHaasDisplayRoman] pt-[0px] px-[20px]">
                        <p className="">{faq.content}</p>
                      </AccordionContent>
                    </AccordionItem>
                  );
                })}
              </Accordion>
            </div>
          </div>
        </div>
        <div className="w-full pt-10">
        {data.faq_section?.sub_heading && (
          <h4 className=" text-white text-center font-[NeueHaasDisplayRoman] min-[320px]:max-[1200px]:text-[26px]  text-[32px]">
            {data.faq_section.sub_heading}
            <a href={data.faq_section?.help_center_text?.url} className=" inline-block pl-2 bg-[linear-gradient(334.27deg,_#FC3E70_-4.61%,_#705DF2_112.9%)] bg-clip-text text-transparent font-[NeueHaasDisplay75Bold]">
            {data.faq_section?.help_center_text?.title}
            </a>
          </h4>
        )}
        </div>
      </Container>
    </section>
  );
}
