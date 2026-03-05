import { GoogleGenAI } from "@google/genai";

export async function askGeminiGeneral(query: string, history: { role: 'user' | 'model', parts: { text: string }[] }[] = []) {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: { parts: [{ text: query }] },
      config: {
        systemInstruction: `You are Sahayata AI, a comprehensive guide to Indian Government Welfare Schemes. 
        Your goal is to help citizens understand their rights and available benefits.
        Provide information about schemes like PM-JAY, PMAY, MGNREGA, PM-Kisan, etc.
        Keep answers simple, empathetic, and actionable. 
        If you don't know a specific detail, advise the user to visit the official portal or nearest CSC (Common Service Centre).`,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini General Error:", error);
    return "I'm having trouble connecting to my knowledge base. Please try again in a moment.";
  }
}

export async function askGeminiAboutScheme(schemeName: string, question: string) {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: question,
      config: {
        systemInstruction: `You are Sahayata AI, a helpful and patient assistant for the government welfare scheme: "${schemeName}". 
        The user is a citizen who might have low literacy or be an elderly person. 
        Answer their question in very simple, plain language. Avoid technical jargon. Be respectful and clear.`,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I'm sorry, I couldn't process your request right now. Please try again later.";
  }
}
