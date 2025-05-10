'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Section from '@/components/ui/Section';
import { Mail, Phone, MapPin } from 'lucide-react';
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
      title: "Message Sent!",
      description: "Thank you for reaching out. We'll get back to you soon.",
      variant: "default", 
    });
    form.reset();
  }

  return (
    <Section id="contact" className="bg-card text-card-foreground">
      <ScrollAnimationWrapper>
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          Get In <span className="text-accent">Touch</span>
        </h2>
        <p className="text-lg text-muted-foreground text-center mb-12 max-w-3xl mx-auto">
          Have a project in mind or want to learn more about our services? We'd love to hear from you.
        </p>
      </ScrollAnimationWrapper>

      <div className="grid md:grid-cols-2 gap-12 items-start">
        <ScrollAnimationWrapper style={{ transitionDelay: `100ms` }}>
          <div className="space-y-6 p-6 bg-secondary rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-foreground mb-4">Contact Information</h3>
            <div className="flex items-start gap-4">
              <Mail className="w-6 h-6 text-accent mt-1" />
              <div>
                <h4 className="font-medium text-foreground">Email</h4>
                <a href="mailto:info@ceylonar.digital" className="text-muted-foreground hover:text-accent">
                  info@ceylonar.digital
                </a>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Phone className="w-6 h-6 text-accent mt-1" />
              <div>
                <h4 className="font-medium text-foreground">Phone</h4>
                <a href="tel:+1234567890" className="text-muted-foreground hover:text-accent">
                  +1 (234) 567-890 {/* Placeholder */}
                </a>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <MapPin className="w-6 h-6 text-accent mt-1" />
              <div>
                <h4 className="font-medium text-foreground">Address</h4>
                <p className="text-muted-foreground">123 Tech Street, Innovation City, CA 90210</p> {/* Placeholder */}
              </div>
            </div>
          </div>
        </ScrollAnimationWrapper>

        <ScrollAnimationWrapper style={{ transitionDelay: `200ms` }}>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 p-6 bg-secondary rounded-lg shadow-md">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} className="bg-background text-foreground placeholder:text-muted-foreground/70" />
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
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="you@example.com" {...field} className="bg-background text-foreground placeholder:text-muted-foreground/70" />
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
                    <FormLabel>Subject</FormLabel>
                    <FormControl>
                      <Input placeholder="Project Inquiry" {...field} className="bg-background text-foreground placeholder:text-muted-foreground/70" />
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
                    <FormLabel>Your Message</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Tell us about your project..." rows={5} {...field} className="bg-background text-foreground placeholder:text-muted-foreground/70" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90" size="lg">
                Send Message
              </Button>
            </form>
          </Form>
        </ScrollAnimationWrapper>
      </div>
    </Section>
  );
}
