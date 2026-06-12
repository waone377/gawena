import fg from "fast-glob";
import { Fs, Dir } from "../util/file.js";
import Print from "../util/console.js";
import Masukan from "../util/masukan.js";
import { cwd, potong } from "../service/lokasi.js";
import History from "../service/history.js";
import history_p from "../util/lokasi.js";
import getIgnored from "./ignored.js";

function getPath(target) {
  try {
    /* Memanggil fungsi pengambil daftar berkas pengecualian dari file service */
    const { h, confirm, ignored } = getIgnored(target);
    let ignore = ["**/*.mp3", "node_modules/**", ".git/**", "dist/**"];
    /* Memeriksa kondisi jika pengguna memilih untuk mengonfigurasi pengecualian baru */
    if (confirm === "n") {
      /* Memanggil fungsi pembersihan layar dari file utilitas */
      Print.clear("masukan berkas yang ingin dikecualikan:");
      /* Memanggil fungsi pencetakan log dari file utilitas */
      Print.log("format untuk folder: node_modules/**");
      /* Memanggil fungsi pencetakan log dari file utilitas */
      Print.log("format untuk file: **/example.zip");
      /* Memanggil fungsi pencetakan log dari file utilitas */
      Print.log("format untuk extensi: **/*.txt");
      /* Memanggil fungsi pencetakan log dari file utilitas */
      Print.log("pisahkan dengan koma(,)");
      /* Memanggil fungsi pencetakan log dari file utilitas */
      Print.log("contoh: node_modules/**, **/compres.zip, **/*.mp3");
      /* Memanggil fungsi pencetakan log dari file utilitas */
      Print.log("kosongkan jika tidak ada");
      /* Memanggil fungsi masukan biasa dari file utilitas */
      const berkasUsr = Masukan.biasa("silakan?> ");
      /* Memeriksa kondisi jika pengguna memberikan input */
      if (berkasUsr) {
        const berkasArray = berkasUsr
          .split(",")
          .map((e) => e.trim())
          .filter(Boolean);
        /* Memanggil metode findIndex untuk mencari indeks target */
        const index = h.findIndex((e) => e.target === target);
        h[index] = { target, ignored: berkasArray };
        /* Memanggil fungsi penyimpan riwayat (IO CRUD) dari file service */
        History.save(history_p.ignore, h);
        ignore = [...ignore, ...berkasArray];
      }
    } else {
      ignore = [...ignore, ...ignored];
    }
    /* Memanggil fungsi pencarian berkas sinkron dari pustaka fast-glob */
    const paths = fg.sync("**/*", {
      cwd: target.replace("/music", "/Music"),
      ignore: ignore,
      onlyFiles: true,
      absolute: true,
    });
    return paths;
  } catch (err) {
    throw new Error(`getPath: ${err.message}`);
  }
}

function repositoryJson(paths, target) {
  /* Melakukan perulangan pemetaan untuk membaca setiap berkas */
  const code = paths.map((e) => {
    /* Memanggil fungsi pemotong lokasi relatif dari file service */
    const lokasi = potong(target, e);
    /* Memanggil fungsi pembaca berkas (IO CRUD) dari file utilitas */
    const value = Fs.baca(e, "");
    return { jenis: "file", lokasi: lokasi, konten: value };
  });
  const project = {
    dir: target,
    project: code,
    delets: [],
    laporan: "",
  };
  /* Memanggil fungsi penyimpan riwayat (IO CRUD) dari file service */
  History.save(history_p.projectJson, project);
}

function repositoryMD(target, source) {
  const head = `\project lokasi: ${target}\n### source code:\n`;
  const md_array = [head, ...source];
  const markdown = md_array.join("-----\n");
  /* Memanggil fungsi penulisan berkas (IO CRUD) dari file utilitas */
  Fs.tulis(history_p.projectMarkdown, markdown.trim());
  return markdown.trim();
}

function directory(target) {
  try {
    /* Memanggil fungsi pengambil daftar berkas dari file lokal */
    const paths = getPath(target);
    /* Memanggil fungsi pembersihan layar dari file utilitas */
    Print.clear("sedang membaca directory...");
    /* Melakukan perulangan pemetaan untuk memproses konten setiap berkas */
    const source = paths.map((e) => {
      /* Memanggil fungsi pemotong lokasi relatif dari file service */
      const lokasi = potong(target, e);
      /* Memanggil fungsi pencetakan log dari file utilitas */
      Print.log("membaca ", lokasi);
      const extensi = lokasi.split(".")[1];
      /* Memanggil fungsi pembaca berkas (IO CRUD) dari file utilitas */
      const value = Fs.baca(e, "");
      return `lokasi:\n${lokasi}\n\`\`\`${extensi}\n${value}\`\`\` `;
    });
    /* Memanggil fungsi internal untuk membuat representasi JSON */
    repositoryJson(paths, target);
    /* Memanggil fungsi internal untuk membuat representasi Markdown */
    const markdown = repositoryMD(target, source);
    return markdown;
  } catch (err) {
    throw new Error(`directory: ${err.message}`);
  }
}
export default directory;
