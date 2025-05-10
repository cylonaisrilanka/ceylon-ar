import Link from 'next/link';
import { Briefcase } from 'lucide-react'; 

export default function Header() {
  return (
    <header className="py-6 px-4 md:px-8 sticky top-0 z-50 bg-background/80 backdrop-blur-md shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center gap-3 group">
          <Briefcase className="h-9 w-9 text-accent group-hover:text-primary transition-colors duration-300" />
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground group-hover:text-primary transition-colors duration-300 text-shadow-md">
            CEYLONAR
          </h1>
        </Link>
        <nav className="space-x-6">
          <Link href="#services" className="text-lg text-muted-foreground hover:text-accent transition-colors duration-300 text-shadow">
            Services
          </Link>
          <Link href="#portfolio" className="text-lg text-muted-foreground hover:text-accent transition-colors duration-300 text-shadow">
            Portfolio
          </Link>
          <Link href="#contact" className="text-lg text-muted-foreground hover:text-accent transition-colors duration-300 text-shadow">
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}
