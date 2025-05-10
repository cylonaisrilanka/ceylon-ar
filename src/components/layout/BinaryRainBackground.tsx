
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
const MIN_SPEED = 0.5;
const MAX_SPEED = 2.5; 
const MIN_FONT_SIZE = 10;
const MAX_FONT_SIZE = 22; 
const PARTICLES_DENSITY_FACTOR = 25; 

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
      
      const formatHSL = (hslString: string) => `hsl(${hslString})`;
      const formatHSLA = (hslString: string, alpha: number) => `hsla(${hslString}, ${alpha})`;

      setThemeColors([
        formatHSL(primaryColor),             // Solid Purple
        formatHSL(accentColor),              // Solid Pink
        formatHSLA(mutedForegroundColor, 0.7),// Muted Gray with Alpha (good for contrast)
        formatHSLA(primaryColor, 0.5),       // Purple with Alpha (more subtle)
        formatHSLA(accentColor, 0.5),        // Pink with Alpha (more subtle)
        formatHSLA(foregroundColor, 0.25),   // Very faint white/foreground particles (low alpha)
        formatHSL(chart1Color),              // Bright Cyan
        formatHSLA(chart2Color, 0.6),        // Bright Green with Alpha
      ]);
    }
  }, []);

  const createParticle = useCallback((id: number, currentWidth: number, currentHeight: number): Particle => {
    const char = CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
    const color = themeColors.length > 0 ? themeColors[Math.floor(Math.random() * themeColors.length)] : `hsl(var(--foreground))`;
    const speed = Math.random() * (MAX_SPEED - MIN_SPEED) + MIN_SPEED;
    const fontSize = Math.random() * (MAX_FONT_SIZE - MIN_FONT_SIZE) + MIN_FONT_SIZE;
    return {
      id,
      x: Math.random() * currentWidth,
      y: Math.random() * currentHeight, 
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
    const fontSize = Math.random() * (MAX_FONT_SIZE - MIN_FONT_SIZE) + MIN_FONT_SIZE;
    return {
      ...particle,
      x: Math.random() * currentWidth,
      y: -fontSize, 
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

    const numParticles = Math.floor((dimensions.width * dimensions.height / 10000) * PARTICLES_DENSITY_FACTOR);
    
    setParticles(prevParticles => {
        const updatedParticles = Array(numParticles).fill(null).map((_, i) => {
            const existingParticle = prevParticles.find(p => p.id === i);
            if (existingParticle) {
                if (existingParticle.x > dimensions.width || existingParticle.y > dimensions.height + MAX_FONT_SIZE) {
                    return resetParticle(existingParticle, dimensions.width, dimensions.height);
                }
                return { 
                    ...existingParticle,
                    x: Math.min(existingParticle.x, dimensions.width - MAX_FONT_SIZE),
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
          if (newY > dimensions.height + p.fontSize) { 
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
            textShadow: `0 0 4px ${p.color}, 0 0 8px ${p.color.replace('hsl', 'hsla').replace(')', ', 0.5)')}`, // Enhanced glow
            opacity: p.fontSize / MAX_FONT_SIZE * 0.5 + 0.3, // Opacity range: 0.3 to 0.8
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
