import Link from 'next/link';
import { Briefcase } from 'lucide-react';

export default function Header() {
  return (
    <header className="py-6 px-4 md:px-8 sticky top-0 z-50 bg-background/80 backdrop-blur-md shadow-sm">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <Briefcase className="h-8 w-8 text-accent" />
          <h1 className="text-2xl font-bold text-foreground">
            Ceylonar <span className="text-accent">Digital</span>
          </h1>
        </Link>
        <nav className="space-x-6">
          <Link href="#services" className="text-foreground hover:text-accent transition-colors">
            Services
          </Link>
          <Link href="#portfolio" className="text-foreground hover:text-accent transition-colors">
            Portfolio
          </Link>
          <Link href="#contact" className="text-foreground hover:text-accent transition-colors">
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}
