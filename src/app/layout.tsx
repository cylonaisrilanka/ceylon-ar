
import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import WhatsAppButton from '@/components/layout/WhatsAppButton';
import BinaryRainBackground from '@/components/layout/BinaryRainBackground'; // Import the new component

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
});

export const metadata: Metadata = {
  title: 'CEYLONAR - AI & Software Solutions',
  description: 'CEYLONAR: Pioneering AI, Machine Learning, and Bespoke Software Solutions. Discover our portfolio of innovative web designs and digital transformations.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={montserrat.variable}>
      <body className="font-sans antialiased">
        <BinaryRainBackground /> {/* This ensures the binary rain animation is the background */}
        <div className="relative z-10"> {/* Ensure content is above the background */}
          {children}
        </div>
        <Toaster />
        <WhatsAppButton phoneNumber="+94740646427" />
      </body>
    </html>
  );
}

