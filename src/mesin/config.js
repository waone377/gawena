import { GoogleGenAI } from "@google/genai";
import customSchema from "./schema.js";
import { Fs, Dir } from "../util/file.js";
import "dotenv/config";

let instruction_p = "src/mesin/instruction.md";
let apiKey = process.env.API_KEY_GEMINI;

// Menginisialisasi dan mengonfigurasi sesi chat dengan Google Gemini API
function LLM() {
  // Membungkus konfigurasi model dengan penanganan error
  try {
    // Membaca instruksi sistem dari file eksternal
    const instruction = Fs.baca(instruction_p, "");
    // Membuat instance GoogleGenAI dengan API Key
    const AI = new GoogleGenAI({ apiKey });
    // Membuat sesi chat model Gemini dengan parameter dan skema respons JSON
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
    // Mengembalikan objek model dan AI yang siap digunakan
    return { model, AI };
  } catch (err) {
    // Melempar error inisialisasi model
    throw new Error(`LLM: ${err.message}`);
  }
}
export default LLM;
