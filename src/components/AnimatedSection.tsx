"use client";

import React from 'react';
import useScrollAnimation, { Direction } from '@/hooks/useScrollAnimation';

interface Props {
  children: React.ReactNode;
  direction?: Direction;
  delay?: number;
  className?: string;
}

export default function AnimatedSection({ 
  children, 
  direction = 'left',
  delay = 0,
  className = '' 
}: Props) {
  const ref = useScrollAnimation<HTMLDivElement | null>(direction, delay);
  
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}