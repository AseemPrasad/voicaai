'use client';

import { motion } from 'framer-motion';
import { USE_CASES } from '@/lib/constants';
import { Wrench, Utensils, Stethoscope } from 'lucide-react';

const iconMap: Record<string, any> = {
  Wrench,
  Utensils,
  Stethoscope
};

export function UseCases() {
  return (
    <section id="use-cases" className="py-24 bg-gray-50 dark:bg-zinc-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Built for Your Industry</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Our Voice AI adapts to your specific business needs, handling industry-specific jargon and workflows with ease.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {USE_CASES.map((useCase, index) => {
            const Icon = iconMap[useCase.icon];
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card border border-border p-8 rounded-2xl shadow-sm hover:shadow-xl hover:border-primary-500/50 transition-all group"
              >
                <div className="bg-primary-50 dark:bg-primary-900/30 w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Icon className="w-7 h-7 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-xl font-bold mb-3">{useCase.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {useCase.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
