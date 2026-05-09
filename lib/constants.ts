export const SITE_NAME = 'Voice AI Assistant';
export const SITE_DESCRIPTION = 'Never Miss a Customer Call Again. AI voice assistant for lead capture, booking automation, and 24/7 availability.';
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export const USE_CASES = [
  {
    title: 'Auto Repair Shop',
    description: 'Handle emergency breakdown calls, schedule services, and provide repair estimates automatically.',
    icon: 'Wrench'
  },
  {
    title: 'Restaurant',
    description: 'Take reservations, process delivery orders, and answer catering inquiries 24/7.',
    icon: 'Utensils'
  },
  {
    title: 'Medical Clinic',
    description: 'Book appointments, handle dental emergencies, and send automated reminders.',
    icon: 'Stethoscope'
  }
];

export const PRICING_TIERS = [
  {
    name: 'Starter',
    price: '$49',
    period: '/mo',
    features: ['100 AI minutes/mo', 'Rule-based fallback', 'Basic analytics', 'Email support'],
    cta: 'Start Free Trial'
  },
  {
    name: 'Growth',
    price: '$149',
    period: '/mo',
    features: ['500 AI minutes/mo', 'Custom intents', 'Advanced analytics', 'Priority support', 'CRM Integration'],
    cta: 'Get Growth',
    popular: true
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    features: ['Unlimited minutes', 'Dedicated models', 'SLA guarantee', '24/7 Phone support', 'Custom workflows'],
    cta: 'Contact Sales'
  }
];

export const FAQS = [
  {
    question: 'How does the Voice AI Assistant work?',
    answer: 'When a customer calls, our AI answers instantly, uses advanced natural language processing to extract their intent, and either resolves their request (e.g., booking an appointment) or forwards structured lead data to your business.'
  },
  {
    question: 'Can I build custom workflows?',
    answer: 'Yes! Our Growth and Enterprise plans allow you to define custom intents and workflows tailored specifically to your business operations.'
  },
  {
    question: 'Is customer data secure?',
    answer: 'Absolutely. We use enterprise-grade encryption for all data in transit and at rest. We are compliant with major data protection regulations.'
  },
  {
    question: 'What happens if the AI cannot understand the caller?',
    answer: 'We have a dual-engine system. If the AI model fails or is unsure, we seamlessly fallback to a robust rule-based analyzer or route the call to a human agent, ensuring no customer is left stranded.'
  },
  {
    question: 'Do you integrate with my existing CRM?',
    answer: 'Yes, we offer seamless integrations with popular CRMs like Salesforce, HubSpot, and standard webhooks for custom setups.'
  }
];
