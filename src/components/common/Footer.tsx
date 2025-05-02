"use client";

import Link from "next/link";
import Image from "next/image";
import { ScrollToTopButton } from "@/hooks/useScrollToTop";
import React, { useState, useEffect } from "react";


interface FooterSection {
  about_us?:{
    title: string;
    url?: string;
  };
  community_guidelines?:{
    title: string;
    url?: string;
  };
  contact?:{
    title: string;
    url?: string;
  };
  faq?:{
    title: string;
    url?: string;
  };
  login?:{
    title: string;
    url?: string;
  };
  signup?:{
    title: string;
    url?: string;
  };
  help_centre?:{
    title: string;
    url?: string;
  };
  batchatv?:{
    title: string;
    url?: string;
  };
  privacy_policy?:{
    title: string;
    url?: string;
  };
  terms_of_service?:{
    title: string;
    url?: string;
  };
  facebook?: string;
  instagram?: string;
  tiktok?: string;
}

interface PageData {
  footer_menu?: FooterSection;
  social_links?: FooterSection;
  quick_links?: FooterSection;
  footer_logo?: string;
  footer_email?: string;
  footer_copyright?: string;
  // Add other sections if needed
}


const Footer = () => {


  const [data, setData] = useState<PageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://batchatv.clickysoft.us/wp-json/wp/v1/footer');
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
  console.log(data);
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative min-[320px]:max-[768px]:bg-[#9662FD33] bg-[linear-gradient(360deg,_#261B3C_27.44%,_#170C2C_80.65%)] min-[320px]:max-[1400px]:px-[30px] text-white py-8 px-[80px] ">

      <div className="grid grid-cols-4 min-[768px]:max-[1200px] min-[768px]:max-[1200px]:grid-cols-2  min-[320px]:max-[768px]:grid-cols-1 min-[320px]:max-[768px]:items-center min-[320px]:max-[1200px]:gap-[40px] ">
        <div className="flex flex-col gap-[20px] min-[320px]:max-[768px]:items-center  ">
          <div>
            {data?.footer_logo && (
            <Image
            src={data.footer_logo}
            alt="Batcha"
            width={100}
            height={32}
            className="dark:invert"
          />
            )}

          </div>
          <div className="flex flex-wrap min-[320px]:max-[768px]:w-[94%] min-[320px]:max-[768px]:max-w-[290px] min-[320px]:max-[768px]:justify-center   max-w-[280px] gap-x-[9px] gap-y-[5px] items-center  ">
            
          {data?.footer_menu?.about_us?.url && (
            <Link
              href={data.footer_menu.about_us.url}
              className="font-[NeueHaasDisplayMedium] text-[14px] text-[#D4D5D9]"
            >
              {data.footer_menu.about_us.title}
            </Link>
            )}
            <span className="mx-2 text-[#D4D5D9]">/</span>
            {data?.footer_menu?.contact?.url && (
            <Link
              href={data.footer_menu.contact.url}
              className="font-[NeueHaasDisplayMedium] text-[14px] text-[#D4D5D9]"
            >
              {data.footer_menu.contact.title}
            </Link>
            )}
            <span className="mx-2 text-[#D4D5D9]">/</span>
            {data?.footer_menu?.faq?.url && (
            <Link
              href={data.footer_menu.faq.url}
              className="font-[NeueHaasDisplayMedium] text-[14px] text-[#D4D5D9]"
            >
              {data.footer_menu.faq.title}
            </Link>
            )}
            <span className="mx-2 text-[#D4D5D9]">/</span>
            {data?.footer_menu?.community_guidelines?.url && (
            <Link
              href={data.footer_menu.community_guidelines.url}
              className="font-[NeueHaasDisplayMedium] text-[14px] text-[#D4D5D9]"
            >
              {data.footer_menu.community_guidelines.title}
            </Link>
            )}
            <span className="mx-2 text-gray-500">/</span>
            {data?.footer_menu?.signup?.url && (
            <Link
              href={data.footer_menu.signup.url}
              className="font-[NeueHaasDisplayMedium] text-[14px] text-[#D4D5D9]"
            >
              {data.footer_menu.signup.title}
            </Link>
            )}
            <span className="mx-2 text-gray-500">/</span>
            {data?.footer_menu?.login?.url && (
            <Link
              href={data.footer_menu.login.url}
              className="font-[NeueHaasDisplayMedium] text-[14px] text-[#D4D5D9]"
            >
              {data.footer_menu.login.title}
            </Link>
            )}
            <span className="mx-2 text-gray-500">/</span>
            {data?.footer_menu?.help_centre?.url && (
            <Link
            href={data.footer_menu.help_centre.url}
              className="font-[NeueHaasDisplayMedium] text-[14px]  bg-[linear-gradient(334.27deg,_#FC3E70_-4.61%,_#705DF2_112.9%)] bg-clip-text text-transparent"
            >
              {data.footer_menu.help_centre.title}
            </Link>
            )}
          </div>
        </div>
        <div className="flex flex-col min-[320px]:max-[768px]:items-center min-[320px]:max-[768px]:justify-center  ">
          <div className="mb-[32px] min-[320px]:max-[768px]:mb-[16px]">
            <h3 className="text-[#9662FD] text-[13px]  font-[NeueHaasDisplay75Bold] mb-4">GET SOCIAL WITH US</h3>
            <div className="flex gap-4">
            {data?.social_links?.facebook && (
              <Link href={data.social_links.facebook} className="" target="_blank">
                <Image
                  src="/assets/images/facebook-icon.svg"
                  alt=""
                  width={30}
                  height={30}
                />
              </Link>
            )}
            {data?.social_links?.instagram && (
              <Link href={data.social_links.instagram} className="" target="_blank">
                <Image
                  src="/assets/images/insa-icon.svg"
                  alt=""
                  width={30}
                  height={30}
                />
              </Link>
            )}
            {data?.social_links?.tiktok && (
              <Link href={data.social_links.tiktok} className="" target="_blank">
                <Image
                  src="/assets/images/tiktok-icon.svg"
                  alt=""
                  width={30}
                  height={30}
                />
              </Link>
            )}
            </div>
          </div>

          <div className="min-[320px]:max-[768px]:items-center flex flex-col">
            <h3 className="text-[#9662FD] text-[13px]  font-[NeueHaasDisplay75Bold] uppercase mb-4 mt-4">Email</h3>
            {data?.footer_email && (
            <Link 
            href={`mailto:${data.footer_email}`} 
            className="text-[#D4D5D9] font-[NeueHaasDisplayRoman] text-[14px]"
          >
            {data.footer_email}
          </Link>
            )}
          </div>
        </div>
        <div className=" flex flex-col justify-end min-[320px]:max-[768px]:justify-center min-[320px]:max-[768px]:items-center"> 
          <h3 className="text-[#9662FD] text-[13px]  font-[NeueHaasDisplay75Bold] mb-4">QUICK LINKS</h3>
          <div className="flex items-center  gap-2 text-sm">
          {data?.quick_links?.terms_of_service?.url && (
            <Link href={data.quick_links.terms_of_service.url} className="text-[#D4D5D9] font-[NeueHaasDisplayRoman] text-[14px]">
              {data.quick_links.terms_of_service.title}
            </Link>
          )}
            <span className="text-gray-500">|</span>
            {data?.quick_links?.privacy_policy?.url && (
            <Link href={data.quick_links.privacy_policy.url} className="text-[#D4D5D9] font-[NeueHaasDisplayRoman] text-[14px]">
              {data.quick_links.privacy_policy.title}
            </Link>
          )}
            <span className="text-[#D4D5D9]">|</span>
            {data?.quick_links?.batchatv?.url && (
            <Link href={data.quick_links.batchatv.url} className="text-[#D4D5D9] font-[NeueHaasDisplayRoman] text-[14px]">
              {data.quick_links.batchatv.title}
            </Link>
          )}
          </div>
        </div>

        <div className=" flex flex-col justify-end">
        {data?.footer_copyright && (
          <p className="min-[320px]:max-[768px]:text-center text-right text-[#D4D5D9] font-[NeueHaasDisplayRoman] text-[14px]">
            Copyright {currentYear}, {data.footer_copyright}
          </p>
        )}
        </div>
      </div>

      <ScrollToTopButton/>
    </footer>
  );
};

export default Footer;
