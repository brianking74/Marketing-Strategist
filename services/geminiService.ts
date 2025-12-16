import { GoogleGenAI } from "@google/genai";
import { MarketingInputs } from "../types";
import { SYSTEM_INSTRUCTION, GENERATE_STRATEGY_PROMPT } from "../constants";

// Initialize Gemini Client
// CRITICAL: We use process.env.API_KEY as per instructions.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateMarketingStrategyStream = async (
  inputs: MarketingInputs,
  onChunk: (text: string) => void
) => {
  try {
    const model = 'gemini-3-pro-preview'; // Using the advanced model for reasoning
    const prompt = GENERATE_STRATEGY_PROMPT(inputs);

    const responseStream = await ai.models.generateContentStream({
      model: model,
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        // thinkingConfig: { thinkingBudget: 2048 }, // Optional: Enable thinking for deeper strategy if needed, but pro-preview is smart enough usually.
        temperature: 0.7, 
      }
    });

    for await (const chunk of responseStream) {
      if (chunk.text) {
        onChunk(chunk.text);
      }
    }
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};