
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
const MIN_SPEED = 0.7; 
const MAX_SPEED = 3.0; 
const MIN_FONT_SIZE = 12; 
const MAX_FONT_SIZE = 24; 
const PARTICLES_DENSITY_FACTOR = 60; // Increased from 30 to reduce quantity by ~50%

const BinaryRainBackground = () => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [themeColors, setThemeColors] = useState<string[]>([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const computedStyle = getComputedStyle(document.documentElement);
      const primaryHsl = computedStyle.getPropertyValue('--primary').trim();
      const accentHsl = computedStyle.getPropertyValue('--accent').trim();
      const foregroundHsl = computedStyle.getPropertyValue('--foreground').trim();
      
      const formatHSL = (hslString: string) => `hsl(${hslString})`;
      const formatHSLA = (hslString: string, alpha: number) => `hsla(${hslString}, ${alpha})`;

      setThemeColors([
        formatHSL(primaryHsl),              // Solid Primary (Purple)
        formatHSL(accentHsl),               // Solid Accent (Pink)
        formatHSLA(foregroundHsl, 0.7),     // Semi-transparent Foreground (Off-white)
        formatHSLA(primaryHsl, 0.5),        // Dimmed Primary (Purple)
        formatHSLA(accentHsl, 0.5),         // Dimmed Accent (Pink)
        formatHSLA(foregroundHsl, 0.3),     // More transparent Foreground for subtlety
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
      y: Math.random() * currentHeight - currentHeight, 
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
      y: -fontSize * 2, 
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

    const numParticles = Math.floor((dimensions.width / PARTICLES_DENSITY_FACTOR) * (dimensions.height / PARTICLES_DENSITY_FACTOR) * (PARTICLES_DENSITY_FACTOR / 10));
    
    setParticles(prevParticles => {
        const updatedParticles = Array(numParticles).fill(null).map((_, i) => {
            const existingParticle = prevParticles.find(p => p.id === i);
            if (existingParticle) {
                if (existingParticle.x > dimensions.width || existingParticle.x < 0) {
                    return createParticle(i, dimensions.width, dimensions.height);
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
          if (newY > dimensions.height + p.fontSize * 2) { 
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
            textShadow: `0 0 5px ${p.color}, 0 0 10px ${p.color.replace('hsl(', 'hsla(').replace(')', ', 0.6)')}`, 
            opacity: 0.3, // Set opacity to 30%
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

