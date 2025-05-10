import Section from '@/components/ui/Section';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, Code2, Zap } from 'lucide-react';
import ScrollAnimationWrapper from '@/components/ScrollAnimationWrapper';

const services = [
  {
    icon: Brain,
    title: 'Machine Learning Solutions',
    description: 'Leverage the power of AI with our custom machine learning models. We specialize in predictive analytics, natural language processing, computer vision, and more to solve complex business challenges.',
    delay: 0,
  },
  {
    icon: Code2,
    title: 'Custom Software Development',
    description: 'From web applications to mobile apps and enterprise software, we build scalable, secure, and high-performance solutions tailored to your specific needs. Our agile approach ensures quality and timely delivery.',
    delay: 1,
  },
  {
    icon: Zap,
    title: 'Digital Transformation',
    description: 'We help businesses navigate the complexities of digital transformation by integrating modern technologies, optimizing processes, and enhancing customer experiences for sustainable growth.',
    delay: 2,
  },
];

export default function ServicesSection() {
  return (
    <Section id="services" className="bg-secondary">
      <ScrollAnimationWrapper>
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-foreground">
          Our Core <span className="text-accent">Services</span>
        </h2>
        <p className="text-lg text-muted-foreground text-center mb-12 max-w-3xl mx-auto">
          We empower businesses with state-of-the-art technology solutions, driving innovation and achieving tangible results.
        </p>
      </ScrollAnimationWrapper>
      <div className="grid md:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <ScrollAnimationWrapper key={service.title} style={{ transitionDelay: `${service.delay * 150}ms` }}>
            <Card className="h-full bg-card text-card-foreground shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="items-center text-center">
                <div className="p-4 bg-accent/10 rounded-full mb-4 inline-block">
                  <service.icon className="w-10 h-10 text-accent" />
                </div>
                <CardTitle className="text-2xl font-semibold">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center">{service.description}</p>
              </CardContent>
            </Card>
          </ScrollAnimationWrapper>
        ))}
      </div>
    </Section>
  );
}
