'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Play, PhoneCall } from 'lucide-react';
import Link from 'next/link';
import { SITE_DESCRIPTION } from '@/lib/constants';

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-500/20 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center space-x-2 bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 px-4 py-2 rounded-full text-sm font-medium mb-8 border border-primary-100 dark:border-primary-800"
          >
            <span className="flex h-2 w-2 rounded-full bg-primary-600 animate-pulse"></span>
            <span>Now with Dual Analysis Engines</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8"
          >
            Never Miss a <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-blue-400">Customer Call</span> Again
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            {SITE_DESCRIPTION}
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4"
          >
            <Link href="#pricing" className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-primary-600 hover:bg-primary-500 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40">
              <PhoneCall className="w-5 h-5" />
              <span>Book Demo</span>
            </Link>
            <Link href="#analyzer" className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-white dark:bg-card border-2 border-border hover:border-primary-300 dark:hover:border-primary-800 px-8 py-4 rounded-xl text-lg font-semibold transition-all">
              <Play className="w-5 h-5" />
              <span>Try Analyzer</span>
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
