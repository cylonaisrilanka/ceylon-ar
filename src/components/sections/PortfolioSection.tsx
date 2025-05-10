import Section from '@/components/ui/Section';
import PortfolioCard from '@/components/PortfolioCard';
import { Brain, Code2, DatabaseZap, Smartphone, ScanFace, Bitcoin, LineChart, HeartPulse, PenTool, ScanText, Microscope, LayoutGrid, Award, Cpu, Scissors, TrendingUp, BedDouble } from 'lucide-react';
import ScrollAnimationWrapper from '@/components/ScrollAnimationWrapper';

const portfolioItems = [
  {
    title: 'Hotel Siyathma - Online Booking & Showcase',
    description: "Developed a responsive and user-friendly website for Hotel Siyathma, featuring online booking capabilities, room showcases, and local attraction information to enhance guest experience and drive direct reservations.",
    tags: ['Web Development', 'Booking Engine', 'Hospitality', 'UI/UX Design', 'Responsive Design'],
    Icon: BedDouble,
    projectUrl: 'https://hotelsiyathma.com/',
    delay: 0,
  },
  {
    title: 'DermCare - AI-Powered Skincare Assistant (v0)',
    description: "Initial version of an AI-driven skincare assistant web application (v0-derm-care.vercel.app). Provides preliminary skin analysis and product recommendations based on user input. (Conceptual v0 project).",
    tags: ['AI', 'Web App', 'Skincare', 'UI Concept', 'Frontend', 'Vercel'],
    Icon: ScanFace,
    projectUrl: 'https://v0-derm-care.vercel.app/',
    delay: 1,
  },
  {
    title: 'CoinChi - Crypto Portfolio Tracker (v0)',
    description: "A proof-of-concept cryptocurrency portfolio tracking application (v0-coin-chi.vercel.app). Allows users to monitor their digital asset investments and view market trends. (Conceptual v0 project).",
    tags: ['Web App', 'Cryptocurrency', 'Finance', 'UI Concept', 'Data Visualization', 'Vercel'],
    Icon: Bitcoin,
    projectUrl: 'https://v0-coin-chi.vercel.app/',
    delay: 2,
  },
  {
    title: 'AI-Driven Diabetics Risk Prediction',
    description: "Developed a machine learning model that predicts the likelihood of diabetes based on external health factors and lifestyle data, enabling early risk assessment and preventative care.",
    tags: ['Machine Learning', 'Healthcare AI', 'Predictive Analytics', 'Python', 'Data Science'],
    Icon: HeartPulse,
    delay: 3,
  },
  {
    title: 'Prescription Digit Recognition AI',
    description: "An AI solution employing deep learning for recognizing handwritten digits on prescriptions, aiming to reduce errors and improve efficiency in pharmacies.",
    tags: ['Deep Learning', 'OCR', 'Healthcare AI', 'Python', 'Computer Vision'],
    Icon: ScanText,
    delay: 4,
  },
  {
    title: 'Advanced Skin Disease Classification AI (Ongoing)',
    description: "Currently developing a deep learning model for accurate classification of various skin diseases from images, aiming to assist dermatologists and improve diagnostic speed.",
    tags: ['Deep Learning', 'Computer Vision', 'Healthcare AI', 'Medical Imaging', 'Ongoing'],
    Icon: Microscope,
    delay: 5,
  },
  {
    title: 'Diverse Web Development Projects (7+ Ongoing)',
    description: "Actively developing over seven unique website projects for various clients, spanning e-commerce, corporate portals, and custom web applications, focusing on modern design and functionality.",
    tags: ['Web Development', 'UI/UX Design', 'E-commerce', 'SaaS', 'Ongoing'],
    Icon: LayoutGrid,
    delay: 6,
  },
  {
    title: 'AI-Powered Challenge Coin Design (Ongoing)',
    description: "Building an AI flow integrated with an API to generate unique challenge coin designs based on customer inputs and pre-defined templates, streamlining custom merchandise creation.",
    tags: ['Generative AI', 'API Integration', 'Custom Design', 'E-commerce Tool', 'Ongoing'],
    Icon: Award,
    delay: 7,
  },
  {
    title: 'AI Haircut Style Advisor (Ongoing)',
    description: "Developing an innovative AI model to suggest suitable haircut styles for salon clients by analyzing facial features and preferences, enhancing the consultation process.",
    tags: ['AI', 'Computer Vision', 'Personalization', 'Beauty Tech', 'Ongoing'],
    Icon: Scissors,
    delay: 8,
  },
  {
    title: 'Fashion Future Trends Prediction Platform (Ongoing)',
    description: "Creating a sophisticated website that utilizes machine learning to predict future market trends in the fashion industry, providing valuable insights for designers and retailers.",
    tags: ['Machine Learning', 'Predictive Analytics', 'Fashion Tech', 'Data Visualization', 'Ongoing'],
    Icon: TrendingUp,
    delay: 9,
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
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
        {portfolioItems.map((item) => (
          <ScrollAnimationWrapper key={item.title} style={{ transitionDelay: `${item.delay * 100}ms` }}>
            <PortfolioCard {...item} />
          </ScrollAnimationWrapper>
        ))}
      </div>
    </Section>
  );
}
