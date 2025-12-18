
import { GoogleGenAI, Type } from "@google/genai";
import { Task } from "@/types/dashboard";

/**
 * Advanced Market Intelligence using Gemini 3 Flash
 */
export async function analyzeTrend(topic: string, thinkingLevel: 'MINIMAL' | 'LOW' | 'MEDIUM' | 'HIGH' = 'HIGH') {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const budgetMap = {
    'MINIMAL': 0,
    'LOW': 4000,
    'MEDIUM': 12000,
    'HIGH': 24000
  };

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Perform a deep vertical analysis of the following fashion market shift: "${topic}". 
                 Evaluate cross-cultural adoption, sustainability metrics, and long-term viability. 
                 Provide a structured forecast including:
                 1. Core Aesthetic Pillars
                 2. Economic Drivers
                 3. Supply Chain Implications
                 4. Strategic Brand Pivot`,
      config: {
        tools: [{ googleSearch: {} }],
        thinkingConfig: { thinkingBudget: budgetMap[thinkingLevel] },
      },
    });

    const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks?.map((chunk: any) => ({
      title: chunk.web?.title || "Industry Intelligence",
      uri: chunk.web?.uri,
    })) || [];

    return {
      text: response.text,
      sources,
    };
  } catch (error) {
    console.error("Intelligence Failure:", error);
    throw new Error("Unable to synchronize with the global fashion graph.");
  }
}

/**
 * Generate specific strategic insights for a task.
 */
export async function generateTaskInsight(task: Task) {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `You are the fashionOS Strategic Agent. Analyze this task and provide a brief, professional strategic insight (max 3 sentences).
                 Task Title: ${task.title}
                 Phase: ${task.phase}
                 Description: ${task.description}
                 Owner: ${task.owner}
                 Subtasks: ${task.subtasks.map(s => s.label).join(", ")}
                 
                 Provide an actionable suggestion or risk assessment that helps the director execute this task more effectively.`,
      config: {
        thinkingConfig: { thinkingBudget: 8000 }
      },
    });

    return response.text;
  } catch (error) {
    console.error("Task Insight Failure:", error);
    throw new Error("The strategic agent is currently re-calibrating.");
  }
}

/**
 * Strategic Vision Synthesis (Image Generation)
 */
export async function generateVision(prompt: string, aspectRatio: "1:1" | "3:4" | "4:3" | "16:9" | "9:16" = "3:4", size: "1K" | "2K" | "4K" = "1K") {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-image-preview',
      contents: {
        parts: [{ text: `High-fashion luxury editorial, cinematic lighting, professional campaign photography: ${prompt}` }],
      },
      config: {
        imageConfig: {
          aspectRatio,
          imageSize: size,
        },
      },
    });

    const imagePart = response.candidates?.[0]?.content?.parts.find(p => p.inlineData);
    if (!imagePart) throw new Error("Image synthesis failed.");

    return `data:image/png;base64,${imagePart.inlineData.data}`;
  } catch (error) {
    console.error("Creative Synthesis Failure:", error);
    throw new Error("The digital loom encountered a creative block.");
  }
}

/**
 * Multimodal Visual Intelligence
 */
export async function analyzeVisualAsset(base64Data: string, mimeType: string) {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: {
        parts: [
          { inlineData: { data: base64Data, mimeType } },
          { text: "Deconstruct this garment or editorial. Identify silhouette, material composition, cultural references, and retail potential." }
        ]
      },
      config: {
        thinkingConfig: { thinkingBudget: 12000 }
      }
    });

    return response.text;
  } catch (error) {
    console.error("Visual Analysis Failure:", error);
    throw new Error("Failed to deconstruct visual asset.");
  }
}

/**
 * Fashion Strategy Chat Session
 */
export function createStrategicAgent() {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  return ai.chats.create({
    model: "gemini-3-flash-preview",
    config: {
      systemInstruction: "You are the fashionOS Strategic Agent. You assist brand directors with data-backed decisions. Your output is precise, sophisticated, and forward-looking.",
      thinkingConfig: { thinkingBudget: 12000 }
    }
  });
}
