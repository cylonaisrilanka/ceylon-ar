'use client';

import type { ReactNode, HTMLAttributes } from 'react';
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface ScrollAnimationWrapperProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  animationClassName?: string;
  threshold?: number;
  triggerOnce?: boolean;
}

export default function ScrollAnimationWrapper({
  children,
  className,
  animationClassName = 'scroll-animated-item',
  threshold = 0.1,
  triggerOnce = true,
  ...props
}: ScrollAnimationWrapperProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce && ref.current) {
            observer.unobserve(ref.current);
          }
        } else if (!triggerOnce) {
          // Optionally reset if it should animate every time it enters viewport
          // setIsVisible(false);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold, triggerOnce]);

  return (
    <div
      ref={ref}
      className={cn(animationClassName, isVisible && 'is-visible', className)}
      {...props}
    >
      {children}
    </div>
  );
}
