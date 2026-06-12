import { GoogleGenAI } from "@google/genai";
import customSchema from "./schema.js";
import { Fs, Dir } from "../util/file.js";
import "dotenv/config";

let instruction_p = "src/mesin/instruction.md";
let apiKey = process.env.API_KEY_GEMINI;

function LLM() {
  try {
    /* Memanggil fungsi pembaca berkas (IO CRUD) dari file utilitas */
    const instruction = Fs.baca(instruction_p, "");
    /* Memanggil konstruktor GoogleGenAI dari pustaka eksternal */
    const AI = new GoogleGenAI({ apiKey });
    /* Memanggil metode pembuatan chat dari instance GoogleGenAI */
    const model = AI.chats.create({
      model: process.env.MODEL,
      config: {
        temperature: process.env.TEMPERATURE,
        systemInstruction: instruction,
        thinkingConfig: {
          includeThoughts: true,
          thinkingBudget: process.env.PEMIKIRAN,
        },
        tools: [],
        responseMimeType: "application/json",
        responseSchema: customSchema,
        generationConfig: {
          maxOutputTokens: process.env.MAX_OUTPUT,
          presencePenalty: 8,
          frequencyPenalty: 16,
          enableEnhancedCivicAnswers: false,
        },
      },
      history: [],
    });
    return { model, AI };
  } catch (err) {
    throw new Error(`LLM: ${err.message}`);
  }
}
export default LLM;
