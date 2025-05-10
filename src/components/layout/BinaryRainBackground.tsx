
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
const MAX_SPEED = 2.5; // Slightly increased max speed
const MIN_FONT_SIZE = 10;
const MAX_FONT_SIZE = 22; // Slightly increased max font size
const PARTICLES_DENSITY_FACTOR = 25; // Particles per 10000 sq pixels, increased density

const BinaryRainBackground = () => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [themeColors, setThemeColors] = useState<string[]>([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    // This effect runs once on mount to get theme colors
    if (typeof window !== 'undefined') {
      const computedStyle = getComputedStyle(document.documentElement);
      const primaryColor = computedStyle.getPropertyValue('--primary').trim();
      const accentColor = computedStyle.getPropertyValue('--accent').trim();
      const foregroundColor = computedStyle.getPropertyValue('--foreground').trim();
      
      // Ensure HSL values are correctly formatted for CSS
      const formatHSL = (hslString: string) => `hsl(${hslString})`;
      const formatHSLA = (hslString: string, alpha: number) => `hsla(${hslString}, ${alpha})`;

      setThemeColors([
        formatHSL(primaryColor), 
        formatHSL(accentColor),
        formatHSLA(foregroundColor, 0.6), // Foreground with some transparency
        formatHSLA(primaryColor, 0.7),   // Primary with some transparency
        formatHSLA(accentColor, 0.7),    // Accent with some transparency
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
      y: Math.random() * currentHeight, // Start at random y for initial fill
      char,
      color,
      speed,
      fontSize,
    };
  }, [themeColors]);
  
  const resetParticle = useCallback((particle: Particle, currentWidth: number, _currentHeight: number): Particle => {
    // Re-randomize properties for a more dynamic effect on reset
    const char = CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
    const color = themeColors.length > 0 ? themeColors[Math.floor(Math.random() * themeColors.length)] : `hsl(var(--foreground))`;
    const speed = Math.random() * (MAX_SPEED - MIN_SPEED) + MIN_SPEED;
    const fontSize = Math.random() * (MAX_FONT_SIZE - MIN_FONT_SIZE) + MIN_FONT_SIZE;
    return {
      ...particle,
      x: Math.random() * currentWidth,
      y: -fontSize, // Reset above the screen
      char,
      color,
      speed,
      fontSize,
    };
  }, [themeColors]);

  useEffect(() => {
    // Handles window resize
    const updateDimensions = () => {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;
      if (newWidth !== dimensions.width || newHeight !== dimensions.height) {
        setDimensions({ width: newWidth, height: newHeight });
      }
    };

    updateDimensions(); // Initial dimensions
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, [dimensions.width, dimensions.height]); // Depend on width and height
  
  useEffect(() => {
    // Initializes or updates particles when dimensions or theme colors change
    if (dimensions.width === 0 || dimensions.height === 0 || themeColors.length === 0) {
      setParticles([]); // Clear particles if no dimensions/theme
      return;
    }

    const numParticles = Math.floor((dimensions.width * dimensions.height / 10000) * PARTICLES_DENSITY_FACTOR);
    
    setParticles(prevParticles => {
        const updatedParticles = Array(numParticles).fill(null).map((_, i) => {
            const existingParticle = prevParticles.find(p => p.id === i);
            if (existingParticle) {
                // If particle exists, ensure it's within new bounds or reset if too far off
                if (existingParticle.x > dimensions.width || existingParticle.y > dimensions.height + MAX_FONT_SIZE) {
                    return resetParticle(existingParticle, dimensions.width, dimensions.height);
                }
                return { // Keep existing particle but update its bounds if necessary
                    ...existingParticle,
                    x: Math.min(existingParticle.x, dimensions.width - MAX_FONT_SIZE),
                 };
            }
            return createParticle(i, dimensions.width, dimensions.height);
        });
        return updatedParticles.slice(0, numParticles); // Ensure correct number of particles
    });

  }, [dimensions, themeColors, createParticle, resetParticle]);


  useEffect(() => {
    // Animation loop
    if (particles.length === 0 || dimensions.width === 0 || dimensions.height === 0) return;

    let animationFrameId: number;
    const animate = () => {
      setParticles(currentParticles =>
        currentParticles.map(p => {
          let newY = p.y + p.speed;
          if (newY > dimensions.height + p.fontSize) { // Particle is off-screen
            return resetParticle(p, dimensions.width, dimensions.height);
          }
          return { ...p, y: newY };
        })
      );
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [particles, dimensions, resetParticle]); // resetParticle is stable due to useCallback

  // Avoid rendering if critical data isn't ready (prevents flash or errors)
  if (themeColors.length === 0 || dimensions.width === 0) {
    return null;
  }

  return (
    <div
      ref={containerRef} // Ref might not be strictly needed if using window dimensions
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
            fontFamily: 'monospace', // Monospaced font for binary look
            textShadow: `0 0 3px ${p.color}, 0 0 6px ${p.color}`, // Subtler glow
            opacity: p.fontSize / MAX_FONT_SIZE * 0.6 + 0.3, // Opacity based on size, min 0.3 max 0.9
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
