"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cleanText = exports.parseJSONResponse = void 0;
const parseJSONResponse = (responseString) => {
    try {
        // Remove markdown blocks if AI returned wrapped JSON
        let cleaned = responseString.replace(/```json/g, '').replace(/```/g, '').trim();
        return JSON.parse(cleaned);
    }
    catch (error) {
        return null;
    }
};
exports.parseJSONResponse = parseJSONResponse;
const cleanText = (text) => {
    return text.replace(/[^\w\s]/gi, '').toLowerCase().trim();
};
exports.cleanText = cleanText;
