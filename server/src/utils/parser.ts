export const parseJSONResponse = (responseString: string): any => {
  try {
    // Remove markdown blocks if AI returned wrapped JSON
    let cleaned = responseString.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(cleaned);
  } catch (error) {
    return null;
  }
};

export const cleanText = (text: string): string => {
  return text.replace(/[^\w\s]/gi, '').toLowerCase().trim();
};
