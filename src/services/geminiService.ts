import { GoogleGenAI } from "@google/genai";
import { StructureData, TAX_ANALYSIS_SCHEMA } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function analyzeStructure(data: StructureData) {
  const prompt = `
    Analyze the following tax structure for a professional tax advisor. 
    
    CRITICAL FOCUS:
    1. International tax issues for the structure.
    2. Double Taxation Agreements (DTA) between Hong Kong and other involved countries (especially the PRC, Singapore, UK, etc.).
    3. Beneficial ownership requirements for treaty benefits.
    4. Potential BEPS 2.0 implications (Pillar Two) if applicable.
    5. Hong Kong's FSIE (Foreign-Sourced Income Exemption) regime.
    
    Structure Data:
    Entities: ${JSON.stringify(data.entities)}
    Relationships: ${JSON.stringify(data.relationships)}
    
    Provide a detailed analysis including investor considerations, structure considerations, downstream implications, a draft step plan, and suggested refinements.
  `;

  const maxRetries = 3;
  let lastError: any;

  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: TAX_ANALYSIS_SCHEMA,
          systemInstruction: "You are a world-class tax structuring expert specializing in Hong Kong and international tax law. You provide precise, professional, and actionable tax advice.",
        },
      });

      return JSON.parse(response.text);
    } catch (error) {
      console.error(`Attempt ${i + 1} failed:`, error);
      lastError = error;
      // Wait before retrying (exponential backoff)
      await new Promise(resolve => setTimeout(resolve, Math.pow(2, i) * 1000));
    }
  }

  throw lastError;
}
