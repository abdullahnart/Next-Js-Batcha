"use client";

import {
  useCallback,
  ReactNode,
  ButtonHTMLAttributes,
  useEffect,
  useState,
} from "react";
import { FaArrowUp } from "react-icons/fa6";
import clsx from "clsx"; // Optional: for class merging (or just use template literals)

// Type for scroll behavior options
type ScrollBehavior = "auto" | "smooth" | "custom";

interface ScrollToTopOptions {
  behavior?: ScrollBehavior;
  duration?: number;
}

/**
 * Custom hook that provides a function to scroll to the top of the viewport
 * @param options - Scroll behavior options
 * @returns Function to trigger scrolling to top
 */
export const useScrollToTop = (options: ScrollToTopOptions = {}) => {
  const { behavior = "smooth", duration = 600 } = options;

  const scrollToTop = useCallback(() => {
    if (typeof window !== "undefined") {
      if (behavior === "smooth" || behavior === "auto") {
        window.scrollTo({
          top: 0,
          behavior: behavior,
        });
      } else if (behavior === "custom") {
        const startPosition = window.pageYOffset;
        const startTime = performance.now();

        const animateScroll = (currentTime: number) => {
          const elapsedTime = currentTime - startTime;
          const progress = Math.min(elapsedTime / duration, 1);
          const easeOutCubic = 1 - Math.pow(1 - progress, 3);

          window.scrollTo(0, startPosition * (1 - easeOutCubic));

          if (progress < 1) {
            window.requestAnimationFrame(animateScroll);
          }
        };

        window.requestAnimationFrame(animateScroll);
      }
    }
  }, [behavior, duration]);

  return scrollToTop;
};

interface ScrollToTopButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
 
}

/**
 * ScrollToTop component that renders a button to scroll to the top
 */
export const ScrollToTopButton = ({
 
  ...props
}: ScrollToTopButtonProps) => {
  const scrollToTop = useScrollToTop();
  

  return (
    <button
      onClick={scrollToTop}
      type="button"
      aria-label="Scroll to top"
      className="cursor-pointer min-[320px]:max-[1200px]:right-[20px] absolute top-[20px] right-[80px] w-[40px] h-[40px] rounded-full flex justify-center items-center bg-[linear-gradient(334.27deg,_#FC3E70_-4.61%,_#705DF2_112.9%)]"
      {...props}
    >
      <FaArrowUp />
    </button>
  );
};
