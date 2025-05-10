import Image from 'next/image';
import type { LucideIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface PortfolioCardProps {
  title: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  tags?: string[];
  Icon?: LucideIcon;
  imageHint?: string;
}

export default function PortfolioCard({ title, description, imageUrl, imageAlt, tags, Icon, imageHint }: PortfolioCardProps) {
  return (
    <Card className={cn(
      "overflow-hidden h-full flex flex-col group",
      "bg-card shadow-xl hover:shadow-2xl hover:shadow-primary/30",
      "transition-all duration-300 ease-out transform hover:-translate-y-2 hover:scale-[1.02]"
    )}>
      <CardHeader className="pb-4 pt-6">
        <div className="flex items-center gap-3 mb-3">
          {Icon && <Icon className="w-10 h-10 text-accent group-hover:text-primary transition-colors duration-300" />}
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
      <CardContent className="flex-grow flex flex-col">
        <div className="relative w-full aspect-[16/10] rounded-md overflow-hidden mb-5 shadow-inner">
          <Image
            src={imageUrl}
            alt={imageAlt}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-500 group-hover:scale-110"
            data-ai-hint={imageHint}
          />
           <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-50 group-hover:opacity-20 transition-opacity duration-300"></div>
        </div>
        <CardDescription className="text-muted-foreground flex-grow text-base leading-relaxed text-shadow">{description}</CardDescription>
      </CardContent>
    </Card>
  );
}
