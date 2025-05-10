import type { SVGProps } from 'react';
import { cn } from '@/lib/utils';

export default function HeroGraphic({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("w-full h-full", className)}
      {...props}
    >
      <defs>
        <radialGradient id="heroGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
          <stop offset="0%" style={{ stopColor: 'hsl(var(--accent))', stopOpacity: 0.8 }} />
          <stop offset="60%" style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 0.6 }} />
          <stop offset="100%" style={{ stopColor: 'hsl(var(--background))', stopOpacity: 0.1 }} />
        </radialGradient>
        <filter id="heroGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="5" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
         <linearGradient id="lineGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{stopColor: 'hsl(var(--primary))', stopOpacity: 1}} />
            <stop offset="100%" style={{stopColor: 'hsl(var(--accent))', stopOpacity: 1}} />
        </linearGradient>
         <linearGradient id="lineGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{stopColor: 'hsl(var(--accent))', stopOpacity: 1}} />
            <stop offset="100%" style={{stopColor: 'hsl(var(--primary))', stopOpacity: 1}} />
        </linearGradient>
      </defs>
      
      <circle cx="100" cy="100" r="70" fill="url(#heroGradient)" filter="url(#heroGlow)">
        <animate attributeName="r" from="65" to="75" dur="3s" repeatCount="indefinite" begin="0s" calcMode="spline" keyTimes="0; 0.5; 1" values="70;75;70" keySplines="0.42 0 0.58 1;0.42 0 0.58 1"/>
        <animate attributeName="opacity" from="0.7" to="1" dur="3s" repeatCount="indefinite" begin="0s" calcMode="spline" keyTimes="0; 0.5; 1" values="0.8;1;0.8" keySplines="0.42 0 0.58 1;0.42 0 0.58 1"/>
      </circle>

      {[...Array(6)].map((_, i) => (
        <circle
          key={`ring-${i}`}
          cx="100"
          cy="100"
          r_base={80 + i * 8}
          fill="none"
          stroke={`hsl(var(--${i % 2 === 0 ? 'primary' : 'accent'}))`}
          strokeWidth="1.5"
          opacity_base={0.3 - i * 0.04}
        >
          <animate attributeName="r" dur={`${6 + i}s`} values={`${80 + i * 8}px; ${85 + i * 10}px; ${80 + i * 8}px`} repeatCount="indefinite" />
          <animate attributeName="opacity" dur={`${5 + i}s`} values={`${0.3 - i * 0.04}; ${0.5 - i * 0.04}; ${0.3 - i * 0.04}`} repeatCount="indefinite" />
        </circle>
      ))}

      <path d="M60 100 A40 40 0 0 1 140 100" stroke="url(#lineGrad1)" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.7">
        <animateTransform attributeName="transform" type="rotate" from="0 100 100" to="360 100 100" dur="15s" repeatCount="indefinite" />
      </path>
      <path d="M100 60 A40 40 0 0 1 100 140" stroke="url(#lineGrad2)" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.7">
        <animateTransform attributeName="transform" type="rotate" from="0 100 100" to="-360 100 100" dur="18s" repeatCount="indefinite" />
      </path>
       <circle cx="100" cy="100" r="30" fill="transparent" stroke="hsl(var(--foreground))" strokeWidth="1" strokeDasharray="3 3" opacity="0.2">
        <animateTransform attributeName="transform" type="rotate" from="360 100 100" to="0 100 100" dur="30s" repeatCount="indefinite"/>
      </circle>
      
      {/* Added Text Element */}
      <text 
        x="100" 
        y="100" 
        textAnchor="middle" 
        dominantBaseline="central" 
        fontSize="14" 
        fontWeight="bold" 
        fill="hsl(var(--foreground))"
        style={{ textShadow: '0px 0px 5px hsl(var(--primary)), 0px 0px 10px hsl(var(--accent))' }}
      >
        13+ project completed
      </text>
    </svg>
  );
}

