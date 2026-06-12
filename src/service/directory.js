import fg from "fast-glob";
import { Fs, Dir } from "../util/file.js";
import Print from "../util/console.js";
import Masukan from "../util/masukan.js";
import { cwd, potong } from "../service/lokasi.js";
import History from "../service/history.js";
import history_p from "../util/lokasi.js";
import getIgnored from "./ignored.js";

/* Fungsi internal untuk memindai berkas-berkas proyek serta mengonfigurasi filter abaikan */
function getPath(target) {
  try {
    /* memanggil untuk menanyakan dan mengecek riwayat ignore config */
    const { h, confirm, ignored } = getIgnored(target);
    let ignore = ["**/*.mp3", "node_modules/**", ".git/**", "dist/**"];
    /* cek konfirmasi apakah ingin menggunakan riwayat */
    if (confirm === "n") {
      Print.clear("masukan berkas yang ingin dikecualikan:");
      Print.log("format untuk folder: node_modules/**");
      Print.log("format untuk file: **/example.zip");
      Print.log("format untuk extensi: **/*.txt");
      Print.log("pisahkan dengan koma(,)");
      Print.log("contoh: node_modules/**, **/compres.zip, **/*.mp3");
      Print.log("kosongkan jika tidak ada");
      /* Mengambil daftar berkas/folder pengecualian dari input pengguna */
      const berkasUsr = Masukan.biasa("silakan?> ");
      if (berkasUsr) {
        const berkasArray = berkasUsr
          .split(",")
          .map((e) => e.trim())
          .filter(Boolean);
        /* mendapatkan index sesuai targetnya */
        const index = h.findIndex((e) => e.target === target);
        h[index] = { target, ignored: berkasArray };
        /* menyimpan config ke riwayat*/
        History.save(history_p.ignore, h);
        ignore = [...ignore, ...berkasArray];
      }
    } else {
      ignore = [...ignore, ...ignored];
    }
    /* Melakukan pencarian berkas menggunakan pustaka fast-glob */
    const paths = fg.sync("**/*", {
      cwd: target.replace("/music", "/Music"),
      ignore: ignore,
      onlyFiles: true,
      absolute: true,
    });
    return paths;
  } catch (err) {
    /* Menangani kesalahan pemindaian path direktori */
    throw new Error(`getPath: ${err.message}`);
  }
}

/* Fungsi internal untuk menyimpan berkas-berkas proyek asli ke cadangan JSON */
function repositoryJson(paths, target) {
  /* Memetakan setiap jalur berkas menjadi objek representasi file proyek */
  const code = paths.map((e) => {
    const lokasi = potong(target, e);
    const value = Fs.baca(e, "");
    return { jenis: "file", lokasi: lokasi, konten: value };
  });
  const project = {
    dir: target,
    project: code,
    delets: [],
    laporan: "",
  };
  /* Menyimpan struktur objek proyek ke dalam database riwayat JSON */
  History.save(history_p.projectJson, project);
}

/* Fungsi internal untuk menyatukan daftar isi berkas menjadi teks markdown tunggal */
function repositoryMD(target, source) {
  const head = `\project lokasi: ${target}\n### source code:\n`;
  const md_array = [head, ...source];
  const markdown = md_array.join("-----\n");
  /* Menulis dokumen markdown gabungan kode sumber */
  Fs.tulis(history_p.projectMarkdown, markdown.trim());
  return markdown.trim();
}

/* Fungsi utama untuk membaca seluruh berkas dari direktori proyek target */
function directory(target) {
  try {
    /* Mendapatkan seluruh daftar berkas yang disaring */
    const paths = getPath(target);
    Print.clear("sedang membaca directory...");
    /* Membaca konten teks dari masing-masing berkas */
    const source = paths.map((e) => {
      const lokasi = potong(target, e);
      Print.log("membaca ", lokasi);
      const extensi = lokasi.split(".")[1];
      const value = Fs.baca(e, "");
      return `lokasi:\n${lokasi}\n\`\`\`${extensi}\n${value}\`\`\` `;
    });
    /* Menyimpan file cadangan JSON proyek */
    repositoryJson(paths, target);
    /* Membuat serta mengembalikan representasi kode sumber dalam markdown */
    const markdown = repositoryMD(target, source);
    return markdown;
  } catch (err) {
    /* Menangani error saat proses pemindaian direktori */
    throw new Error(`directory: ${err.message}`);
  }
}
export default directory;
