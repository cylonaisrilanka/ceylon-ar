import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import PortfolioItemGraphic from '@/components/graphics/PortfolioItemGraphic'; // Import the new graphic component

interface PortfolioCardProps {
  title: string;
  description: string;
  // imageUrl: string; // No longer needed
  // imageAlt: string; // No longer needed
  tags?: string[];
  Icon?: LucideIcon;
  // imageHint?: string; // No longer needed for graphic
  projectUrl?: string;
}

export default function PortfolioCard({ title, description, tags, Icon, projectUrl }: PortfolioCardProps) {
  const cardContent = (
    <CardHeader className="pb-4 pt-6">
      <div className="flex items-center gap-3 mb-3">
        {Icon && <Icon className="w-10 h-10 text-accent group-hover:text-primary transition-colors duration-300 shrink-0" />}
        <CardTitle className="text-2xl lg:text-3xl font-bold group-hover:text-primary transition-colors duration-300 text-shadow-md">{title}</CardTitle>
      </div>
      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs bg-secondary text-secondary-foreground group-hover:bg-primary/20 group-hover:text-primary transition-colors duration-300 text-shadow-none">
              {tag}
            </Badge>
          ))}
        </div>
      )}
    </CardHeader>
  );

  const cardGraphicAndDescription = (
    <CardContent className="flex-grow flex flex-col">
      <div className="relative w-full aspect-[16/10] rounded-md overflow-hidden mb-5 shadow-inner group">
        {/* Replace Image with PortfolioItemGraphic */}
        <PortfolioItemGraphic 
          Icon={Icon} 
          containerClassName="transition-transform duration-500 group-hover:scale-110"
        />
        {/* Removed the overlay div as it might not complement the graphic well */}
      </div>
      <CardDescription className="text-muted-foreground flex-grow text-base leading-relaxed text-shadow">{description}</CardDescription>
    </CardContent>
  );

  if (projectUrl) {
    return (
      <Link
        href={projectUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block h-full group"
        aria-label={`View project ${title}`}
      >
        <Card className={cn(
          "overflow-hidden h-full flex flex-col",
          "bg-card shadow-xl",
          "transition-all duration-300 ease-out",
          "group-hover:shadow-2xl group-hover:shadow-primary/30",
          "group-hover:-translate-y-2 group-hover:scale-[1.02]"
        )}>
          {cardContent}
          {cardGraphicAndDescription}
        </Card>
      </Link>
    );
  }

  return (
    <Card className={cn(
      "overflow-hidden h-full flex flex-col group",
      "bg-card shadow-xl hover:shadow-2xl hover:shadow-primary/30",
      "transition-all duration-300 ease-out transform hover:-translate-y-2 hover:scale-[1.02]"
    )}>
      {cardContent}
      {cardGraphicAndDescription}
    </Card>
  );
}
