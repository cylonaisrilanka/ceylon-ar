import Section from '@/components/ui/Section';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Brain, Code2, Zap, Orbit } from 'lucide-react';
import ScrollAnimationWrapper from '@/components/ScrollAnimationWrapper';

const services = [
  {
    icon: Brain,
    title: 'AI & Machine Learning Mastery',
    description: "Transform your digital presence with intelligent solutions. We build AI-powered websites featuring personalized user experiences, smart recommendation engines, insightful data analytics dashboards, and NLP-driven chatbots that elevate customer engagement and automate interactions. Unlock the potential of your data to create truly dynamic web platforms.",
    delay: 0,
  },
  {
    icon: Code2,
    title: 'Bespoke Software Artistry',
    description: "Crafting unique digital experiences from scratch. We design and develop high-performance, scalable web applications, from sophisticated e-commerce platforms and feature-rich SaaS products to custom content management systems (CMS) and responsive corporate websites. Our focus is on intuitive UI/UX, robust backends, and seamless integration, ensuring your software not only meets but exceeds expectations.",
    delay: 1,
  },
  {
    icon: Orbit, // Changed from Zap for a more "mind-blowing" tech feel
    title: 'Web & Digital Metamorphosis',
    description: "Future-proof your business with cutting-edge web technologies. We guide you through a comprehensive digital overhaul, modernizing your online infrastructure, optimizing web-based workflows, and implementing data-driven strategies. Our goal is to create an integrated digital ecosystem that enhances your brand, expands your reach, and drives sustainable growth in the online landscape.",
    delay: 2,
  },
];

export default function ServicesSection() {
  return (
    <Section id="services" className="bg-secondary/40"> {/* Adjusted background transparency */}
      <ScrollAnimationWrapper>
        <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-6 text-foreground">
          Our Core <span className="text-accent">Capabilities</span>
        </h2>
        <p className="text-xl text-muted-foreground text-center mb-16 max-w-4xl mx-auto leading-relaxed">
          We fuse artistry with technology, empowering businesses with state-of-the-art digital solutions that drive profound innovation and achieve spectacular results.
        </p>
      </ScrollAnimationWrapper>
      <div className="grid md:grid-cols-3 gap-10">
        {services.map((service) => (
          <ScrollAnimationWrapper key={service.title} style={{ transitionDelay: `${service.delay * 150}ms` }}>
            <Card className="h-full bg-card text-card-foreground shadow-2xl hover:shadow-primary/50 transition-all duration-300 transform hover:-translate-y-2 border-transparent hover:border-primary/30">
              <CardHeader className="items-center text-center pt-8 pb-4">
                <div className="p-5 bg-primary/10 rounded-full mb-6 inline-block ring-4 ring-primary/20 group-hover:ring-accent/30 transition-all duration-300">
                  <service.icon className="w-12 h-12 text-primary group-hover:text-accent transition-colors duration-300" />
                </div>
                <CardTitle className="text-3xl font-bold">{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="pb-8">
                <CardDescription className="text-muted-foreground text-center text-md leading-relaxed px-2">{service.description}</CardDescription>
              </CardContent>
            </Card>
          </ScrollAnimationWrapper>
        ))}
      </div>
    </Section>
  );
}
