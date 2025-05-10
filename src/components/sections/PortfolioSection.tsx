
import Section from '@/components/ui/Section';
import PortfolioCard from '@/components/PortfolioCard';
import { Brain, Code2, DatabaseZap, Smartphone } from 'lucide-react'; 
import ScrollAnimationWrapper from '@/components/ScrollAnimationWrapper';

const portfolioItems = [
  {
    title: 'AI-Powered Recommendation Engine for E-commerce Site',
    description: "Engineered and seamlessly integrated a sophisticated AI recommendation system into a high-traffic e-commerce website. This ML model analyzes user behavior in real-time to deliver hyper-personalized product suggestions, significantly boosting user engagement, conversion rates, and average order value through an enhanced online shopping experience.",
    imageUrl: 'https://picsum.photos/800/600?random=2',
    imageAlt: 'AI Recommendation Engine on E-commerce Site',
    tags: ['Machine Learning', 'Python', 'E-commerce UI', 'Personalization', 'Web AI'],
    Icon: Brain,
    imageHint: 'ai website analytics',
    delay: 0,
  },
  {
    title: 'Enterprise Web Portal & ERP Integration',
    description: "Designed and implemented a comprehensive enterprise web portal, deeply integrated with a custom ERP system for a manufacturing client. This solution provided a unified interface for operations, inventory management, and financial reporting, accessible securely via the web, streamlining workflows and improving data visibility across the organization.",
    imageUrl: 'https://picsum.photos/800/600?random=3',
    imageAlt: 'Enterprise Web Portal with ERP Integration',
    tags: ['Web Development', 'Java', 'API Integration', 'Cloud SaaS', 'UI/UX Design'],
    Icon: Code2,
    imageHint: 'enterprise dashboard interface',
    delay: 1,
  },
  {
    title: 'Industrial IoT Web Monitoring Platform',
    description: "Developed a real-time web monitoring platform for Industrial IoT devices, powered by an ML model predicting equipment failures. The intuitive web interface visualizes sensor data, alerts, and maintenance schedules, reducing downtime and operational costs by enabling proactive interventions through accessible online dashboards.",
    imageUrl: 'https://picsum.photos/800/600?random=4',
    imageAlt: 'Predictive Maintenance IoT Web Platform',
    tags: ['Machine Learning', 'IoT Web', 'Predictive Analytics', 'Data Visualization', 'Python'],
    Icon: DatabaseZap, 
    imageHint: 'iot dashboard charts',
    delay: 2,
  },
  {
    title: 'Interactive Lifestyle Brand Website & Mobile App',
    description: "Crafted a visually stunning and highly interactive website alongside a companion cross-platform mobile application for a dynamic lifestyle brand. The project focused on exceptional UI/UX design, engaging content delivery, and seamless user journeys to enhance customer reach, brand loyalty, and online interaction across all digital touchpoints.",
    imageUrl: 'https://picsum.photos/800/600?random=5',
    imageAlt: 'Lifestyle Brand Website and Mobile App',
    tags: ['Web Design', 'React', 'Mobile App', 'UX/UI Strategy', 'Branding'],
    Icon: Smartphone, 
    imageHint: 'modern website design app',
    delay: 3,
  },
];

export default function PortfolioSection() {
  return (
    <Section id="portfolio" className="bg-transparent"> 
      <ScrollAnimationWrapper>
        <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-6 text-foreground text-shadow-md">
          Our Signature <span className="text-accent">Creations</span>
        </h2>
        <p className="text-xl text-muted-foreground text-center mb-16 max-w-4xl mx-auto leading-relaxed text-shadow">
          Explore a galaxy of our projects, each a testament to our prowess in transforming visionary ideas into powerful, mind-bending digital solutions.
        </p>
      </ScrollAnimationWrapper>
      <div className="grid md:grid-cols-2 gap-10">
        {portfolioItems.map((item) => (
          <ScrollAnimationWrapper key={item.title} style={{ transitionDelay: `${item.delay * 150}ms` }}>
            <PortfolioCard {...item} />
          </ScrollAnimationWrapper>
        ))}
      </div>
    </Section>
  );
}

