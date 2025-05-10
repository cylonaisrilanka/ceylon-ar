import Image from 'next/image';
import type { LucideIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

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
    <Card className="overflow-hidden h-full flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3 mb-2">
          {Icon && <Icon className="w-8 h-8 text-accent" />}
          <CardTitle className="text-2xl font-semibold">{title}</CardTitle>
        </div>
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs bg-secondary text-secondary-foreground">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardHeader>
      <CardContent className="flex-grow flex flex-col">
        <div className="relative w-full aspect-video rounded-md overflow-hidden mb-4">
          <Image
            src={imageUrl}
            alt={imageAlt}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-500 hover:scale-105"
            data-ai-hint={imageHint}
          />
        </div>
        <CardDescription className="text-muted-foreground flex-grow">{description}</CardDescription>
      </CardContent>
    </Card>
  );
}
