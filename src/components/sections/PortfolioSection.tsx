import Section from '@/components/ui/Section';
import PortfolioCard from '@/components/PortfolioCard';
import { Brain, Code2 } from 'lucide-react';
import ScrollAnimationWrapper from '@/components/ScrollAnimationWrapper';

const portfolioItems = [
  {
    title: 'AI-Powered Recommendation Engine',
    description: 'Developed a sophisticated recommendation system for an e-commerce platform, significantly boosting user engagement and sales through personalized product suggestions.',
    imageUrl: 'https://picsum.photos/800/600?random=2',
    imageAlt: 'AI Recommendation Engine',
    tags: ['Machine Learning', 'Python', 'Personalization', 'E-commerce'],
    Icon: Brain,
    imageHint: 'data analytics dashboard',
    delay: 0,
  },
  {
    title: 'Enterprise Resource Planning (ERP) System',
    description: 'Designed and implemented a comprehensive ERP system for a manufacturing client, streamlining operations, inventory management, and financial reporting.',
    imageUrl: 'https://picsum.photos/800/600?random=3',
    imageAlt: 'ERP System',
    tags: ['Software Development', 'Java', 'Spring Boot', 'Cloud', 'SaaS'],
    Icon: Code2,
    imageHint: 'software interface mockups',
    delay: 1,
  },
  {
    title: 'Predictive Maintenance for Industrial IoT',
    description: 'Built an ML model to predict equipment failures in an industrial setting, reducing downtime and maintenance costs by enabling proactive interventions.',
    imageUrl: 'https://picsum.photos/800/600?random=4',
    imageAlt: 'Predictive Maintenance IoT',
    tags: ['Machine Learning', 'IoT', 'Predictive Analytics', 'Python'],
    Icon: Brain,
    imageHint: 'industrial machinery sensor',
    delay: 2,
  },
  {
    title: 'Cross-Platform Mobile Application',
    description: 'Created a sleek and intuitive mobile application for a lifestyle brand, available on both iOS and Android, enhancing customer reach and interaction.',
    imageUrl: 'https://picsum.photos/800/600?random=5',
    imageAlt: 'Mobile Application',
    tags: ['Software Development', 'React Native', 'Mobile App', 'UX/UI'],
    Icon: Code2,
    imageHint: 'mobile app interface',
    delay: 3,
  },
];

export default function PortfolioSection() {
  return (
    <Section id="portfolio" className="bg-background">
      <ScrollAnimationWrapper>
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-foreground">
          Our <span className="text-accent">Portfolio</span>
        </h2>
        <p className="text-lg text-muted-foreground text-center mb-12 max-w-3xl mx-auto">
          Explore a selection of our projects that demonstrate our expertise in transforming ideas into powerful digital solutions.
        </p>
      </ScrollAnimationWrapper>
      <div className="grid md:grid-cols-2 gap-8">
        {portfolioItems.map((item) => (
          <ScrollAnimationWrapper key={item.title} style={{ transitionDelay: `${item.delay * 150}ms` }}>
            <PortfolioCard {...item} />
          </ScrollAnimationWrapper>
        ))}
      </div>
    </Section>
  );
}
