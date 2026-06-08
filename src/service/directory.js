import fg from "fast-glob";
import { Fs, Dir } from "../util/file.js";
import Print from "../util/console.js";
import Masukan from "../util/masukan.js";
import { cwd, potong } from "../service/lokasi.js";
import History from "../service/history.js";
import history_p from "../util/lokasi.js";

// Memindai berkas di dalam direktori target dengan mengabaikan berkas yang dikecualikan
function getPath(target) {
  try {
    Print.clear("masukan berkas yang ingin dikecualikan:");
    Print.log("format untuk folder: node_modules/**");
    Print.log("format untuk file: **/example.zip");
    Print.log("format untuk extensi: **/*.txt");
    Print.log("pisahkan dengan koma(,)");
    Print.log("contoh: node_modules/**, **/compres.zip, **/*.mp3");
    Print.log("kosongkan jika tidak ada");
    const berkasUsr = Masukan.biasa("silakan?> ");
    let ignore = ["**/*.mp3", "node_modules/**", ".git/**", "dist/**"];
    if (berkasUsr) {
      const berkasArray = berkasUsr.split(",");
      const berkasClear = berkasArray.map((e) => e.trim());
      ignore = [...ignore, ...berkasClear];
    }
    // Menggunakan fast-glob untuk mendapatkan path file secara rekursif
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
// Membuat dan menyimpan representasi JSON terstruktur dari seluruh isi direktori target
function repositoryJson(paths, target) {
  const code = paths.map((e) => {
    const lokasi = potong(target, e);
    const value = Fs.baca(e, "");
    return { jenis: "file", lokasi: lokasi, konten: value };
  });
  // Menyusun objek data proyek untuk riwayat pemulihan
  const project = {
    dir: target,
    project: code,
    delets: [],
    laporan: "",
  };
  // Menyimpan data proyek ke file history JSON
  History.save(history_p.projectJson, project);
}
// Membuat representasi file markdown yang berisi seluruh kode sumber proyek

function repositoryMD(target, source) {
  const head = `\project lokasi: ${target}\n### source code:\n`;
  const md_array = [head, ...source];
  const markdown = md_array.join("-----\n");
  // Menulis konten markdown ke berkas cadangan
  Fs.tulis(history_p.projectMarkdown, markdown.trim());
  return markdown.trim();
}

// Membaca struktur direktori secara utuh dan mengembalikannya dalam format markdown
function directory(target) {
  try {
    const paths = getPath(target);
    Print.clear("sedang membaca directory...");
    // Memetakan isi setiap berkas menjadi blok teks berformat markdown
    const source = paths.map((e) => {
      const lokasi = potong(target, e);
      Print.log("membaca ", lokasi);
      const value = Fs.baca(e, "");
      return `lokasi:\n${lokasi}\n\`\`\`\n${value}\`\`\` `;
    });
    // Menyimpan berkas proyek dalam format JSON untuk fitur undo
    repositoryJson(paths, target);
    // Menghasilkan file dokumentasi markdown proyek
    const markdown = repositoryMD(target, source);
    return markdown;
  } catch (err) {
    throw new Error(`directory: ${err.message}`);
  }
}
export default directory;
