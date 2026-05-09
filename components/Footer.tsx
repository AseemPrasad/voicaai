import Link from 'next/link';
import { SITE_NAME } from '@/lib/constants';
import { Mic } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-card border-t border-border pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="bg-primary-600 p-1.5 rounded-md">
                <Mic className="h-4 w-4 text-white" />
              </div>
              <span className="font-bold text-lg">{SITE_NAME}</span>
            </Link>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Automating customer interactions with intelligent voice AI.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-gray-400 hover:text-primary-600 transition-colors text-sm">
                Twitter
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-600 transition-colors text-sm">
                GitHub
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-600 transition-colors text-sm">
                LinkedIn
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
              <li><Link href="#features" className="hover:text-foreground transition-colors">Features</Link></li>
              <li><Link href="#use-cases" className="hover:text-foreground transition-colors">Use Cases</Link></li>
              <li><Link href="#pricing" className="hover:text-foreground transition-colors">Pricing</Link></li>
              <li><Link href="#analyzer" className="hover:text-foreground transition-colors">Interactive Demo</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
              <li><a href="#" className="hover:text-foreground transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">API Reference</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Community</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
              <li><a href="#" className="hover:text-foreground transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 dark:text-gray-400">
          <p>© {new Date().getFullYear()} {SITE_NAME}. All rights reserved.</p>
          <p className="mt-2 md:mt-0">Powered by OpenRouter AI</p>
        </div>
      </div>
    </footer>
  );
}
