import Section from '@/components/ui/Section';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Brain, Code2, Orbit } from 'lucide-react';
import ScrollAnimationWrapper from '@/components/ScrollAnimationWrapper';

const services = [
  {
    icon: Brain,
    title: 'AI & Machine Learning Mastery',
    description: "Elevate your web presence with cutting-edge Artificial Intelligence and Machine Learning. We specialize in designing and developing intelligent websites that learn and adapt. This includes sophisticated features like AI-driven personalization engines for unique user journeys, dynamic content recommendation systems, advanced predictive analytics dashboards for actionable insights, and conversational AI chatbots for seamless customer interaction. Our AI solutions for web platforms aim to maximize engagement, automate processes, and unlock new revenue streams through data.",
    delay: 0,
  },
  {
    icon: Code2,
    title: 'Bespoke Software & Web Design',
    description: "Experience software tailored to your exact vision. Our bespoke software development focuses on creating high-performance, scalable, and visually stunning web applications and websites. From intricate e-commerce ecosystems and innovative SaaS platforms to custom CRMs and engaging corporate portals, we prioritize captivating UI/UX design coupled with robust, secure backend architecture. We transform complex requirements into elegant, user-centric web designs that drive results and reflect your brand's unique identity.",
    delay: 1,
  },
  {
    icon: Orbit,
    title: 'Web & Digital Metamorphosis',
    description: "Navigate the digital frontier with our transformative web solutions. We orchestrate complete digital metamorphoses, from modernizing legacy web systems and architecting cloud-native infrastructures to implementing agile, data-driven web strategies. Our holistic approach to web design and development ensures a cohesive digital ecosystem that amplifies your brand, optimizes for conversion, and positions you for sustained growth in an ever-evolving online world.",
    delay: 2,
  },
];

export default function ServicesSection() {
  return (
    <Section id="services" className="bg-secondary/40">
      <ScrollAnimationWrapper>
        <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-6 text-foreground text-shadow-md">
          Our Core <span className="text-accent">Capabilities</span>
        </h2>
        <p className="text-xl text-muted-foreground text-center mb-16 max-w-4xl mx-auto leading-relaxed text-shadow">
          We fuse artistry with technology, empowering businesses with state-of-the-art digital solutions that drive profound innovation and achieve spectacular results.
        </p>
      </ScrollAnimationWrapper>
      <div className="grid md:grid-cols-3 gap-10">
        {services.map((service) => (
          <ScrollAnimationWrapper key={service.title} style={{ transitionDelay: `${service.delay * 150}ms` }}>
            <Card className="group h-full bg-card text-card-foreground shadow-2xl hover:shadow-primary/50 transition-all duration-300 transform hover:-translate-y-2 border-transparent hover:border-primary/30">
              <CardHeader className="items-center text-center pt-8 pb-4">
                <div className="p-5 bg-primary/10 rounded-full mb-6 inline-block ring-4 ring-primary/20 group-hover:ring-accent/30 transition-all duration-300 animate-[pulse_4s_cubic-bezier(0.4,0,0.6,1)_infinite]">
                  <service.icon className="w-12 h-12 text-primary group-hover:text-accent transition-colors duration-300" />
                </div>
                <CardTitle className="text-3xl font-bold text-shadow-md">{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="pb-8">
                <CardDescription className="text-muted-foreground text-center text-md leading-relaxed px-2 text-shadow">{service.description}</CardDescription>
              </CardContent>
            </Card>
          </ScrollAnimationWrapper>
        ))}
      </div>
    </Section>
  );
}
