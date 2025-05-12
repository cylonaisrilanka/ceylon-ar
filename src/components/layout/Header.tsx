
import Link from 'next/link';
import { BrainCircuit } from 'lucide-react'; 
import SmoothLink from './SmoothLink'; // Import the new SmoothLink component

export default function Header() {
  return (
    <header className="py-6 px-4 md:px-8 sticky top-0 z-50 bg-background/80 backdrop-blur-md shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center gap-3 group">
          <BrainCircuit className="h-9 w-9 text-accent group-hover:text-primary transition-colors duration-300" />
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground group-hover:text-primary transition-colors duration-300 text-shadow-md">
            CEYLONAR
          </h1>
        </Link>
        <nav className="space-x-6">
          <SmoothLink 
            hrefHash="#services"
            targetId="services"
            className="text-lg text-muted-foreground hover:text-accent transition-colors duration-300 text-shadow"
            aria-label="Scroll to Services section"
          >
            Services
          </SmoothLink>
          <SmoothLink 
            hrefHash="#portfolio"
            targetId="portfolio"
            className="text-lg text-muted-foreground hover:text-accent transition-colors duration-300 text-shadow"
            aria-label="Scroll to Portfolio section"
          >
            Portfolio
          </SmoothLink>
          <SmoothLink 
            hrefHash="#contact"
            targetId="contact"
            className="text-lg text-muted-foreground hover:text-accent transition-colors duration-300 text-shadow"
            aria-label="Scroll to Contact section"
          >
            Contact
          </SmoothLink>
        </nav>
      </div>
    </header>
  );
}
