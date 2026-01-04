import genAi from "../mesin/gemini.js";
import Print from "../util/tampilan.js";
import generateRepo from "../service/generate_repo.js";
import Prompt from "../service/opsi_prompt.js";

async function pembuatan() {
  try {
    const q = await Prompt.pembuatan();
    const prompt = `konteksnya PEMBUATAN\n:${q}`;
    const res = await genAi(prompt);
    await generateRepo(res, "pembuatan");
  } catch (err) {
    throw new Error(`pembuatan() error: ${err.message}`);
  }
}

export default pembuatan;
