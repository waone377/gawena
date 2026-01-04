import genAi from "../mesin/gemini.js";
import os from "os";
import path from "path";
import { data, tulisFile } from "../util/files.js";
import Masukan from "../util/input.js";
import Print from "../util/tampilan.js";
import readRepo from "../service/read_repo.js";
import generateRepo from "../service/generate_repo.js";
import Prompt from "../service/opsi_prompt.js";
async function duplikat() {
  try {
    let target = "";
    const { dataTarget } = await data();

    if (dataTarget) {
      Print.clear("riwayat project target:\n", dataTarget);
      const pake = Masukan.pilih(
        "gunakan lokasi project terakhir tersebut (y/n)?> ",
        ["y", "n"],
      );
      target =
        pake === "y"
          ? dataTarget
          : Masukan.wajib("masukkan lokasi project target?> ");
    } else {
      target = Masukan.wajib("masukkan lokasi project target?> ");
    }

    let p = "";
    if (target !== dataTarget) {
      p = path.join(
        os.homedir(),
        path.resolve(target).replace("/emulated/0", ""),
      );
    } else {
      p = dataTarget;
    }

    if (target.startsWith("~/")) {
      p = path.join(os.homedir(), target.substr(2));
    }
    await tulisFile(
      "history/target.json",
      JSON.stringify({ target: p }, null, 4),
    );
    const markdown = await readRepo(p);
    const prompt = await Prompt.duplikat();
    const pesan = `konteksnya DUPLIKAT:\ncermatilah repositori project ini dengan teliti:${markdown}\n\n**tugasnya anda itu:\n${prompt}`;
    const res = await genAi(pesan);
    await generateRepo(res, "duplikat");
  } catch (err) {
    throw new Error(`duplikat() error: ${err.message}`);
  }
}
export default duplikat;
