import genAi from "../mesin/gemini.js";
import os from "os";
import path from "path";
import { data, tulisFile } from "../util/files.js";
import Masukan from "../util/input.js";
import Print from "../util/tampilan.js";
import readRepo from "../service/read_repo.js";
import generateRepo from "../service/generate_repo.js";
import Prompt from "../service/opsi_prompt.js";
async function perbaikan() {
  try {
    let target = "";
    const { dataTarget } = await data();

    if (dataTarget) {
      Print.clear("riwayat target history:\n", dataTarget);
      const pake = Masukan.pilih(
        "gunakan lokasi repository terakhir tersebut (y/n)?> ",
        ["y", "n"],
      );
      target =
        pake === "y"
          ? dataTarget
          : Masukan.wajib("masukkan lokasi repository target?> ");
    } else {
      target = Masukan.wajib("masukkan lokasi repository target?> ");
    }

    let p = target;
    if (target.startsWith("~/")) {
      p = path.join(os.homedir(), target.substr(2));
    }
    await tulisFile(
      "history/target.json",
      JSON.stringify({ target: path.resolve(p) }, null, 4),
    );
    const markdown = await readRepo(p);
    const prompt = await Prompt.perbaikan();
    const pesan = `cermatilah repositori project saya ini dengan teliti:${markdown}\n\n**tugasnya anda itu:**\n\n${prompt}`;
    const res = await genAi(pesan);
    await generateRepo(res, "perbaikan");
  } catch (err) {
    throw new Error(`perbaikan() error: ${err.message}`);
  }
}
export default perbaikan;
