import { GoogleGenAI } from "@google/genai";
import customSchema from "./schema.js";
import { Fs, Dir } from "../util/file.js";
import "dotenv/config";

let instruction_p = "src/mesin/instruction.md";
let apiKey = process.env.API_KEY_GEMINI;

// ... inisialisasi dan konfigurasi model Gemini AI
function LLM() {
  // ... memulai blok try-catch untuk penanganan error
  try {
    // ... membaca instruksi sistem dari file
    const instruction = Fs.baca(instruction_p, "");
    // ... membuat instance GoogleGenAI dengan API key
    const AI = new GoogleGenAI({ apiKey });
    // ... membuat chat session dengan model yang dikonfigurasi
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
    // ... mengembalikan objek model dan AI
    return { model, AI };
  } catch (err) {
    // ... menangkap dan melempar kembali error jika terjadi masalah
    throw new Error(`LLM: ${err.message}`);
  }
}
export default LLM;
