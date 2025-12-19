
import { GoogleGenAI, Type, Modality } from "@google/genai";
import { Task, Guest } from "@/types/dashboard";

const ai = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * 1. Creative & Motion Synthesis (Vision/Video)
 */
export async function generateVision(prompt: string, aspectRatio: any = "3:4", imageSize: "1K" | "2K" | "4K" = "1K") {
  const response = await ai().models.generateContent({
    model: 'gemini-3-pro-image-preview',
    contents: { parts: [{ text: `High-fashion luxury editorial: ${prompt}` }] },
    config: { imageConfig: { aspectRatio, imageSize } },
  });
  const imagePart = response.candidates?.[0]?.content?.parts.find(p => p.inlineData);
  return `data:image/png;base64,${imagePart?.inlineData?.data}`;
}

export async function generateMotion(prompt: string, aspectRatio: '16:9' | '9:16' = '16:9') {
  const client = ai();
  let operation = await client.models.generateVideos({
    model: 'veo-3.1-fast-generate-preview',
    prompt: `Cinematic high-fashion motion: ${prompt}`,
    config: { numberOfVideos: 1, resolution: '720p', aspectRatio }
  });
  while (!operation.done) {
    await new Promise(resolve => setTimeout(resolve, 5000));
    operation = await client.operations.getVideosOperation({ operation: operation });
  }
  const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
  const response = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
  return URL.createObjectURL(await response.blob());
}

/**
 * 2. Intelligence Hub & Strategic Lab
 */
export async function analyzeTrend(topic: string, thinkingLevel: 'LOW' | 'HIGH' = 'HIGH') {
  const budget = thinkingLevel === 'HIGH' ? 24000 : 8000;
  const response = await ai().models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Synthesize a deep market report for: "${topic}".`,
    config: { tools: [{ googleSearch: {} }], thinkingConfig: { thinkingBudget: budget } }
  });
  return { 
    text: response.text,
    sources: response.candidates?.[0]?.groundingMetadata?.groundingChunks?.map((chunk: any) => ({
      title: chunk.web?.title || "Industry Reference",
      uri: chunk.web?.uri,
    })) || [],
  };
}

export async function generatePressRelease(brief: string) {
  const res = await ai().models.generateContent({ model: "gemini-3-flash-preview", contents: `Write a high-luxury press release for: ${brief}` });
  return res.text;
}

export async function checkLogistics(brief: string) {
  const res = await ai().models.generateContent({ 
    model: "gemini-3-flash-preview", 
    contents: `Logistics risk audit: ${brief}`,
    config: { tools: [{ googleSearch: {} }] }
  });
  return { text: res.text };
}

export async function forecastBudget(brief: string) {
  const res = await ai().models.generateContent({ 
    model: 'gemini-3-pro-preview', 
    contents: `Generate a financial ROI forecast for: ${brief}`,
    config: { thinkingConfig: { thinkingBudget: 12000 } }
  });
  return res.text;
}

export async function generateWholesaleStrategy(brief: string) {
  const res = await ai().models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Generate a wholesale buy-sheet and retailer strategy for: ${brief}. Output as JSON.`,
    config: { responseMimeType: "application/json", thinkingConfig: { thinkingBudget: 12000 } }
  });
  return JSON.parse(res.text);
}

export async function reviewLegalRights(brief: string) {
  const res = await ai().models.generateContent({ model: 'gemini-3-flash-preview', contents: `Legal rights & talent usage audit: ${brief}` });
  return res.text;
}

/**
 * 3. Workflow & Risk Orchestration
 */
export async function generateProjectWorkflow(brief: string) {
  const res = await ai().models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Convert this project brief into a structured fashion project workflow: "${brief}". 
               Output an array of task objects with: title, phase (Concept/Sourcing/Production/Logistics), description, owner, and subtasks (array of labels).`,
    config: { responseMimeType: "application/json" }
  });
  return JSON.parse(res.text);
}

export async function generateTaskInsight(task: Task) {
  const res = await ai().models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Provide a strategic execution tip for this fashion task: ${JSON.stringify(task)}`,
    config: { systemInstruction: "You are the fashionOS Strategic Agent. Provide concise, expert advice." }
  });
  return res.text;
}

export async function analyzeCriticalPath(tasks: Task[]) {
  const res = await ai().models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Analyze these tasks and identify the critical path sequence: ${JSON.stringify(tasks)}`,
    config: { thinkingConfig: { thinkingBudget: 16000 } }
  });
  return res.text;
}

export async function simulateCascade(tasks: Task[], event: string) {
  const res = await ai().models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Scenario: "${event}". Simulate cascading delays in this task graph: ${JSON.stringify(tasks)}`,
    config: { thinkingConfig: { thinkingBudget: 8000 } }
  });
  return res.text;
}

/**
 * 4. Relationship Intelligence (CRM)
 */
export async function enrichContact(query: string) {
  const res = await ai().models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Perform high-fashion PR research on: "${query}". Include FullName, Affiliation, Role, InfluenceTier (VIP/Press/Buyer), and a StrategicDossier. Output JSON.`,
    config: { responseMimeType: "application/json", tools: [{ googleSearch: {} }] }
  });
  return JSON.parse(res.text);
}

export async function analyzeStakeholders(brief: string) {
  const res = await ai().models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Map global stakeholders and industry risks for: "${brief}".`,
    config: { tools: [{ googleSearch: {} }] }
  });
  return { 
    text: res.text,
    sources: res.candidates?.[0]?.groundingMetadata?.groundingChunks?.map((chunk: any) => ({
      title: chunk.web?.title || "Industry Report",
      uri: chunk.web?.uri,
    })) || [],
  };
}

/**
 * 5. Event Operations
 */
export async function optimizeSeating(guests: Guest[], brief: string) {
  const res = await ai().models.generateContent({ model: "gemini-3-flash-preview", contents: `Optimize seating for: ${JSON.stringify(guests)}. Context: ${brief}` });
  return res.text;
}

export async function generateSpeech(text: string) {
  const response = await ai().models.generateContent({
    model: "gemini-2.5-flash-preview-tts",
    contents: [{ parts: [{ text: `Read this luxury briefing: ${text}` }] }],
    config: {
      responseModalities: [Modality.AUDIO],
      speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } } },
    },
  });
  return response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
}

export function connectLive(callbacks: any) {
  return ai().live.connect({
    model: 'gemini-2.5-flash-native-audio-preview-09-2025',
    callbacks,
    config: {
      responseModalities: [Modality.AUDIO],
      systemInstruction: 'You are the fashionOS Core Voice Agent. Orchestrate show logistics and strategy via voice.',
    },
  });
}

export function createStrategicAgent() {
  return ai().chats.create({
    model: "gemini-3-flash-preview",
    config: { systemInstruction: "You are the fashionOS Strategic Agent." }
  });
}

export async function auditSustainability(data: string) {
  const res = await ai().models.generateContent({ model: "gemini-3-flash-preview", contents: `ESG Sustainability Audit: ${data}` });
  return res.text;
}
