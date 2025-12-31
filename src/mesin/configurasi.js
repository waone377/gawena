import { GoogleGenAI } from "@google/genai";
import "dotenv/config";
import mainSchema from "./schema.js";
import { data } from "../util/files.js";

async function configGenAi(isHistory = false) {
  try {
    const AI = new GoogleGenAI({ apiKey: process.env.GEMINI_API });
    let history = [];
    const { dataHistory, dataIntruksi } = await data();
    if (isHistory) {
      history = dataHistory;
    }
    const chat = AI.chats.create({
      model: process.env.MODEL,
      config: {
        temperature: process.env.TEMPERATURE,
        systemInstruction: dataIntruksi,
        thinkingConfig: {
          includeThoughts: true,
          thinkingBudget: process.env.PEMIKIRAN,
        },
        tools: [],
        responseMimeType: "application/json",
        responseSchema: mainSchema,
        generationConfig: {
          maxOutputTokens: process.env.MAX_OUTPUT,
          presencePenalty: 8,
          frequencyPenalty: 16,
          enableEnhancedCivicAnswers: false,
        },
      },
      history: history,
    });
    return {
      model: chat,
      AI: AI,
    };
  } catch (err) {
    throw new Error(`configGenAi() error: ${err.message}`);
  }
}

export default configGenAi;
