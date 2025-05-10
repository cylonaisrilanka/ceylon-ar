'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Section from '@/components/ui/Section';
import Link from 'next/link';
import { ArrowDown, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);
  
  const animationDelay = (index: number) => ({ transitionDelay: `${200 * index}ms` });

  return (
    <Section className="bg-transparent min-h-[calc(100vh-88px)] flex items-center relative overflow-hidden" id="hero">
       <div className="absolute inset-0 opacity-5">
       </div>
      <div className="grid md:grid-cols-2 gap-12 items-center z-10">
        <div className="space-y-8 text-center md:text-left">
          <h1
            className={cn("text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter text-foreground load-animated-item text-shadow-lg", isLoaded && "is-loaded")}
            style={animationDelay(0)}
          >
            CEYLONAR<span className="text-accent">.</span>
            <br />
            Future<span className="text-primary">.</span> Redefined<span className="text-accent">.</span>
          </h1>
          <p 
            className={cn("text-xl md:text-2xl text-muted-foreground load-animated-item leading-relaxed text-shadow", isLoaded && "is-loaded")}
            style={animationDelay(1)}
          >
            Pioneering breathtaking AI, Machine Learning, and bespoke Software Solutions. We craft digital experiences that captivate, innovate, and elevate your brand to new dimensions.
          </p>
          <div 
            className={cn("pt-4 load-animated-item flex flex-col sm:flex-row gap-4 items-center justify-center md:justify-start", isLoaded && "is-loaded")}
            style={animationDelay(2)}
          >
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/80 shadow-lg transform hover:scale-105 transition-transform duration-300 w-full sm:w-auto text-shadow-none">
              <Link href="#portfolio">
                <Sparkles className="mr-2 h-5 w-5" /> Explore Our Universe
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10 hover:text-accent shadow-md transform hover:scale-105 transition-transform duration-300 w-full sm:w-auto text-shadow-none">
              <Link href="#contact">Connect With Us</Link>
            </Button>
          </div>
        </div>
        <div 
          className={cn("relative aspect-square max-w-md mx-auto md:max-w-none load-animated-item group", isLoaded && "is-loaded")}
          style={animationDelay(3)}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-xl shadow-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-500 blur-xl group-hover:blur-2xl animate-pulse"></div>
          <Image
            src="https://picsum.photos/700/700?random=1"
            alt="CEYLONAR Digital Innovation Sphere"
            layout="fill"
            objectFit="cover"
            className="rounded-xl shadow-2xl transform group-hover:scale-105 transition-transform duration-500"
            data-ai-hint="futuristic technology sphere"
            priority
          />
        </div>
      </div>
      <div 
        className={cn("absolute bottom-10 left-1/2 -translate-x-1/2 text-center load-animated-item", isLoaded && "is-loaded")}
        style={animationDelay(4)}
      >
        <Link href="#services" aria-label="Scroll to services">
          <ArrowDown className="w-10 h-10 text-accent animate-bounce" />
        </Link>
      </div>
    </Section>
  );
}
