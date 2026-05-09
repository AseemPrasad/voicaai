"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const zod_1 = require("zod");
const openrouter_service_1 = require("../services/openrouter.service");
const rules_service_1 = require("../services/rules.service");
const prisma_1 = require("../db/prisma");
const logger_1 = require("../utils/logger");
const router = (0, express_1.Router)();
const AnalyzeRequestSchema = zod_1.z.object({
    message: zod_1.z.string().min(1, 'Message is required'),
    engine: zod_1.z.enum(['openrouter', 'rule-based']).default('openrouter')
});
router.post('/analyze', async (req, res) => {
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
            result = await (0, openrouter_service_1.analyzeWithAI)(message);
            if (!result) {
                logger_1.logger.warn('OpenRouter failed or timed out, falling back to rule-based engine');
                result = (0, rules_service_1.analyzeWithRules)(message);
                usedEngine = 'rule-based';
                fallbackTriggered = true;
            }
        }
        else {
            result = (0, rules_service_1.analyzeWithRules)(message);
        }
        // Log to database asynchronously
        prisma_1.prisma.analysisLog.create({
            data: {
                message,
                engine: usedEngine,
                intent: result.intent,
                businessType: result.business_type,
                urgency: result.urgency,
                summary: result.summary
            }
        }).catch(err => {
            logger_1.logger.error('Failed to log analysis to database', err);
        });
        return res.json({
            success: true,
            data: result,
            meta: {
                engine: usedEngine,
                fallback_used: fallbackTriggered
            }
        });
    }
    catch (error) {
        logger_1.logger.error('Analyze route error', error);
        return res.status(500).json({ success: false, error: 'Internal server error' });
    }
});
exports.default = router;
