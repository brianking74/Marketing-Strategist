
import { GoogleGenAI } from "@google/genai";
import { MarketingInputs } from "../types";
import { SYSTEM_INSTRUCTION, GENERATE_STRATEGY_PROMPT } from "../constants";

// Global instance removed to comply with "Create instance right before making an API call" rule.

export const generateMarketingStrategyStream = async (
  inputs: MarketingInputs,
  onChunk: (text: string) => void
) => {
  // Always create a new instance right before the call to ensure the latest API key is used.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    const model = 'gemini-3-pro-preview';
    const prompt = GENERATE_STRATEGY_PROMPT(inputs);

    const responseStream = await ai.models.generateContentStream({
      model: model,
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
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

export interface VideoParams {
  setting: string;
  presenterGender: string;
  presenterAge: string;
  presenterStyle: string;
  script: string;
  refinements: string[];
  aspectRatio: '16:9' | '9:16';
  resolution: '720p' | '1080p';
  productImageBase64?: string;
}

export const generateVideo = async (params: VideoParams, onStatus: (msg: string) => void) => {
  // Always create a new instance right before the call to ensure the latest API key is used.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `A professional high-quality video for a wine brand. 
    Setting: ${params.setting}. 
    Presenter: A ${params.presenterAge} year old ${params.presenterGender} with a ${params.presenterStyle} style. 
    Action: ${params.refinements.join(', ')}. 
    Script context: ${params.script}. 
    The video should feel cinematic and high-end.`;

  onStatus("Initializing Video Engine...");

  try {
    let operation = await ai.models.generateVideos({
      model: 'veo-3.1-fast-generate-preview',
      prompt: prompt,
      image: params.productImageBase64 ? {
        imageBytes: params.productImageBase64.split(',')[1],
        mimeType: 'image/png'
      } : undefined,
      config: {
        numberOfVideos: 1,
        resolution: params.resolution,
        aspectRatio: params.aspectRatio
      }
    });

    const loadingMessages = [
      "Simulating camera movements...",
      "Lighting the scene...",
      "Rendering textures and reflections...",
      "Synthesizing presenter movements...",
      "Polishing the final frames...",
      "Almost ready for the premiere..."
    ];
    
    let msgIndex = 0;
    while (!operation.done) {
      onStatus(loadingMessages[msgIndex % loadingMessages.length]);
      msgIndex++;
      await new Promise(resolve => setTimeout(resolve, 10000));
      operation = await ai.operations.getVideosOperation({ operation: operation });
    }

    const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
    if (!downloadLink) throw new Error("Video generation failed to return a valid URI.");

    const videoResponse = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
    const blob = await videoResponse.blob();
    return URL.createObjectURL(blob);
  } catch (error) {
    console.error("Video Generation Error:", error);
    throw error;
  }
};
