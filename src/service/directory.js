import fg from "fast-glob";
import { Fs, Dir } from "../util/file.js";
import Print from "../util/console.js";
import Masukan from "../util/masukan.js";
import { cwd, potong } from "../service/lokasi.js";
import History from "../service/history.js";
function getPath(target) {
  try {
    Print.clear("masukan berkas yang ingin dikecualikan:");
    Print.log("format untuk folder: node_modules/**");
    Print.log("format untuk file: **/example.zip");
    Print.log("format untuk extensi: **/*.txt");
    Print.log("pisahkan dengan koma(,)");
    const ignored = Masukan.wajib("silahkan?> ");
    const berkas = ignored.split(",");
    const ignore = berkas.map((e) => e.trim());
    const defaultIgn = [
      "**/*.mp3",
      "node_modules/**",
      ".git/**",
      "dist/**",
      ...ignore,
    ];
    const paths = fg.sync("**/*", {
      cwd: target.replace("/music", "/Music"),
      ignore: defaultIgn,
      onlyFiles: true,
      absolute: true,
    });
    return paths;
  } catch (err) {
    throw new Error(`getPath: ${err.message}`);
  }
}
let repository_p = "history/repository.md";
function directory(target) {
  try {
    const paths = getPath(target);
    Print.clear("sedang membaca directory...");
    const source = paths.map((e) => {
      const lokasi = potong(target, e);
      Print.log("membaca ", lokasi);
      const value = Fs.baca(e, "");
      return `lokasi:\n${lokasi}\n\`\`\`\n${value}\`\`\``;
    });
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
    History.save("history/repository.json", project);
    const head = `\project lokasi: ${target}### project source:`;
    const md_array = [head, ...source];
    const markdown = md_array.join("\n-----\n");
    Fs.tulis(repository_p, markdown);
    return markdown;
  } catch (err) {
    throw new Error(`directory: ${err.message}`);
  }
}
export default directory;
