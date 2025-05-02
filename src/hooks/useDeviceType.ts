'use client';

import { useEffect, useState } from 'react';

// Device types
type DeviceType = 'mobile' | 'desktop';

// Breakpoint configuration
interface BreakpointConfig {
  mobileMin: number; // Min width for mobile (e.g., 320)
  mobileMax: number; // Max width for mobile (e.g., 1199)
}

// Hook to determine device type based on customizable range
export function useDeviceType({ mobileMin, mobileMax }: BreakpointConfig) {
  const [deviceType, setDeviceType] = useState<DeviceType>('mobile');

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = () => {
      const width = window.innerWidth;
      setDeviceType(width >= mobileMin && width <= mobileMax ? 'mobile' : 'desktop');
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [mobileMin, mobileMax]);

  return {
    deviceType,
    isMobile: deviceType === 'mobile',
    isDesktop: deviceType === 'desktop',
  };
}