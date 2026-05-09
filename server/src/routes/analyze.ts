import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { analyzeWithAI } from '../services/openrouter.service';
import { analyzeWithRules } from '../services/rules.service';
import { prisma } from '../db/prisma';
import { logger } from '../utils/logger';

const router = Router();

const AnalyzeRequestSchema = z.object({
  message: z.string().min(1, 'Message is required'),
  engine: z.enum(['openrouter', 'rule-based']).default('openrouter')
});

router.post('/analyze', async (req: Request, res: Response): Promise<any> => {
  try {
    const parseResult = AnalyzeRequestSchema.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({ success: false, error: parseResult.error.issues[0].message });
    }

    const { message, engine } = parseResult.data;
    let result = null;
    let usedEngine = engine;
    let fallbackTriggered = false;

    if (engine === 'openrouter') {
      result = await analyzeWithAI(message);
      if (!result) {
        logger.warn('OpenRouter failed or timed out, falling back to rule-based engine');
        result = analyzeWithRules(message);
        usedEngine = 'rule-based';
        fallbackTriggered = true;
      }
    } else {
      result = analyzeWithRules(message);
    }

    // Log to database asynchronously
    prisma.analysisLog.create({
      data: {
        message,
        engine: usedEngine,
        intent: result.intent,
        businessType: result.business_type,
        urgency: result.urgency,
        summary: result.summary
      }
    }).catch(err => {
      logger.error('Failed to log analysis to database', err);
    });

    return res.json({
      success: true,
      data: result,
      meta: {
        engine: usedEngine,
        fallback_used: fallbackTriggered
      }
    });

  } catch (error) {
    logger.error('Analyze route error', error);
    return res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

export default router;
