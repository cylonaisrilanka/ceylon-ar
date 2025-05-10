import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Package } from 'lucide-react'; // Default icon

interface PortfolioItemGraphicProps {
  Icon?: LucideIcon;
  iconClassName?: string;
  containerClassName?: string;
}

export default function PortfolioItemGraphic({ 
  Icon = Package, // Use Package as a default icon
  iconClassName, 
  containerClassName 
}: PortfolioItemGraphicProps) {
  return (
    <div
      className={cn(
        "w-full h-full flex items-center justify-center rounded-md overflow-hidden p-4", // Added padding
        "bg-gradient-to-br from-card via-secondary to-card/50", 
        containerClassName
      )}
      aria-hidden="true"
    >
      <Icon 
        className={cn(
          "w-3/5 h-3/5 text-primary opacity-60 group-hover:opacity-80 group-hover:text-accent transition-all duration-300", // Made icon larger
          iconClassName
        )} 
        strokeWidth={1.5} // Slightly thinner stroke for a cleaner look
      />
    </div>
  );
}
