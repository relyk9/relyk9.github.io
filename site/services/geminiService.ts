import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export interface NewsItem {
  title: string;
  summary: string;
  url: string;
  source: string;
  date: string;
}

export const fetchTechNews = async (): Promise<NewsItem[]> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: "Find the latest 5 interesting and exciting news articles from the world of technology, mechanical engineering, and science. Provide the results as a JSON array of objects with 'title', 'summary', 'url', 'source', and 'date' fields.",
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
      },
    });

    const text = response.text;
    if (!text) return [];
    
    return JSON.parse(text) as NewsItem[];
  } catch (error) {
    console.error("Error fetching news:", error);
    return [];
  }
};
