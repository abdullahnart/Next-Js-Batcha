"use client"
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Image from "next/image";

interface FundProgressProps {
    raised: number;
    goal: number;
}

const FundProgress = ({ raised = 0, goal = 100 }: FundProgressProps) => {
    const progressRef = useRef<HTMLDivElement>(null);
    const currentRef = useRef<HTMLSpanElement>(null);
    
    useEffect(() => {
        // Function to run the animation
        const runAnimation = () => {
            // First ensure we reset completely
            if (progressRef.current) {
                progressRef.current.style.width = "0%";
            }
            
            if (currentRef.current) {
                currentRef.current.textContent = "$0";
            }
            
            // Small delay to ensure the reset is visible
            setTimeout(() => {
                // Animate progress bar width from 0 to 100%
                gsap.to(progressRef.current, {
                    width: "100%",
                    duration: 2,
                    ease: "power2.out"
                });
                
                // Animate number counting from 0 to 100
                const obj = { val: 0 };
                gsap.to(obj, {
                    val: 100,
                    duration: 2,
                    ease: "power2.out",
                    onUpdate: () => {
                        if (currentRef.current) {
                            currentRef.current.textContent = `$${Math.round(obj.val)}`;
                        }
                    }
                });
            }, 50); // Small delay to ensure reset is processed
        };
        
        // Run animation immediately on first load
        runAnimation();
        
        // Set up interval to repeat the animation
        const intervalId = setInterval(runAnimation, 4000); // 4 seconds (2s animation + 2s pause)
        
        // Clean up interval on component unmount
        return () => clearInterval(intervalId);
    }, []);
    
    return (
        <div className="px-[10px] ">
            <div className="w-full h-[10px] bg-[#1E293B] rounded-[5px] overflow-hidden relative">
                <div
                    ref={progressRef}
                    className="h-full rounded-[10px]" // Removed transition-all for better GSAP control
                    style={{
                        width: "0%",
                        background: "linear-gradient(334.27deg, #FC3E70 -4.61%, #705DF2 112.9%)",
                    }}
                />
            </div>
            <div className="flex min-[320px]:max-[449px]:flex-col min-[320px]:max-[449px]:justify-center  justify-between items-center pt-[10px]">
                <div>
                    <p className="font-[NeueHaasDisplayRoman] text-[24px] text-white">
                        <span className="text-[#9562FD]" ref={currentRef}>$0</span> / <span>${goal}</span>
                    </p>
                </div>
                <div>
                    <ul className="flex items-center gap-[20px] ">
                        <li className="text-white text-[14px] font-[NeueHaasDisplayRoman] flex flex-col justify-center items-center">
                            <Image src="/assets/images/cash-bag.svg" alt="" width={28} height={28} />
                            9 days
                        </li>
                        <li className="text-white text-[14px] font-[NeueHaasDisplayRoman] flex flex-col justify-center items-center">
                            <Image src="/assets/images/video-icon.svg" alt="" width={28} height={28} />
                            2 days
                        </li>
                        <li className="text-white text-[14px] font-[NeueHaasDisplayRoman] flex flex-col justify-center items-center">
                            <Image src="/assets/images/eye-icon.svg" alt="" width={28} height={28} />
                            Unlimited
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default FundProgress;