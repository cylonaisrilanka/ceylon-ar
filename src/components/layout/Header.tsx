import Link from 'next/link';
import { Briefcase } from 'lucide-react'; // Using Briefcase as a placeholder, consider a more abstract/tech icon

export default function Header() {
  return (
    <header className="py-6 px-4 md:px-8 sticky top-0 z-50 bg-background/80 backdrop-blur-md shadow-lg"> {/* Adjusted transparency and blur */}
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center gap-3 group">
          {/* Consider an SVG logo here in the future if available */}
          <Briefcase className="h-9 w-9 text-accent group-hover:text-primary transition-colors duration-300" />
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground group-hover:text-primary transition-colors duration-300">
            CEYLONAR
          </h1>
        </Link>
        <nav className="space-x-6">
          <Link href="#services" className="text-lg text-muted-foreground hover:text-accent transition-colors duration-300">
            Services
          </Link>
          <Link href="#portfolio" className="text-lg text-muted-foreground hover:text-accent transition-colors duration-300">
            Portfolio
          </Link>
          <Link href="#contact" className="text-lg text-muted-foreground hover:text-accent transition-colors duration-300">
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}
