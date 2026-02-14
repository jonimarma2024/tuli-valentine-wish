
import { GoogleGenAI } from "@google/genai";

/**
 * Generates an evocative, romantic love poem for a given name using Gemini 3 Flash.
 */
export const generateLovePoem = async (name: string): Promise<string> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key not found");
  }

  const ai = new GoogleGenAI({ apiKey });
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Write a short, incredibly beautiful and poetic Valentine's Day message for ${name}. 
      Use soft, evocative imagery (stars, light, gardens, magic). 
      Format it as a 2-to-4 line poem with line breaks. 
      Do not include any greeting or signature, just the poem. 
      Make it feel high-end, timeless, and deeply sincere.`,
      config: {
        temperature: 1.0, // Higher temperature for more creative/poetic variations
        topP: 0.95,
        maxOutputTokens: 150,
      }
    });

    const text = response.text;
    if (!text) {
      return "In your eyes, the stars align,\nMy heart is yours, and you are mine. ❤️";
    }

    return text.trim().replace(/^["']|["']$/g, '');
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Your love is a song my heart always knows,\nA beautiful light that continuously grows. ❤️";
  }
};
