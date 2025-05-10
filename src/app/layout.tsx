
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
        <BinaryRainBackground /> {/* Add the background component here */}
        {children}
        <Toaster />
        <WhatsAppButton phoneNumber="+94740646427" /> {/* Updated phone number */}
      </body>
    </html>
  );
}
