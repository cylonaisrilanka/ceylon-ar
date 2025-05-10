
'use client';

import type { CSSProperties } from 'react';
import { useState, useEffect, useRef, useCallback } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  char: string;
  color: string;
  speed: number;
  fontSize: number;
}

const CHARACTERS = ['0', '1'];
const MIN_SPEED = 0.7; // Slightly faster min
const MAX_SPEED = 3.0; // Slightly faster max
const MIN_FONT_SIZE = 12; // Slightly larger min
const MAX_FONT_SIZE = 24; // Slightly larger max
const PARTICLES_DENSITY_FACTOR = 30; // Increased density

const BinaryRainBackground = () => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [themeColors, setThemeColors] = useState<string[]>([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const computedStyle = getComputedStyle(document.documentElement);
      const primaryColor = computedStyle.getPropertyValue('--primary').trim();
      const accentColor = computedStyle.getPropertyValue('--accent').trim();
      const foregroundColor = computedStyle.getPropertyValue('--foreground').trim();
      const mutedForegroundColor = computedStyle.getPropertyValue('--muted-foreground').trim();
      const chart1Color = computedStyle.getPropertyValue('--chart-1').trim();
      const chart2Color = computedStyle.getPropertyValue('--chart-2').trim();
      const chart3Color = computedStyle.getPropertyValue('--chart-3').trim();
      const chart4Color = computedStyle.getPropertyValue('--chart-4').trim();
      
      const formatHSL = (hslString: string) => `hsl(${hslString})`;
      const formatHSLA = (hslString: string, alpha: number) => `hsla(${hslString}, ${alpha})`;

      setThemeColors([
        formatHSL(primaryColor),             // Solid Purple
        formatHSL(accentColor),              // Solid Pink
        formatHSLA(mutedForegroundColor, 0.7),// Muted Gray with Alpha
        formatHSLA(primaryColor, 0.6),       // Purple with Alpha
        formatHSLA(accentColor, 0.6),        // Pink with Alpha
        formatHSLA(foregroundColor, 0.3),   // Faint white/foreground particles
        formatHSL(chart1Color),              // Bright Cyan
        formatHSL(chart2Color),              // Bright Green
        formatHSLA(chart3Color, 0.7),        // Bright Yellow/Orange with Alpha
        formatHSLA(chart4Color, 0.8),        // Bright Lavender with Alpha
      ]);
    }
  }, []);

  const createParticle = useCallback((id: number, currentWidth: number, currentHeight: number): Particle => {
    const char = CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
    const color = themeColors.length > 0 ? themeColors[Math.floor(Math.random() * themeColors.length)] : `hsl(var(--foreground))`;
    const speed = Math.random() * (MAX_SPEED - MIN_SPEED) + MIN_SPEED;
    const fontSize = Math.floor(Math.random() * (MAX_FONT_SIZE - MIN_FONT_SIZE + 1)) + MIN_FONT_SIZE;
    return {
      id,
      x: Math.random() * currentWidth,
      y: Math.random() * currentHeight - currentHeight, // Start some off-screen from top
      char,
      color,
      speed,
      fontSize,
    };
  }, [themeColors]);
  
  const resetParticle = useCallback((particle: Particle, currentWidth: number, _currentHeight: number): Particle => {
    const char = CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
    const color = themeColors.length > 0 ? themeColors[Math.floor(Math.random() * themeColors.length)] : `hsl(var(--foreground))`;
    const speed = Math.random() * (MAX_SPEED - MIN_SPEED) + MIN_SPEED;
    const fontSize = Math.floor(Math.random() * (MAX_FONT_SIZE - MIN_FONT_SIZE + 1)) + MIN_FONT_SIZE;
    return {
      ...particle,
      x: Math.random() * currentWidth,
      y: -fontSize * 2, // Reset further above the screen
      char,
      color,
      speed,
      fontSize,
    };
  }, [themeColors]);

  useEffect(() => {
    const updateDimensions = () => {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;
      if (newWidth !== dimensions.width || newHeight !== dimensions.height) {
        setDimensions({ width: newWidth, height: newHeight });
      }
    };

    updateDimensions(); 
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, [dimensions.width, dimensions.height]); 
  
  useEffect(() => {
    if (dimensions.width === 0 || dimensions.height === 0 || themeColors.length === 0) {
      setParticles([]); 
      return;
    }

    const numParticles = Math.floor((dimensions.width / PARTICLES_DENSITY_FACTOR) * (dimensions.height / PARTICLES_DENSITY_FACTOR) * (PARTICLES_DENSITY_FACTOR / 10)); // Adjusted calculation for density
    
    setParticles(prevParticles => {
        const updatedParticles = Array(numParticles).fill(null).map((_, i) => {
            const existingParticle = prevParticles.find(p => p.id === i);
            if (existingParticle) {
                // Check if particle is out of bounds for re-initialization, to avoid sudden disappearance on resize
                if (existingParticle.x > dimensions.width || existingParticle.x < 0) {
                    return createParticle(i, dimensions.width, dimensions.height); // Recreate if x is out of bounds
                }
                return { 
                    ...existingParticle,
                 };
            }
            return createParticle(i, dimensions.width, dimensions.height);
        });
        return updatedParticles.slice(0, numParticles); 
    });

  }, [dimensions, themeColors, createParticle, resetParticle]);


  useEffect(() => {
    if (particles.length === 0 || dimensions.width === 0 || dimensions.height === 0) return;

    let animationFrameId: number;
    const animate = () => {
      setParticles(currentParticles =>
        currentParticles.map(p => {
          let newY = p.y + p.speed;
          if (newY > dimensions.height + p.fontSize * 2) { // Ensure it's well off screen before reset
            return resetParticle(p, dimensions.width, dimensions.height);
          }
          return { ...p, y: newY };
        })
      );
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [particles, dimensions, resetParticle]); 

  if (themeColors.length === 0 || dimensions.width === 0) {
    return null;
  }

  return (
    <div
      ref={containerRef} 
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {particles.map(p => (
        <span
          key={p.id}
          className="absolute"
          style={{
            left: `${p.x}px`,
            top: `${p.y}px`,
            color: p.color,
            fontSize: `${p.fontSize}px`,
            fontFamily: 'monospace', 
            textShadow: `0 0 5px ${p.color}, 0 0 10px ${p.color.replace('hsl(', 'hsla(').replace(')', ', 0.6)')}`, // Enhanced glow
            opacity: p.fontSize / MAX_FONT_SIZE * 0.6 + 0.4, // Opacity range: 0.4 to 1.0 for more vividness
            userSelect: 'none',
          } as CSSProperties}
        >
          {p.char}
        </span>
      ))}
    </div>
  );
};

export default BinaryRainBackground;
