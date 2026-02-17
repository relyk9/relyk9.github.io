
import { GoogleGenAI } from "@google/genai";
import { PROJECTS, EXPERIENCE, SKILLS } from '../constants';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `
You are the "MECH_INTEL_CONSULTANT", an AI assistant embedded in the portfolio of a highly skilled Mechanical Engineer (2-3 years of experience).
Your goal is to answer questions about the engineer's work, experience, and skills in a professional but tech-savvy, terminal-like tone.

Context:
- Projects: ${JSON.stringify(PROJECTS)}
- Experience: ${JSON.stringify(EXPERIENCE)}
- Skills: ${JSON.stringify(SKILLS)}

Tone: Concise, informative, slightly futuristic/terminal inspired. Use engineering terminology appropriately.
If asked about something not in the context, politely state that you can only provide information related to the engineer's portfolio.
`;

export const getAIResponse = async (userMessage: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userMessage,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
        topP: 0.9,
      },
    });

    return response.text || "SYSTEM_ERROR: UNABLE_TO_RETRIEVE_DATA";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "CONNECTION_INTERRUPTED: Check console for logs.";
  }
};
