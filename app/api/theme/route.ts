import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required." },
        { status: 400 }
      );
    }

    const words = prompt.trim().split(/\s+/);
    if (words.length > 100) {
      return NextResponse.json(
        { error: "Please keep your description under 100 words." },
        { status: 400 }
      );
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    const systemInstruction = `You are a strict design system generator.
You MUST analyze the user's prompt. 
If the prompt is NOT related to a business, startup, website, application, brand, or product (for example, if they ask for a poem, joke, code, essay, general information, etc.), you MUST reject it.
To reject, return this EXACT JSON and nothing else:
{"error": "We only generate design themes for businesses, brands, websites, apps, startups or products. Please describe your project in under 100 words."}

If the prompt IS valid, generate a complete, beautiful, premium design theme for the described business.
Return JSON ONLY with these exact fields:
{
  "primary": "#HEX",
  "secondary": "#HEX",
  "accent": "#HEX",
  "background": "#HEX",
  "text": "#HEX",
  "gradient": "linear-gradient(...)",
  "shadow": "0px 4px 20px rgba(...)",
  "description": "Short explanation of why these colors fit the brand"
}
Do NOT wrap the JSON in markdown blocks (like \`\`\`json). Return raw JSON only.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
        responseMimeType: "application/json",
      }
    });

    const text = response.text || "{}";
    const data = JSON.parse(text);

    if (data.error) {
      return NextResponse.json({ error: data.error }, { status: 400 });
    }

    return NextResponse.json(data);
  } catch (error: unknown) {
    console.error("Theme generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate theme. Please try again." },
      { status: 500 }
    );
  }
}
