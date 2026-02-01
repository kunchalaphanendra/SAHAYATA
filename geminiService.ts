
import { GoogleGenAI } from "@google/genai";

export const askGeminiAboutScheme = async (schemeName: string, question: string) => {
  try {
    // Fix: Initializing GoogleGenAI using Vite's import.meta.env for environment variables
    const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Context: Government Scheme "${schemeName}". 
      The user is a citizen who might have low literacy or be an elderly person. 
      Answer their question in very simple, plain language. 
      Question: "${question}"`,
    });
    // Accessing the text property directly from GenerateContentResponse
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I'm sorry, I couldn't process your request right now. Please try again later.";
  }
};
