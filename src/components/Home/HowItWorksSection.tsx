"use client";
import {
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { CreatorSlides } from "@/components/Home/CreatorSlides";
import { BackerSlides } from "@/components/Home/BackersSlides";
import {
  ScrollTriggerContext,
  ScrollTriggerContextType,
} from "@/context/ScrollTriggerContext";
import GradientShapes from "@/components/common/GradientShapes";
import Container from "@/components/common/Container";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}


interface HowItWorksSection {
  main_heading?: string;
  for_creators?:{
    for_creators_heading: string;
    create_trailer_heading: string;
    raise_funds_heading: string;
    upload_final_video_heading: string;
    voting_results_heading: string;
    get_paid_heading: string;
    creators_banner_image: string;
  }
}

interface PageData {
  how_it_work_section?: HowItWorksSection;
}


type ViewType = "creators" | "backers";

const debounce = (func: (...args: any[]) => void, wait: number) => {
  let timeout: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

const HowItWorksSection = () => {

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

  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const sliderNavRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedView, setSelectedView] = useState<ViewType>("creators");
  const [isAnimating, setIsAnimating] = useState(false);
  const scrollTriggersRef = useRef<ScrollTrigger[]>([]);
  // Use useRef to persist context state without re-rendering
  const scrollTriggerContext = useRef<ScrollTriggerContextType>({
    mainInstance: null,
    isMainActive: false,
  }).current;

  const creatorLabels = [
    "Create Trailer",
    "Raise Funds",
    "Upload Final Video",
    "Voting Results",
    "Get Paid",
  ];
  const backerLabels = [
    "Explore Trailers",
    "Back It",
    "Watch Final Video",
    "Vote",
  ];
  const navLabels = selectedView === "creators" ? creatorLabels : backerLabels;

  const handleViewSelection = (view: ViewType) => {
    if (selectedView !== view && !isAnimating) {
      setIsAnimating(true);
      setSelectedView(view);
      cleanupScrollTriggers();
      setTimeout(() => {
        setIsAnimating(false);
        setupScrollAnimation();
      }, 500);
    }
  };

  const cleanupScrollTriggers = () => {
    if (scrollTriggersRef.current.length > 0) {
      scrollTriggersRef.current.forEach((trigger) => {
        if (trigger) trigger.kill();
      });
      scrollTriggersRef.current = [];
    }
    if (containerRef.current) {
      gsap.set(containerRef.current, { clearProps: "all" });
      gsap.set(containerRef.current.querySelectorAll(".box"), {
        clearProps: "all",
      });
    }
    scrollTriggerContext.mainInstance = null;
    scrollTriggerContext.isMainActive = false;
    ScrollTrigger.refresh(true);
  };

  const setupScrollAnimation = () => {
    if (!containerRef.current || isAnimating) return;

    gsap.set(containerRef.current, { clearProps: "all" });
    ScrollTrigger.refresh(true);

    const boxes = gsap.utils.toArray<HTMLElement>(".box", containerRef.current);
    if (boxes.length === 0) return;

    boxes.forEach((box) => {
      gsap.set(box, { width: "100vw", minHeight: "100vh", flexShrink: 0 });
    });

    const totalWidth = boxes.reduce((sum, box) => sum + box.offsetWidth, 0);

    const animation = gsap.to(boxes, {
      xPercent: -100 * (boxes.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        pinSpacing: true,
        scrub: 3,
        snap: 1 / (boxes.length - 1),
        start: "top top",
        end: `+=${totalWidth + window.innerHeight}`,
        invalidateOnRefresh: true,
        refreshPriority: 10,
        markers: false,
        onUpdate: (self) => {
          const newIndex = Math.round(self.progress * (boxes.length - 1));
          setActiveIndex(newIndex);
          boxes.forEach((box, index) => {
            gsap.set(box, { opacity: index === newIndex ? 1 : 0.3 });
          });
        },
        onEnter: () => {
          scrollTriggerContext.isMainActive = true;
        },
        onLeave: () => {
          scrollTriggerContext.isMainActive = false;
        },
        onEnterBack: () => {
          scrollTriggerContext.isMainActive = true;
        },
        onLeaveBack: () => {
          scrollTriggerContext.isMainActive = false;
        },
      },
    });

    if (animation.scrollTrigger) {
      scrollTriggersRef.current.push(animation.scrollTrigger);
      scrollTriggerContext.mainInstance = animation.scrollTrigger;
    }
  };

  const handleResize = useCallback(
    debounce(() => {
      ScrollTrigger.refresh(true);
    }, 100),
    []
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setupScrollAnimation();
    }, 1000);

    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(timeoutId);
      cleanupScrollTriggers();
      window.removeEventListener("resize", handleResize);
    };
  }, [selectedView, handleResize]);

  const shouldShowArrow = (index: number, viewType: ViewType): boolean => {
    if (viewType === "creators") {
      return index !== 4;
    } else if (viewType === "backers") {
      return index !== 3;
    }
    return true;
  };
  const getArrowImageForIndex = (
    index: number,
    viewType: ViewType,
    isActive: boolean
  ): string | null => {
    if (!shouldShowArrow(index, viewType)) {
      return null;
    }
    if (!isActive) {
      return "/assets/images/not-active.svg";
    }
    if (viewType === "creators") {
      switch (index) {
        case 0:
          return "/assets/images/blue-arrow.svg";
        case 1:
          return "/assets/images/red-arrow.svg";
        case 2:
          return "/assets/images/purple-arrow.svg";
        case 3:
          return "/assets/images/green-arrow.svg";
        default:
          return "/assets/images/blue-arrow.svg";
      }
    } else {
      switch (index) {
        case 0:
          return "/assets/images/blue-arrow.svg";
        case 1:
          return "/assets/images/red-arrow.svg";
        case 2:
          return "/assets/images/purple-arrow.svg";
        case 3:
          return "/assets/images/green-arrow.svg";
        default:
          return "/assets/images/blue-arrow.svg";
      }
    }
  };

  const renderNavItems = () => (
    <ul className="flex flex-col gap-4">
      {/* Item 1 */}

      {data?.how_it_work_section?.for_creators?.create_trailer_heading && (
      <li
        className={`min-[1200px]:max-[1280px]:hidden min-[1200px]:max-[1400px]:text-[20px] min-[1200px]:max-[1400px]:gap-2 min-[1400px]:max-[1500px]:text-[25px] inline-flex items-center gap-3 font-[NeueHaasDisplayRoman] text-[30px] ${
          activeIndex === 1 ? "text-white" : "text-[#FFFFFF1A]"
        } transition-all px-4 py-3 rounded`}
      >
        <span className="font-medium">{data.how_it_work_section.for_creators.create_trailer_heading}</span>
        {getArrowImageForIndex(0, selectedView, activeIndex === 1) && (
          <div className="flex-shrink-0">
            <Image
              src={getArrowImageForIndex(0, selectedView, activeIndex === 1)}
              alt=""
              width={48}
              height={35}
              className="w-[48px] h-[35px]"
            />
          </div>
        )}
      </li>
      )}
      {/* Item 2 */}
      {data?.how_it_work_section?.for_creators?.raise_funds_heading && (
      <li
        className={`min-[1200px]:max-[1280px]:hidden min-[1200px]:max-[1400px]:text-[20px] min-[1200px]:max-[1400px]:gap-2 min-[1400px]:max-[1500px]:text-[25px] inline-flex items-center gap-3 font-[NeueHaasDisplayRoman] text-[30px] ${
          activeIndex === 2 ? "text-white" : "text-[#FFFFFF1A]"
        } transition-all px-4 py-3 rounded`}
      >
         <span className="font-medium">{data.how_it_work_section.for_creators.raise_funds_heading}</span>
        {getArrowImageForIndex(1, selectedView, activeIndex === 2) && (
          <div className="flex-shrink-0">
            
            <Image
              src={getArrowImageForIndex(1, selectedView, activeIndex === 2)}
              alt=""
              width={48}
              height={35}
              className="w-[48px] h-[35px]"
            />
          </div>
        )}
      </li>
      )}
  
      {/* Item 3 */}
      {data?.how_it_work_section?.for_creators?.upload_final_video_heading && (
      <li
        className={`min-[1200px]:max-[1280px]:hidden min-[1200px]:max-[1400px]:text-[20px] min-[1200px]:max-[1400px]:gap-2 min-[1400px]:max-[1500px]:text-[25px] inline-flex items-center gap-3 font-[NeueHaasDisplayRoman] text-[30px] ${
          activeIndex === 3 ? "text-white" : "text-[#FFFFFF1A]"
        } transition-all px-4 py-3 rounded`}
      >
        <span className="font-medium">{data.how_it_work_section.for_creators.upload_final_video_heading}</span>
        {getArrowImageForIndex(2, selectedView, activeIndex === 3) && (
          <div className="flex-shrink-0">
            <Image
              src={getArrowImageForIndex(2, selectedView, activeIndex === 3)}
              alt=""
              width={48}
              height={35}
              className="w-[48px] h-[35px]"
            />
          </div>
        )}
      </li>
      )}
      {/* Item 4 */}
      {data?.how_it_work_section?.for_creators?.voting_results_heading && (
      <li
        className={`min-[1200px]:max-[1280px]:hidden min-[1200px]:max-[1400px]:text-[20px] min-[1200px]:max-[1400px]:gap-2 min-[1400px]:max-[1500px]:text-[25px] inline-flex items-center gap-3 font-[NeueHaasDisplayRoman] text-[30px] ${
          activeIndex === 4 ? "text-white" : "text-[#FFFFFF1A]"
        } transition-all px-4 py-3 rounded`}
      >
         <span className="font-medium">{data.how_it_work_section.for_creators.voting_results_heading}</span>
        {getArrowImageForIndex(3, selectedView, activeIndex === 4) && (
          <div className="flex-shrink-0">
            <Image
              src={getArrowImageForIndex(3, selectedView, activeIndex === 4)}
              alt=""
              width={48}
              height={35}
              className="w-[48px] h-[35px]"
            />
          </div>
        )}
      </li>
      )}
  
      {/* Item 5 */}
      {data?.how_it_work_section?.for_creators?.get_paid_heading && (
      <li
        className={`min-[1200px]:max-[1280px]:hidden min-[1200px]:max-[1400px]:text-[20px] min-[1200px]:max-[1400px]:gap-2 min-[1400px]:max-[1500px]:text-[25px] inline-flex items-center gap-3 font-[NeueHaasDisplayRoman] text-[30px] ${
          activeIndex === 5 ? "text-white" : "text-[#FFFFFF1A]"
        } transition-all px-4 py-3 rounded`}
      >
         <span className="font-medium">{data.how_it_work_section.for_creators.get_paid_heading}</span>
        {getArrowImageForIndex(4, selectedView, activeIndex === 5) && (
          <div className="flex-shrink-0">
            <Image
              src={getArrowImageForIndex(4, selectedView, activeIndex === 5)}
              alt=""
              width={48}
              height={35}
              className="w-[48px] h-[35px]"
            />
          </div>
        )}
      </li>
      )}
    </ul>
  );

  return (
    <ScrollTriggerContext.Provider value={scrollTriggerContext}>
      <section
        ref={sectionRef}
        className="bg-[#0B151F] relative z-10 min-h-screen"
      >
        <div className="relative min-h-screen">
          <div
            className="container-scroll relative min-h-screen w-full"
            ref={containerRef}
          >
            <GradientShapes />
            <div className="box hero-section min-h-screen w-screen flex flex-col items-center justify-center">
              <Container>
                  <div className="w-full">
                    {data?.how_it_work_section?.main_heading && (
                    <h1 className="text-center mb-8 bg-[linear-gradient(334.27deg,_#FC3E70_-4.61%,_#705DF2_112.9%)] bg-clip-text text-transparent text-4xl font-[NeueHaasDisplay75Bold]">
                      {data.how_it_work_section.main_heading}
                    </h1>
                    )}

                    <div className="flex justify-center gap-8 mb-8">
                    {data?.how_it_work_section?.for_creators?.for_creators_heading && (
                      <button
                        onClick={() => handleViewSelection("creators")}
                        className={`px-6 py-3 cursor-pointer ${
                          selectedView === "creators"
                            ? "text-white underline decoration-[#9662FD] underline-offset-[25px]"
                            : "text-[#FFFFFF66]"
                        } transition-colors font-[NeueHaasDisplayRoman] text-[25px]`}
                        disabled={isAnimating}
                      >
                        {data.how_it_work_section.for_creators.for_creators_heading}
                      </button>
                    )}
                    {data?.how_it_work_section?.for_backers?.for_backers_heading && (
                      <button
                        onClick={() => handleViewSelection("backers")}
                        className={`px-6 py-3 cursor-pointer ${
                          selectedView === "backers"
                            ? "text-white underline decoration-[#9662FD] underline-offset-[25px]"
                            : "text-[#FFFFFF66]"
                        } transition-colors font-[NeueHaasDisplayRoman] text-[25px]`}
                        disabled={isAnimating}
                      >
                        {data.how_it_work_section.for_backers.for_backers_heading}
                      </button>
                    )}
                    </div>
                    {selectedView === "creators" && (
                      <div className="text-center ">
                        <ul className="flex items-center justify-center gap-y-0 gap-6 flex-wrap text-white font-medium text-[17px]">
                        {data?.how_it_work_section?.for_creators?.create_trailer_heading && (
                          <li className="flex items-center gap-[20px] font-[NeueHaasDisplayRoman] text-[40px] text-white">
                            {data.how_it_work_section.for_creators.create_trailer_heading}
                            <Image
                              src="/assets/images/blue-arrow.svg"
                              alt=""
                              width={48}
                              height={35}
                            />
                          </li>
                        )}
                        {data?.how_it_work_section?.for_creators?.raise_funds_heading && (
                          <li className="flex items-center gap-[20px] font-[NeueHaasDisplayRoman] text-[40px] text-white">
                            {data.how_it_work_section.for_creators.raise_funds_heading}
                            <Image
                              src="/assets/images/red-arrow.svg"
                              alt=""
                              width={48}
                              height={35}
                            />
                          </li>
                        )}
                        {data?.how_it_work_section?.for_creators?.upload_final_video_heading && (
                          <li className="flex items-center gap-[20px] font-[NeueHaasDisplayRoman] text-[40px] text-white">
                            {data.how_it_work_section.for_creators.upload_final_video_heading}
                            <Image
                              src="/assets/images/purple-arrow.svg"
                              alt=""
                              width={48}
                              height={35}
                            />
                          </li>
                        )}
                        {data?.how_it_work_section?.for_creators?.voting_results_heading && (
                          <li className="flex items-center gap-[20px] font-[NeueHaasDisplayRoman] text-[40px] text-white">
                            {data.how_it_work_section.for_creators.voting_results_heading}
                            <Image
                              src="/assets/images/green-arrow.svg"
                              alt=""
                              width={48}
                              height={35}
                            />
                          </li>
                        )}
                        {data?.how_it_work_section?.for_creators?.get_paid_heading && (
                          <li className="flex items-center gap-[20px] font-[NeueHaasDisplayRoman] text-[40px] text-white">
                            {data.how_it_work_section.for_creators.get_paid_heading}
                          </li>
                        )}
                        </ul>
                        <div className="py-[40px]">
                          <Image
                            src={data?.how_it_work_section?.for_creators?.creators_banner_image ?? '/default.jpg'}
                            alt=""
                            width={1019}
                            height={331}
                            className="w-full  min-[1500px]:max-[1600px]:w-[85%] min-[1524px]:max-[1600px]:mx-auto"
                            unoptimized
                          />
                        </div>
                      </div>
                    )}
                    {selectedView === "backers" && (
                      <div className="text-center ">
                        <ul className="flex items-center justify-center gap-y-0 gap-6 flex-wrap text-white font-medium text-[17px]">
                        {data?.how_it_work_section?.for_backers?.explore_trailers_heading && (
                          <li className="flex items-center gap-[20px] font-[NeueHaasDisplayRoman] text-[40px] text-white">
                           {data.how_it_work_section.for_backers.explore_trailers_heading}
                            <Image
                              src="/assets/images/blue-arrow.svg"
                              alt=""
                              width={48}
                              height={35}
                            />
                          </li>
                        )}
                        {data?.how_it_work_section?.for_backers?.back_it_heading && (
                          <li className="flex items-center gap-[20px] font-[NeueHaasDisplayRoman] text-[40px] text-white">
                           {data.how_it_work_section.for_backers.back_it_heading}
                            <Image
                              src="/assets/images/red-arrow.svg"
                              alt=""
                              width={48}
                              height={35}
                            />
                          </li>
                        )}
                        {data?.how_it_work_section?.for_backers?.watch_final_video_heading && (
                          <li className="flex items-center gap-[20px] font-[NeueHaasDisplayRoman] text-[40px] text-white">
                           {data.how_it_work_section.for_backers.watch_final_video_heading}
                            <Image
                              src="/assets/images/purple-arrow.svg"
                              alt=""
                              width={48}
                              height={35}
                            />
                          </li>
                        )}
                        {data?.how_it_work_section?.for_backers?.vote_heading && (
                          <li className="flex items-center gap-[20px] font-[NeueHaasDisplayRoman] text-[40px] text-white">
                           {data.how_it_work_section.for_backers.vote_heading}
                          </li>
                        )}
                        </ul>
                        <div className="py-[40px]">
                          <Image
                            src={data?.how_it_work_section?.for_backers?.backers_banner_image ?? '/default.jpg'}
                            alt=""
                            width={1237}
                            height={370}
                            unoptimized
                            className="w-full  min-[1500px]:max-[1600px]:w-[85%] min-[1524px]:max-[1600px]:mx-auto"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                
              </Container>
            </div>
            {selectedView === "creators" ? <CreatorSlides/> : <BackerSlides/>}
            <div
              ref={sliderNavRef}
              className={`slider-nav absolute left-[3%] top-1/2 transform -translate-y-1/2 z-20 transition-opacity duration-300 ${
                activeIndex === 0
                  ? "opacity-0 pointer-events-none"
                  : "opacity-100"
              }`}
            >
              {renderNavItems()}
            </div>
          </div>
        </div>
      </section>
    </ScrollTriggerContext.Provider>
  );
};

export default HowItWorksSection;
