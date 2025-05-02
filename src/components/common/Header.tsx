"use client"
import Image from "next/image";
import React, {
  forwardRef,
  useRef,
  useLayoutEffect,
  useImperativeHandle,
  useState, 
  useEffect
} from "react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Container from "@/components/common/Container";
import Link from "next/link";
import {
  Sheet,
  SheetClose,
  SheetContent,
 
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { IoClose } from "react-icons/io5";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const Header = forwardRef((props, ref) => {
  const logoRef = useRef(null);
  const textRef = useRef(null);
  const headerRef = useRef(null);
  const ctasRef = useRef(null);
  const logoImageRef = useRef(null);
  const textContentRef = useRef(null);

  useImperativeHandle(ref, () => ({
    header: headerRef.current,
    logo: logoRef.current,
    text: textRef.current,
    ctaText: ctasRef.current,
  }));


  interface HeaderSection {
    logo_image?: string;
    logo_text?: string;
    explore_button?:{
      title: string;
      url?: string;
    };
    sign_in_button?:{
      title: string;
      url?: string;
    };
  }
  
  interface PageData {
    header?: HeaderSection;
    menu_buttons?: HeaderSection;
    // Add other sections if needed
  }

  useLayoutEffect(() => {
    if (!headerRef.current) return;

    // Create GSAP matchMedia instance
    const mm = gsap.matchMedia();

    // Add media query for viewports >= 1200px
    mm.add("(min-width: 1200px)", () => {
      // Set header initially invisible
      gsap.set(headerRef.current, { opacity: 1 });

      // Only the logo container should be visible
      gsap.set(logoRef.current, {
        opacity: 1,
        y: 400,
        x: 50,
        scale: 3.2,
        transformOrigin: "center center",
        zIndex: 100,
      });

      // But the logo image should be visible
      gsap.set(logoImageRef.current, {
        opacity: 1,
      });

      // Hide navigation text container
      gsap.set(textRef.current, {
        opacity: 0,
        x: -50,
      });

      // Hide text content
      gsap.set(textContentRef.current, {
        opacity: 1,
      });

      // Hide CTAs initially
      gsap.set(ctasRef.current, {
        opacity: 0,
        y: -1000,
      });

      // Cleanup animations when media query no longer matches
      return () => {
        // Reset styles to avoid lingering effects
        gsap.set(
          [
            headerRef.current,
            logoRef.current,
            logoImageRef.current,
            textRef.current,
            textContentRef.current,
            ctasRef.current,
          ],
          { clearProps: "all" }
        );
      };
    });

    // Cleanup matchMedia on unmount
    return () => {
      mm.revert();
    };
  }, []);

  const [data, setData] = useState<PageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('https://batchatv.clickysoft.us/wp-json/wp/v1/options');
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
    // if (loading) return <div className="absolute loader text-center py-20">Loading...</div>;
    // if (error) return <div className="absolute loader text-center py-20 text-red-500">Error: {error}</div>;
    // if (!data) return <div className="absolute loader text-center py-20">No data available</div>;
  // console.log(data?.menu_buttons);

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 w-full z-50 py-4 opacity-0 min-[320px]:max-[1200px]:opacity-[1]"
    >
      <Container>
        <div className="flex justify-center items-center">
          <div className="w-4/12"></div>
          <div className="w-4/12 min-[320px]:max-[1200px]:w-8/12">
            <div className="flex justify-center items-center gap-[10px]">
              <div className="" ref={logoRef}>
                {data?.header?.logo_image && (
                  <Image
                  ref={logoImageRef}
                  src={data.header.logo_image}
                  alt="batcha"
                  width={48}
                  height={48}
                  unoptimized
                />
                )}
              </div>
              <div ref={textRef} className="flex space-x-8">
              {data?.header?.logo_text && (
                  <Image ref={textContentRef} src={data.header.logo_text} alt="" width={94} height={21} unoptimized/>
                )}
              </div>
            </div>
          </div>
          <div className="w-4/12">
            <div className="flex justify-end">
              <div className="min-[320px]:max-[1200px]:block hidden">
                <Sheet>
                  <SheetTrigger className="cursor-pointer">
                    <Image
                      src="/assets/images/hamburger.svg"
                      alt=""
                      width={36}
                      height={24}
                      unoptimized
                    />
                  </SheetTrigger>
                  <SheetContent className="!shadow-[none] border-0 bg-transparent !bg-[linear-gradient(360deg,_#261B3C_27.44%,_#170C2C_80.65%)]  [&_.lucide-x]:hidden">
                    <SheetTitle className="sr-only">Off Canvas</SheetTitle>

                    <SheetClose asChild>
                      <button className="absolute right-4 top-4 text-white cursor-pointer">
                        <IoClose size={28} />
                      </button>
                    </SheetClose>

                    <div className="flex flex-col gap-[20px] items-center pt-[80px]">
                    {data?.menu_buttons?.explore_button?.url && (
                      <Link
                      href={data.menu_buttons.explore_button.url}
                        className="flex w-[160px] bg-[#9662FD] text-white rounded-[25px] py-[13px] font-[NeueHaasDisplayMedium] text-[16px] justify-center capitalize"
                      >
                      
                      {data.menu_buttons.explore_button.title}
                      </Link>
                    )}
                     {data?.menu_buttons?.sign_in_button?.url && (
                      <Link
                      href={data.menu_buttons.sign_in_button.url}
                        className="flex w-[160px] border-[1.5px] border-[#9662FD] text-[#9662FD] rounded-[25px] py-[13px] font-[NeueHaasDisplayMedium] text-[16px] justify-center capitalize"
                      >
                        {data.menu_buttons.sign_in_button.title}
                      </Link>
                     )}
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
              <div
                ref={ctasRef}
                className="flex gap-[20px] items-center opacity-0 min-[320px]:max-[1200px]:hidden"
              >
                {data?.menu_buttons?.explore_button?.url && (
                <Link
                href={data.menu_buttons.explore_button.url}
                  className="flex w-[160px] bg-[#9662FD] text-white rounded-[25px] py-[13px] font-[NeueHaasDisplayMedium] text-[16px] justify-center capitalize"
                >
                  {data.menu_buttons.explore_button.title}
                </Link>
                 )}
                 {data?.menu_buttons?.sign_in_button?.url && (
                <Link
                href={data.menu_buttons.sign_in_button.url}
                  className="flex w-[160px] border-[1.5px] border-[#9662FD] text-[#9662FD] rounded-[25px] py-[13px] font-[NeueHaasDisplayMedium] text-[16px] justify-center capitalize"
                >
                  {data.menu_buttons.sign_in_button.title}
                </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
});

Header.displayName = "Header";
export default Header;
