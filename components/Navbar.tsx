import Link from 'next/link';
import { ThemeToggle } from './ThemeToggle';
import { Mic } from 'lucide-react';
import { SITE_NAME } from '@/lib/constants';

export function Navbar() {
  return (
    <nav className="fixed w-full z-50 glass border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <div className="bg-primary-600 p-2 rounded-lg">
              <Mic className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight">{SITE_NAME}</span>
          </Link>
          
          <div className="hidden md:flex space-x-8 items-center">
            <Link href="#features" className="text-sm font-medium hover:text-primary-600 transition-colors">Features</Link>
            <Link href="#use-cases" className="text-sm font-medium hover:text-primary-600 transition-colors">Use Cases</Link>
            <Link href="#pricing" className="text-sm font-medium hover:text-primary-600 transition-colors">Pricing</Link>
            <Link href="#faq" className="text-sm font-medium hover:text-primary-600 transition-colors">FAQ</Link>
          </div>

          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Link href="#analyzer" className="hidden md:inline-flex bg-primary-600 hover:bg-primary-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Try Analyzer
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
