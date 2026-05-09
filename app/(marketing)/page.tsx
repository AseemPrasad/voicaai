import { Hero } from '@/components/Hero';
import { UseCases } from '@/components/UseCases';
import { Pricing } from '@/components/Pricing';
import { FAQ } from '@/components/FAQ';
import { Analyzer } from '@/components/Analyzer';
import { SITE_NAME, SITE_DESCRIPTION } from '@/lib/constants';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `${SITE_NAME} | AI Customer Service Automations`,
  description: SITE_DESCRIPTION,
  openGraph: {
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    type: 'website',
  }
};

export default function MarketingPage() {
  return (
    <main className="flex flex-col min-h-screen pt-16">
      <Hero />
      <UseCases />
      <Analyzer />
      <Pricing />
      <FAQ />
    </main>
  );
}
