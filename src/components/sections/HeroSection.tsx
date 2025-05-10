'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Section from '@/components/ui/Section';
import Link from 'next/link';
import { ArrowDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);
  
  const animationDelay = (index: number) => ({ transitionDelay: `${150 * index}ms` });

  return (
    <Section className="bg-gradient-to-br from-primary to-background min-h-[calc(100vh-88px)] flex items-center" id="hero">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6 text-center md:text-left">
          <h1
            className={cn("text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground load-animated-item", isLoaded && "is-loaded")}
            style={animationDelay(0)}
          >
            Innovate. Create. <span className="text-accent">Elevate.</span>
          </h1>
          <p 
            className={cn("text-lg md:text-xl text-muted-foreground load-animated-item", isLoaded && "is-loaded")}
            style={animationDelay(1)}
          >
            Ceylonar Digital Portfolio: Showcasing cutting-edge Machine Learning and bespoke Software Solutions designed for impact and efficiency.
          </p>
          <div 
            className={cn("space-x-4 pt-4 load-animated-item", isLoaded && "is-loaded")}
            style={animationDelay(2)}
          >
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Link href="#portfolio">View Our Work</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="#contact">Get In Touch</Link>
            </Button>
          </div>
        </div>
        <div 
          className={cn("relative aspect-square max-w-md mx-auto md:max-w-none load-animated-item", isLoaded && "is-loaded")}
          style={animationDelay(3)}
        >
          <Image
            src="https://picsum.photos/600/600?random=1"
            alt="Ceylonar Digital Innovation"
            layout="fill"
            objectFit="cover"
            className="rounded-xl shadow-2xl"
            data-ai-hint="abstract technology"
            priority
          />
        </div>
      </div>
      <div 
        className={cn("absolute bottom-10 left-1/2 -translate-x-1/2 text-center load-animated-item", isLoaded && "is-loaded")}
        style={animationDelay(4)}
      >
        <Link href="#services" aria-label="Scroll to services">
          <ArrowDown className="w-8 h-8 text-accent animate-bounce" />
        </Link>
      </div>
    </Section>
  );
}
