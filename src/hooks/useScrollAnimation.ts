"use client";

import { useEffect, useRef } from 'react';

export type Direction = 'top' | 'right' | 'bottom' | 'left';

// Add a generic type parameter T that extends HTMLElement or null
export default function useScrollAnimation<T extends HTMLElement | null>(
  direction: Direction = 'left',
  delay: number = 0
) {
  // Type the ref with the generic T
  const ref = useRef<T>(null);

  useEffect(() => {
    // Dynamic import to avoid SSR issues
    const setupAnimation = async () => {
      // Only run on client side
      if (typeof window === 'undefined' || !ref.current) return;

      // Dynamically import GSAP
      const gsapModule = await import('gsap');
      const gsap = gsapModule.default;

      // Dynamically import ScrollTrigger
      const ScrollTriggerModule = await import('gsap/dist/ScrollTrigger');
      const ScrollTrigger = ScrollTriggerModule.ScrollTrigger;

      // Register plugin
      gsap.registerPlugin(ScrollTrigger);

      const element = ref.current;

      // Determine starting position
      let x = 0;
      let y = 0;

      switch (direction) {
        case 'left':
          x = -800;
          break;
        case 'right':
          x = 800;
          break;
        case 'top':
          y = -100;
          break;
        case 'bottom':
          y = 100;
          break;
      }

      // Set initial state immediately
      gsap.set(element, {
        x,
        y,
        opacity: 0,
        scale: 0.9,
      });

      // Create the animation timeline
      const tl = gsap.timeline();

      // Add animation to the timeline with delay from props
      tl.to(element, {
        x: 0,
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 3.5,
        ease: 'power2.out',
        delay: delay,
      });

      // Create ScrollTrigger
      const scrollTrigger = ScrollTrigger.create({
        trigger: element,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 4,
        animation: tl,
        markers: false,
        toggleActions: 'play none none reverse',
        // invalidateOnRefresh: true,
        refreshPriority: 1,
      });

      // Force a refresh of ScrollTrigger on window resize
      const resizeObserver = new ResizeObserver(() => {
        setTimeout(() => {
          ScrollTrigger.refresh();
        }, 100);
      });

      if (element) {
        resizeObserver.observe(element);
      }

      // Add an event listener for when the page becomes visible again
      const handleVisibilityChange = () => {
        if (document.visibilityState === 'visible') {
          setTimeout(() => {
            ScrollTrigger.refresh();
          }, 300);
        }
      };

      document.addEventListener('visibilitychange', handleVisibilityChange);

      // Return cleanup function
      return () => {
        if (scrollTrigger) scrollTrigger.kill();
        if (tl) tl.kill();
        if (element) resizeObserver.unobserve(element);
        resizeObserver.disconnect();
        document.removeEventListener('visibilitychange', handleVisibilityChange);
      };
    };

    let cleanupFn: (() => void) | undefined;

    setupAnimation().then((fn) => {
      cleanupFn = fn;
    });

    // Cleanup on unmount
    return () => {
      if (cleanupFn) cleanupFn();
    };
  }, [direction, delay]);

  return ref;
}