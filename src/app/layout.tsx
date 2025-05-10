
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
      <body className="font-sans antialiased bg-background"> {/* Changed to bg-background */}
        <BinaryRainBackground /> {/* This is fixed, -z-10, so it's the true background over body's bg-background */}
        <div className="relative z-1 flex flex-col min-h-screen"> {/* Content wrapper, z-1 to be above rain. Page content itself will manage its transparency. */}
          {children}
        </div>
        <Toaster />
        <WhatsAppButton phoneNumber="+94740646427" />
      </body>
    </html>
  );
}

