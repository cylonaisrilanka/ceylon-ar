
'use client';

import Section from '@/components/ui/Section';
import { Mail, MapPin, Phone } from 'lucide-react'; 
import ScrollAnimationWrapper from '@/components/ScrollAnimationWrapper';
import Link from 'next/link';

export default function ContactSection() {
  const phoneNumber = "+94740646427"; 
  const formattedPhoneNumber = "074 064 6427"; 
  const whatsappLink = `https://wa.me/${phoneNumber.replace(/\D/g, '')}`;
  const emailAddress = "ceylonar.main@gmail.com";

  return (
    <Section id="contact" className="bg-card/40 text-card-foreground"> 
      <ScrollAnimationWrapper>
        <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-6 text-shadow-md">
          Let's Create <span className="text-accent">Magic</span>
        </h2>
        <p className="text-xl text-muted-foreground text-center mb-16 max-w-3xl mx-auto leading-relaxed text-shadow">
          Have a groundbreaking project or a universe of questions? Our lines are open. Connect with us to turn your vision into reality.
        </p>
      </ScrollAnimationWrapper>

      <div className="flex justify-center mt-10">
        <ScrollAnimationWrapper className="w-full max-w-2xl" style={{ transitionDelay: `100ms` }}>
          <div className="space-y-10 p-8 sm:p-10 bg-secondary rounded-2xl shadow-xl"> 
            <h3 className="text-3xl font-bold text-foreground mb-8 text-center text-shadow-md">Contact Coordinates</h3>
            
            <div className="flex items-start gap-5 group">
              <Mail className="w-9 h-9 text-accent mt-1 group-hover:text-primary transition-colors duration-300 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-xl lg:text-2xl text-foreground mb-1 text-shadow">Email Relay</h4>
                <Link href={`mailto:${emailAddress}`} className="text-lg lg:text-xl text-muted-foreground hover:text-accent transition-colors duration-300 break-all text-shadow">
                  {emailAddress}
                </Link>
              </div>
            </div>
            
            <div className="flex items-start gap-5 group">
              <Phone className="w-9 h-9 text-accent mt-1 group-hover:text-primary transition-colors duration-300 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-xl lg:text-2xl text-foreground mb-1 text-shadow">Direct Comms</h4>
                <Link href={`tel:${phoneNumber}`} className="block text-lg lg:text-xl text-muted-foreground hover:text-accent transition-colors duration-300 text-shadow">
                  {formattedPhoneNumber} (Call)
                </Link>
                <Link href={whatsappLink} target="_blank" rel="noopener noreferrer" className="block text-lg lg:text-xl text-muted-foreground hover:text-accent transition-colors duration-300 text-shadow">
                  {formattedPhoneNumber} (WhatsApp)
                </Link>
              </div>
            </div>
            
            <div className="flex items-start gap-5 group">
              <MapPin className="w-9 h-9 text-accent mt-1 group-hover:text-primary transition-colors duration-300 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-xl lg:text-2xl text-foreground mb-1 text-shadow">Our Nexus</h4>
                <p className="text-lg lg:text-xl text-muted-foreground text-shadow">Polonnaruwa, Sri Lanka</p>
              </div>
            </div>
          </div>
        </ScrollAnimationWrapper>
      </div>
    </Section>
  );
}
