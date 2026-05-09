import { logger } from '../utils/logger';
import { parseJSONResponse } from '../utils/parser';
import { AnalysisResult } from './rules.service';

const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';
const TIMEOUT_MS = 10000; // 10 second timeout

export const analyzeWithAI = async (message: string): Promise<AnalysisResult | null> => {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey || apiKey === 'sk-or-placeholder') {
    logger.warn('OpenRouter API key is not configured or invalid.');
    return null;
  }

  const prompt = `
You are an expert customer service intent analyzer. Analyze the following customer message and extract the details in valid JSON format.
Message: "${message}"

Expected JSON Output format:
{
  "intent": "service_request|booking|complaint|inquiry|emergency",
  "business_type": "auto_repair|restaurant|medical|dental|general",
  "urgency": "low|medium|high",
  "summary": "A brief 1-2 sentence summary of the message"
}

Respond ONLY with the JSON object, without any markdown formatting, backticks or extra text.
  `.trim();

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const response = await fetch(OPENROUTER_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'http://localhost:3000',
        'X-Title': 'Voice AI Assistant'
      },
      body: JSON.stringify({
        model: 'openai/gpt-4o-mini', // Default model, can be parameterized
        messages: [{ role: 'user', content: prompt }],
        response_format: { type: 'json_object' }
      }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      logger.error(`OpenRouter API error: ${response.status} ${response.statusText}`);
      return null;
    }

    const data = await response.json();
    if (!data.choices || data.choices.length === 0) {
      return null;
    }

    const aiResponseText = data.choices[0].message.content;
    const parsed = parseJSONResponse(aiResponseText);
    
    if (parsed && parsed.intent && parsed.business_type && parsed.urgency && parsed.summary) {
      return parsed as AnalysisResult;
    }

    logger.warn('AI response missing required fields', parsed);
    return null;
  } catch (error: any) {
    clearTimeout(timeoutId);
    if (error.name === 'AbortError') {
      logger.error('OpenRouter API request timed out');
    } else {
      logger.error('OpenRouter API request failed', error.message);
    }
    return null;
  }
};
