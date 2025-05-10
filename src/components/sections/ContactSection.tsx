
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Section from '@/components/ui/Section';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import ScrollAnimationWrapper from '@/components/ScrollAnimationWrapper';

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function ContactSection() {
  const { toast } = useToast();
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  async function onSubmit(data: ContactFormValues) {
    // In a real app, you'd send this data to a backend.
    console.log(data);
    toast({
      title: "Message Transmitted!",
      description: "Your ideas are now traversing the digital cosmos towards us. We'll connect soon!",
      variant: "default", 
    });
    form.reset();
  }

  return (
    <Section id="contact" className="bg-card text-card-foreground">
      <ScrollAnimationWrapper>
        <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-6">
          Let's Create <span className="text-accent">Magic</span>
        </h2>
        <p className="text-xl text-muted-foreground text-center mb-16 max-w-3xl mx-auto leading-relaxed">
          Have a groundbreaking project or a universe of questions? Our lines are open. Connect with us to turn your vision into reality.
        </p>
      </ScrollAnimationWrapper>

      <div className="grid md:grid-cols-2 gap-12 items-start">
        <ScrollAnimationWrapper style={{ transitionDelay: `100ms` }} className="space-y-8 p-8 bg-secondary rounded-xl shadow-xl">
            <h3 className="text-3xl font-bold text-foreground mb-6">Contact Coordinates</h3>
            <div className="flex items-start gap-5 group">
              <Mail className="w-8 h-8 text-accent mt-1 group-hover:text-primary transition-colors duration-300" />
              <div>
                <h4 className="font-semibold text-xl text-foreground mb-1">Email Relay</h4>
                <a href="mailto:ceylonar.main@gmail.com" className="text-lg text-muted-foreground hover:text-accent transition-colors duration-300">
                  ceylonar.main@gmail.com
                </a>
              </div>
            </div>
            <div className="flex items-start gap-5 group">
              <Phone className="w-8 h-8 text-accent mt-1 group-hover:text-primary transition-colors duration-300" />
              <div>
                <h4 className="font-semibold text-xl text-foreground mb-1">Direct Comms</h4>
                <a href="tel:+94740646427" className="text-lg text-muted-foreground hover:text-accent transition-colors duration-300">
                  074 064 6427
                </a>
              </div>
            </div>
            <div className="flex items-start gap-5 group">
              <MapPin className="w-8 h-8 text-accent mt-1 group-hover:text-primary transition-colors duration-300" />
              <div>
                <h4 className="font-semibold text-xl text-foreground mb-1">Our Nexus</h4>
                <p className="text-lg text-muted-foreground">Polonnaruwa, Sri Lanka</p>
              </div>
            </div>
        </ScrollAnimationWrapper>

        <ScrollAnimationWrapper style={{ transitionDelay: `200ms` }}>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-8 bg-secondary rounded-xl shadow-xl">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg">Your Designation (Name)</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Visionary Max" {...field} className="bg-background text-foreground placeholder:text-muted-foreground/70 text-lg py-6" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg">Digital Signature (Email)</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="your.signal@example.com" {...field} className="bg-background text-foreground placeholder:text-muted-foreground/70 text-lg py-6" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg">Mission Subject</FormLabel>
                    <FormControl>
                      <Input placeholder="RE: Project Nova Inquiry" {...field} className="bg-background text-foreground placeholder:text-muted-foreground/70 text-lg py-6" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg">Your Grand Design (Message)</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Unveil your ideas, dreams, or schematics here..." rows={6} {...field} className="bg-background text-foreground placeholder:text-muted-foreground/70 text-lg" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/80 text-lg py-7 shadow-lg transform hover:scale-105 transition-transform duration-300">
                <Send className="mr-2 h-5 w-5" /> Launch Transmission
              </Button>
            </form>
          </Form>
        </ScrollAnimationWrapper>
      </div>
    </Section>
  );
}
