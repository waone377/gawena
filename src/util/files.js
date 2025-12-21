import fg from "fast-glob";
import fs from "fs/promises";
import path from "path";
import eee from "../config/ignore.js";

async function bacaFile(p, isJson = false) {
  try {
    const cek = path.extname(p);
    const data = await fs.readFile(p, "utf-8");
    return cek === ".json" && !isJson ? JSON.parse(data) : data;
  } catch (err) {
    throw new Error(
      `bacaFile() error: gagal membaca file ${p}: ${err.message}`,
    );
  }
}

async function tulisFile(p, data) {
  try {
    await fs.writeFile(p, data);
  } catch (err) {
    throw new Error(
      `tulisFile() error: gagal menulis ke file ${p}: ${err.message}`,
    );
  }
}

async function buatFolder(p) {
  try {
    await fs.mkdir(p, { recursive: true });
  } catch (err) {
    throw new Error(
      `buatFolder() error: gagal membuat folder ${p}: ${err.message}`,
    );
  }
}

async function hapusFile(p) {
  try {
    await fs.unlink(p);
  } catch (err) {
    throw new Error(
      `hapusFile() error: gagal menghapus file ${p}: ${err.message}`,
    );
  }
}

async function hapusFolder(p) {
  try {
    await fs.rm(p, { recursive: true });
  } catch (err) {
    throw new Error(
      `hapusFolder() error: gagal menghapus folder ${p}: ${err.message}`,
    );
  }
}

async function bacaFolder(p, { folders, files, extensions }, mode) {
  try {
    let config = [];

    if (mode === "1") {
      const folderGlobs = folders.map((f) => {
        if (f.includes("/") || f.includes("\\")) return `${f}/**`;
        return `**/${f}/**`;
      });
      const fileGlobs = files.map((f) => {
        if (f.includes("/") || f.includes("\\")) return f;
        return `**/${f}`;
      });
      const extensionGlobs = extensions.map((ext) => `**/*.${ext}`);

      config = [...folderGlobs, ...fileGlobs, ...extensionGlobs];
    } else {
      const allFilesGlob = ["**/*"];

      const defaultFolderIgnores = eee.folder
        .filter(Boolean)
        .map((f) => `!${f}/**`);
      const defaultFileIgnores = eee.file.filter(Boolean).map((f) => `!${f}`);
      const defaultExtensionIgnores = eee.extensi
        .filter(Boolean)
        .map((ext) => `!**/*.${ext.replace(".", "")}`);

      config = [
        ...allFilesGlob,
        ...defaultFolderIgnores,
        ...defaultFileIgnores,
        ...defaultExtensionIgnores,
        ...folders,
        ...files,
        ...extensions,
      ];
    }

    const uniqueConfig = [
      ...new Set(config.filter((p) => p && p.trim() !== "")),
    ];

    return await fg(uniqueConfig, { cwd: p, absolute: true, sort: true });
  } catch (err) {
    throw new Error(
      `bacaFolder() error: gagal membaca folder ${p}: ${err.message}`,
    );
  }
}

async function cekAda(p) {
  try {
    await fs.access(p);
  } catch (err) {
    throw new Error(`cekAda() error: gagal mengecek ${p}: ${err.message}`);
  }
}

async function data() {
  try {
    const dataHistory = await bacaFile("history/riwayat.json");
    const targetData = await bacaFile("history/target.json");
    const dataIntruksi = await bacaFile("src/dok/intruksi.txt");
    const dataPrompt = await bacaFile("prompt.txt");
    return {
      dataHistory,
      dataTarget: targetData.target || "",
      dataIntruksi,
      dataPrompt,
    };
  } catch (err) {
    throw new Error(`data() error: ${err.message}`);
  }
}

export {
  bacaFile,
  tulisFile,
  buatFolder,
  hapusFile,
  hapusFolder,
  bacaFolder,
  cekAda,
  data,
};
