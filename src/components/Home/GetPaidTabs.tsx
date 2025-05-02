import React, { useEffect, useRef, useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"
import { gsap } from "gsap"


interface HowItWorksSection {
    for_creators?:{
      creator_tabs?:{
        tab_5_counter?: number; 
      } 
    }
  }
  
  interface PageData {
    how_it_work_section?: HowItWorksSection;
  }

const GetPaidTabs = () => {

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


    const balanceRef = useRef(null);
    const earningsRef = useRef(null);
    
    useEffect(() => {
        // Function to animate counter from 0 to 1000
        const animateCounter = (ref:any) => {
            // Reset to 0
            if (ref.current) {
                ref.current.textContent = "$0";
            }
            
            // Animate from 0 to 1000
            const obj = { val: 0 };
            gsap.to(obj, {
                val: 1000,
                duration: 2,
                ease: "power2.out",
                onUpdate: () => {
                    if (ref.current) {
                        ref.current.textContent = `$${Math.round(obj.val)}`;
                    }
                }
            });
        };
        
        // Run initial animation for both tabs
        animateCounter(balanceRef);
        animateCounter(earningsRef);
        
        // Set up interval to repeat the animation every 4 seconds
        const intervalId = setInterval(() => {
            animateCounter(balanceRef);
            animateCounter(earningsRef);
        }, 4000);
        
        // Clean up
        return () => clearInterval(intervalId);
    }, []);
    
    return (
        <Tabs defaultValue="earnings" className="w-full  bg-[#111827] rounded-2xl ">
            <TabsList className="grid grid-cols-2 w-full bg-transparent  border-[#545B63] border-b ">
                <TabsTrigger
                    value="balance"
                    className=" outline-0 pb-[15px] font-[NeueHaasDisplayMedium] text-sm font-medium text-[#E0E7F1] data-[state=active]:text-[#9662FD] data-[state=active]:border-b-2 data-[state=active]:border-[#9662FD] transition-colors pointer-events-none"
                >
                    Balance
                </TabsTrigger>
                <TabsTrigger
                    value="earnings"
                    className=" outline-0 pb-[15px] font-[NeueHaasDisplayMedium] text-sm font-medium text-[#E0E7F1] data-[state=active]:text-[#9662FD] data-[state=active]:border-b-2 data-[state=active]:border-[#9662FD] transition-colors pointer-events-none"
                >
                    Earnings
                </TabsTrigger>
            </TabsList>

            <TabsContent value="balance" className="space-y-4">
                <div className="flex flex-col gap-[15px]">
                    <div className="border border-[#364155] bg-[#0F172C] rounded-[14px] p-5 flex flex-col justify-center items-center">
                        <h4 className="text-[#E0E7F1] text-[18px] font-[NeueHaasDisplayMedium]">Current:</h4>

                        <p className="text-[#9662FD] text-[26px] font-[NeueHaasDisplayMedium]" ref={balanceRef}>$1000</p>

                    </div>

                    <div className="bg-[#152034] border border-[#364155] rounded-[14px] p-5">
                        <div className="flex items-start gap-[10px]">
                            <div className="">

                                <Image src="/assets/images/info-icon.svg" alt="" width={20} height={20} />
                            </div>
                            <div className="">

                                <h4 className="text-[#E0E7F1] text-[14px] font-[NeueHaasDisplayMedium]">Info</h4>
                                <p className="text-[#E0E7F1] text-[14px] font-[NeueHaasDisplayMedium]">Minimum payout amount is $0</p>
                            </div>
                        </div>

                    </div>
                </div>
            </TabsContent>

            <TabsContent value="earnings" className="p-5">
                <div className="flex flex-col gap-[15px]">
                    <div className="border border-[#364155] bg-[#0F172C] rounded-[14px] p-5 flex flex-col justify-center items-center">
                        <h4 className="text-[#E0E7F1] text-[18px] font-[NeueHaasDisplayMedium]">Current:</h4>

                        <p className="text-[#9662FD] text-[26px] font-[NeueHaasDisplayMedium]" ref={earningsRef}>$1000</p>

                    </div>

                    <div className="bg-[#152034] border border-[#364155] rounded-[14px] p-5">
                        <div className="flex items-start gap-[10px]">
                            <div className="">

                                <Image src="/assets/images/info-icon.svg" alt="" width={20} height={20} />
                            </div>
                            <div className="">

                                <h4 className="text-[#E0E7F1] text-[14px] font-[NeueHaasDisplayMedium]">Info</h4>
                                <p className="text-[#E0E7F1] text-[14px] font-[NeueHaasDisplayMedium]">Minimum payout amount is $0</p>
                            </div>
                        </div>

                    </div>
                </div>
            </TabsContent>
        </Tabs>

    )
}

export default GetPaidTabs