'use client';

import { MessageSquare } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface WhatsAppButtonProps {
  phoneNumber: string; // E.g., +1234567890
  message?: string;
}

export default function WhatsAppButton({ phoneNumber, message = "Hello! I'm interested in your services." }: WhatsAppButtonProps) {
  const whatsappLink = `https://wa.me/${phoneNumber.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-50"
            aria-label="Contact us on WhatsApp"
          >
            <Button
              size="icon"
              className="bg-green-500 hover:bg-green-600 text-white rounded-full w-14 h-14 shadow-lg"
            >
              <MessageSquare className="h-7 w-7" />
            </Button>
          </Link>
        </TooltipTrigger>
        <TooltipContent side="left" className="bg-card text-card-foreground border-border">
          <p>Chat on WhatsApp</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
