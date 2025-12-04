import { GoogleGenAI } from "@google/genai";
import { SearchResponse, GroundingChunk } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Uses Gemini 2.5 Flash with Google Search Grounding to get up-to-date health info.
 */
export const getHealthAdvice = async (query: string): Promise<SearchResponse> => {
  try {
    const model = 'gemini-2.5-flash';
    const response = await ai.models.generateContent({
      model,
      contents: query,
      config: {
        tools: [{ googleSearch: {} }],
        systemInstruction: "Você é um assistente virtual da Clínica Pro Vida. Responda perguntas sobre saúde de forma profissional, ética e baseada em evidências. Sempre lembre o usuário de que sua resposta não substitui uma consulta médica real. Responda em Português do Brasil."
      },
    });

    const text = response.text || "Não foi possível obter uma resposta no momento.";
    
    // Extract sources from grounding chunks
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks as GroundingChunk[] | undefined;
    const sources = chunks
      ? chunks
          .filter(c => c.web)
          .map(c => ({ uri: c.web!.uri, title: c.web!.title || 'Fonte Web' }))
      : [];

    // Remove duplicates based on URI
    const uniqueSources = Array.from(new Map(sources.map(item => [item.uri, item])).values());

    return { text, sources: uniqueSources };
  } catch (error) {
    console.error("Erro no serviço de saúde:", error);
    throw new Error("Falha ao consultar o assistente de saúde.");
  }
};

/**
 * Uses Gemini 2.5 Flash Image to edit images based on text prompts.
 */
export const editMedicalImage = async (base64Image: string, prompt: string): Promise<string> => {
  try {
    const model = 'gemini-2.5-flash-image';
    
    // Extract mimeType and base64 data
    const match = base64Image.match(/^data:(image\/[a-zA-Z+]+);base64,(.+)$/);
    const mimeType = match ? match[1] : 'image/jpeg';
    const cleanBase64 = match ? match[2] : base64Image.replace(/^data:image\/(png|jpeg|jpg|webp);base64,/, '');

    const response = await ai.models.generateContent({
      model,
      contents: {
        parts: [
          {
            inlineData: {
              mimeType,
              data: cleanBase64
            }
          },
          {
            text: prompt
          }
        ]
      }
    });

    // Iterate parts to find the image
    const parts = response.candidates?.[0]?.content?.parts;
    if (parts) {
      for (const part of parts) {
        if (part.inlineData && part.inlineData.data) {
          return `data:image/png;base64,${part.inlineData.data}`;
        }
      }
    }
    
    throw new Error("Nenhuma imagem gerada.");
  } catch (error) {
    console.error("Erro na edição de imagem:", error);
    throw new Error("Falha ao editar a imagem.");
  }
};