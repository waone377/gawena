import path from "path";
import {
  cekAda,
  buatFolder,
  hapusFolder,
  hapusFile,
  tulisFile,
  data,
} from "../util/files.js";
import Print from "../util/tampilan.js";
import Masukan from "../util/input.js";
import os from "os";
async function generateRepo(source, mode) {
  try {
    const { dataTarget } = await data();
    const lokasi = path.join(
      os.homedir(),
      path.resolve("output").replace("/emulated/0", ""),
    );
    let base = "";
    if (mode === "pembuatan") {
      const nameRepo = Masukan.wajib("masukkan nama project?> ");
      base = path.join(lokasi, nameRepo);
      await buatFolder(base);
    } else if (mode === "perbaikan") {
      base = dataTarget;
    } else {
      const nameRepo = Masukan.wajib("masukkan nama project baru?> ");
      base = path.join(lokasi, nameRepo);
      await buatFolder(base);
    }
    const dir = base.split("/").pop();
    Print.clear(mode, "\nvolder:", dir, "\npath:", base, "\n===\n");
    if (source.delets.length > 0 && mode === "perbaikan") {
      for (const e of source.delets) {
        const p = path.normalize(path.join(base, e.lokasi));
        switch (e.jenis) {
          case "folder":
            await hapusFolder(p);
            Print.log("menghapus folder", e.lokasi);
            break;
          case "file":
            await hapusFile(p);
            Print.log("menghapus file", e.lokasi);
            break;
          default:
            Print.log(
              "ada satu source yang tidak valid untuk dihapus!",
              e.lokasi,
            );
            break;
        }
      }
    }
    // di luar kondisi delets
    mode = mode === "duplikat" ? "modifikasi" : mode;
    if (source.repo.length > 0) {
      for (const e of source.repo) {
        const p = path.normalize(path.join(base, e.lokasi));
        switch (e.jenis) {
          case "folder":
            await buatFolder(p);
            Print.log(mode, "folder", e.lokasi, "succes");
            break;
          case "file":
            await tulisFile(p, e.konten);
            Print.log(mode, "file", e.lokasi, "succes");
            break;
          case "config":
            await tulisFile(p, e.konten);
            Print.log(mode, "file", e.lokasi, "succes");
            break;
          case "dok":
            await tulisFile(p, e.konten);
            Print.log(mode, "file", e.lokasi, "succes");
            break;
          default:
            Print.log("ada satu source yang tidak valid untuk", mode, e.lokasi);
            break;
        }
      }
    }
    Print.log("sukses", mode, "telah dilakukan..");
    await tulisFile("history/output.json", JSON.stringify(source, null, 4));
  } catch (err) {
    throw new Error(`generateRepo() error: ${err.message}`);
  }
}
export default generateRepo;
