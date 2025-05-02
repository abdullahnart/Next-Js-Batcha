import { createContext, useContext } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export interface ScrollTriggerContextType {
  mainInstance: ScrollTrigger | null;
  isMainActive: boolean;
}

export const ScrollTriggerContext = createContext<ScrollTriggerContextType>({
  mainInstance: null,
  isMainActive: false,
});

export const useScrollTriggerContext = () => useContext(ScrollTriggerContext);