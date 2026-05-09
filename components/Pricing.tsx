'use client';

import { motion } from 'framer-motion';
import { PRICING_TIERS } from '@/lib/constants';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Pricing() {
  return (
    <section id="pricing" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Choose the plan that fits your business needs. No hidden fees.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {PRICING_TIERS.map((tier, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={cn(
                "relative bg-card rounded-3xl p-8 border",
                tier.popular 
                  ? "border-primary-500 shadow-2xl shadow-primary-500/10 md:-translate-y-4" 
                  : "border-border shadow-sm"
              )}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary-600 text-white px-4 py-1 rounded-full text-sm font-semibold tracking-wide">
                  Most Popular
                </div>
              )}
              
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-2">{tier.name}</h3>
                <div className="flex items-baseline text-4xl font-extrabold">
                  {tier.price}
                  <span className="text-lg text-gray-500 dark:text-gray-400 font-medium ml-1">{tier.period}</span>
                </div>
              </div>
              
              <ul className="space-y-4 mb-8">
                {tier.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-start space-x-3">
                    <Check className="w-5 h-5 text-primary-600 shrink-0 mt-0.5" />
                    <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <button className={cn(
                "w-full py-4 rounded-xl font-semibold transition-all",
                tier.popular
                  ? "bg-primary-600 hover:bg-primary-500 text-white shadow-lg shadow-primary-500/25"
                  : "bg-primary-50 hover:bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:hover:bg-primary-900/50 dark:text-primary-400"
              )}>
                {tier.cta}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
