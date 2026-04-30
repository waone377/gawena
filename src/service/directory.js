import fg from "fast-glob";
import { Fs, Dir } from "../util/file.js";
import Print from "../util/console.js";
import Masukan from "../util/masukan.js";
import { cwd, potong } from "../service/lokasi.js";
import History from "../service/history.js";
import history_p from "../util/lokasi.js";

// ... fungsi untuk mendapatkan path file dari direktori target dengan opsi ignore
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
    // ... menggunakan fast-glob untuk memindai file
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
// ... fungsi membuat struktur repository.json
function repositoryJson(paths, target) {
  const code = paths.map((e) => {
    const lokasi = potong(target, e);
    const value = Fs.baca(e, "");
    return { jenis: "file", lokasi: lokasi, konten: value };
  });
  // ... menyiapkan objek project untuk disimpan di history
  const project = {
    dir: target,
    project: code,
    delets: [],
    laporan: "",
  };
  // ... menyimpan struktur project ke file history JSON
  History.save(history_p.projectJson, project);
}
// ...fungsi membuat repository.md

function repositoryMD(target, source) {
  const head = `\project lokasi: ${target}\n### source code:`;
  const md_array = [head, ...source];
  const markdown = md_array.join("-----\n");
  // ... menulis markdown ke file
  Fs.tulis(history_p.projectMarkdown, markdown);
  return markdown;
}

// ... fungsi untuk membaca struktur direktori target dan menyiapkannya untuk AI
function directory(target) {
  try {
    const paths = getPath(target);
    Print.clear("sedang membaca directory...");
    // ... membuat representasi string markdown dari setiap file
    const source = paths.map((e) => {
      const lokasi = potong(target, e);
      Print.log("membaca ", lokasi);
      const value = Fs.baca(e, "");
      return `lokasi:\n${lokasi}\n\`\`\`\n${value}\`\`\` `;
    });
    // ... membuat struktur file repository.json
    repositoryJson(paths, target);
    // ... menggabungkan header dan file-file menjadi format markdown
    const markdown = repositoryMD(target, source);
    return markdown;
  } catch (err) {
    throw new Error(`directory: ${err.message}`);
  }
}
export default directory;
