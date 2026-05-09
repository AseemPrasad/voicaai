import { cleanText } from '../utils/parser';

export interface AnalysisResult {
  intent: string;
  business_type: string;
  urgency: string;
  summary: string;
}

const INTENT_RULES: Record<string, string[]> = {
  service_request: ['repair', 'fix', 'broken', 'start', 'service', 'maintenance', 'won\'t'],
  booking: ['book', 'reservation', 'appointment', 'schedule', 'table', 'meet'],
  complaint: ['bad', 'terrible', 'unacceptable', 'wrong', 'complain', 'issue'],
  emergency: ['emergency', 'urgent', 'now', 'hospital', 'pain', 'bleeding', 'crash'],
  inquiry: ['how much', 'cost', 'hours', 'open', 'location', 'where', 'price']
};

const BUSINESS_TYPE_RULES: Record<string, string[]> = {
  auto_repair: ['car', 'vehicle', 'engine', 'tire', 'brake', 'mechanic', 'tow'],
  restaurant: ['food', 'table', 'eat', 'dinner', 'lunch', 'menu', 'delivery', 'catering'],
  medical: ['doctor', 'pain', 'hospital', 'nurse', 'sick', 'prescription'],
  dental: ['tooth', 'teeth', 'dentist', 'cavity', 'gums', 'ache']
};

const URGENCY_RULES: Record<string, string[]> = {
  high: ['emergency', 'urgent', 'now', 'immediately', 'pain', 'bleeding', 'crash', 'won\'t start'],
  medium: ['soon', 'today', 'tomorrow', 'this week', 'need'],
  low: ['whenever', 'next week', 'sometime', 'no rush', 'just asking']
};

const findBestMatch = (text: string, rules: Record<string, string[]>, defaultMatch: string): string => {
  const words = text.split(/\s+/);
  let bestMatch = defaultMatch;
  let maxScore = 0;

  for (const [category, keywords] of Object.entries(rules)) {
    let score = 0;
    for (const word of words) {
      if (keywords.includes(word)) {
        score++;
      }
    }
    
    // Exact phrase matching (simple)
    for (const keyword of keywords) {
      if (keyword.includes(' ') && text.includes(keyword)) {
        score += 2;
      }
    }

    if (score > maxScore) {
      maxScore = score;
      bestMatch = category;
    }
  }

  return bestMatch;
};

export const analyzeWithRules = (message: string): AnalysisResult => {
  const cleanedText = cleanText(message);
  
  const intent = findBestMatch(cleanedText, INTENT_RULES, 'inquiry');
  const business_type = findBestMatch(cleanedText, BUSINESS_TYPE_RULES, 'general');
  const urgency = findBestMatch(cleanedText, URGENCY_RULES, 'low');
  
  // Basic summary generation
  let summary = `Customer is inquiring about ${intent.replace('_', ' ')}.`;
  if (urgency === 'high') {
    summary = `URGENT: ${summary} Requires immediate attention.`;
  }

  return {
    intent,
    business_type,
    urgency,
    summary
  };
};
