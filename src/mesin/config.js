import { GoogleGenAI } from "@google/genai";
import customSchema from "./schema.js";
import { Fs, Dir } from "../util/file.js";
import "dotenv/config";

/* Lokasi default berkas instruksi sistem AI */
let instruction_p = "src/mesin/instruction.md";
/* Kunci API Gemini yang diambil dari variabel lingkungan */
let apiKey = process.env.API_KEY_GEMINI;

/* Fungsi inisialisasi untuk konfigurasi model bahasa besar (LLM) */
function LLM() {
  try {
    /* Membaca instruksi sistem dari berkas markdown */
    const instruction = Fs.baca(instruction_p, "");
    /* Membuat instance client Google Gen AI */
    const AI = new GoogleGenAI({ apiKey });
    /* Membuat konfigurasi sesi obrolan model AI */
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
    /* Menangani kegagalan inisialisasi konfigurasi LLM */
    throw new Error(`LLM: ${err.message}`);
  }
}
export default LLM;
