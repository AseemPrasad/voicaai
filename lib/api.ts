import { API_BASE_URL } from './constants';

export interface AnalysisRequest {
  message: string;
  engine: 'openrouter' | 'rule-based';
}

export interface AnalysisResponse {
  success: boolean;
  data?: {
    intent: string;
    business_type: string;
    urgency: string;
    summary: string;
  };
  meta?: {
    engine: string;
    fallback_used: boolean;
  };
  error?: string;
}

export const analyzeMessage = async (params: AnalysisRequest): Promise<AnalysisResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/analyze`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      return {
        success: false,
        error: errData.error || `Server error: ${response.status}`
      };
    }

    return await response.json();
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Network error occurred while analyzing.'
    };
  }
};
