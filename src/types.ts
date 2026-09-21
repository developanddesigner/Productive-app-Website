export interface TaskItem {
  id: string;
  title: string;
  duration: number; // in minutes
  category: 'deep' | 'creative' | 'review' | 'admin';
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
}

export interface PricingTier {
  id: string;
  name: string;
  tagline: string;
  monthlyPrice: number;
  annualPrice: number;
  popular?: boolean;
  features: string[];
  ctaText: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar: string;
  metric: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export type FocusModeType = 'sprint' | 'ultradian' | 'reset';
