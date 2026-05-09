'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Bot, Zap, Loader2, AlertCircle } from 'lucide-react';
import { analyzeMessage, AnalysisResponse } from '@/lib/api';
import { cn } from '@/lib/utils';

export function Analyzer() {
  const [message, setMessage] = useState('');
  const [engine, setEngine] = useState<'openrouter' | 'rule-based'>('openrouter');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResponse | null>(null);

  const handleAnalyze = async () => {
    if (!message.trim()) return;
    
    setLoading(true);
    setResult(null);
    
    const res = await analyzeMessage({ message, engine });
    setResult(res);
    setLoading(false);
  };

  return (
    <section id="analyzer" className="py-24 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-500/10 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Try the AI Analyzer</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Type a sample customer message below to see how our dual-engine AI extracts intent and structures lead data.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start max-w-5xl mx-auto">
          {/* Input Panel */}
          <div className="bg-card border border-border p-6 md:p-8 rounded-3xl shadow-lg">
            <div className="mb-6">
              <label className="block text-sm font-semibold mb-2">Analysis Engine</label>
              <div className="flex bg-gray-100 dark:bg-zinc-800 p-1 rounded-xl">
                <button
                  onClick={() => setEngine('openrouter')}
                  className={cn(
                    "flex-1 flex items-center justify-center space-x-2 py-2.5 rounded-lg text-sm font-medium transition-all",
                    engine === 'openrouter' 
                      ? "bg-white dark:bg-zinc-700 shadow-sm text-foreground" 
                      : "text-gray-500 hover:text-foreground"
                  )}
                >
                  <Bot className="w-4 h-4" />
                  <span>OpenRouter AI</span>
                </button>
                <button
                  onClick={() => setEngine('rule-based')}
                  className={cn(
                    "flex-1 flex items-center justify-center space-x-2 py-2.5 rounded-lg text-sm font-medium transition-all",
                    engine === 'rule-based' 
                      ? "bg-white dark:bg-zinc-700 shadow-sm text-foreground" 
                      : "text-gray-500 hover:text-foreground"
                  )}
                >
                  <Zap className="w-4 h-4" />
                  <span>Rule-Based</span>
                </button>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold mb-2">Customer Message</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="e.g. My car won't start today, I need someone to look at the engine urgently."
                className="w-full bg-transparent border border-border rounded-xl p-4 min-h-[160px] focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none transition-all placeholder:text-gray-400"
              />
            </div>

            <button
              onClick={handleAnalyze}
              disabled={loading || !message.trim()}
              className="w-full flex items-center justify-center space-x-2 bg-primary-600 hover:bg-primary-500 disabled:bg-primary-400 disabled:cursor-not-allowed text-white py-4 rounded-xl font-semibold transition-all shadow-lg shadow-primary-500/25"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Bot className="w-5 h-5" />
              )}
              <span>{loading ? 'Analyzing...' : 'Analyze Message'}</span>
            </button>
          </div>

          {/* Result Panel */}
          <div className="bg-zinc-950 text-gray-300 p-6 md:p-8 rounded-3xl shadow-xl border border-zinc-800 min-h-[400px] flex flex-col font-mono text-sm">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-zinc-800">
              <span className="text-zinc-400">Analysis Result</span>
              {result?.meta && (
                <span className={cn(
                  "text-xs px-2.5 py-1 rounded-full flex items-center space-x-1",
                  result.meta.fallback_used ? "bg-amber-500/20 text-amber-400" : "bg-emerald-500/20 text-emerald-400"
                )}>
                  <span className={cn("w-1.5 h-1.5 rounded-full", result.meta.fallback_used ? "bg-amber-400" : "bg-emerald-400")}></span>
                  <span>{result.meta.engine} {result.meta.fallback_used && '(Fallback)'}</span>
                </span>
              )}
            </div>

            <div className="flex-1">
              {!result && !loading && (
                <div className="h-full flex items-center justify-center text-zinc-600 italic">
                  Awaiting input...
                </div>
              )}
              
              {loading && (
                <div className="h-full flex items-center justify-center space-x-3 text-primary-400">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Processing natural language...</span>
                </div>
              )}

              {result && !result.success && (
                <div className="flex items-start space-x-3 text-red-400 bg-red-400/10 p-4 rounded-xl">
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <span>{result.error || 'An unexpected error occurred.'}</span>
                </div>
              )}

              {result && result.success && result.data && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-4"
                >
                  <pre className="whitespace-pre-wrap leading-relaxed">
                    <span className="text-zinc-500">{'{'}</span>{'\n'}
                    {'  '}<span className="text-blue-400">"intent"</span><span className="text-zinc-500">: </span><span className="text-emerald-400">"{result.data.intent}"</span><span className="text-zinc-500">,</span>{'\n'}
                    {'  '}<span className="text-blue-400">"business_type"</span><span className="text-zinc-500">: </span><span className="text-emerald-400">"{result.data.business_type}"</span><span className="text-zinc-500">,</span>{'\n'}
                    {'  '}<span className="text-blue-400">"urgency"</span><span className="text-zinc-500">: </span><span className="text-emerald-400">"{result.data.urgency}"</span><span className="text-zinc-500">,</span>{'\n'}
                    {'  '}<span className="text-blue-400">"summary"</span><span className="text-zinc-500">: </span><span className="text-emerald-400">"{result.data.summary}"</span>{'\n'}
                    <span className="text-zinc-500">{'}'}</span>
                  </pre>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
