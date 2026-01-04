import path from "path";
import { bacaFolder, bacaFile, tulisFile } from "../util/files.js";
import Print from "../util/tampilan.js";
import Masukan from "../util/input.js";

async function readRepo(target) {
  try {
    const selection = {
      folders: [],
      files: [],
      extensions: [],
    };

    const mode = Masukan.pilih(
      "pilih pembacaan file & folder:\n1. pilih beberapa (yang ditentukan akan dibaca)\n2. kecualikan beberapa (yang ditentukan akan diabaikan)\nsilahkan pilih (1/2)?> ",
      ["1", "2"],
    );

    let instructions = "";
    if (mode === "1") {
      instructions = "yang ingin disertakan";
    } else {
      instructions = "yang ingin dikecualikan";
    }

    const t = Masukan.pilih(
      `jika ada lebih dari satu, pisahkan dengan (,\ncontoh:\nfolder: src/components, tests\nfile: main.js, config.json\nextensi: .txt, .py\n mengerti lanjut (y/n): `,
      ["y", "n"],
    );
    if (t === "n") {
      Print.log("program telah berhenti3 Titik﻿");
      process.exit(1);
    }

    const foldernyaInput = Masukan.biasa(
      `masukkan daftar nama folder ${instructions}?: `,
    );
    if (foldernyaInput) {
      selection.folders = foldernyaInput
        .replaceAll(" ", "")
        .split(",")
        .filter(Boolean);
    }

    const filenyaInput = Masukan.biasa(
      `masukkan daftar nama file ${instructions} beserta ekstensinya?: `,
    );
    if (filenyaInput) {
      selection.files = filenyaInput
        .replaceAll(" ", "")
        .split(",")
        .filter(Boolean);
    }

    const extensinyaInput = Masukan.biasa(
      `masukkan daftar format ekstensi ${instructions}?: `,
    );
    if (extensinyaInput) {
      selection.extensions = extensinyaInput
        .replaceAll(" ", "")
        .split(",")
        .filter(Boolean);
    }

    const processedPatterns = {};
    if (mode === "1") {
      processedPatterns.folders = selection.folders.map((f) =>
        f.startsWith("!") ? f.substring(1) : f,
      );
      processedPatterns.files = selection.files.map((f) =>
        f.startsWith("!") ? f.substring(1) : f,
      );
      processedPatterns.extensions = selection.extensions.map((e) =>
        e.startsWith(".") ? e.substring(1) : e,
      );
    } else {
      processedPatterns.folders = selection.folders.map((f) =>
        f.startsWith("!") ? f : `!${f}/**`,
      );
      processedPatterns.files = selection.files.map((f) =>
        f.startsWith("!") ? f : `!**/${f}`,
      );
      processedPatterns.extensions = selection.extensions.map((e) =>
        e.startsWith(".") ? `!**/*.${e.substring(1)}` : `!**/*.${e}`,
      );
    }

    const repo = await bacaFolder(target, processedPatterns, mode);

    const dir = target.split("/").pop();
    Print.clear("membaca...\nvolder:", dir, "\npath:", target, "\n===");
    let markdown = "";
    for (const e of repo) {
      const p = path.relative(target, e);
      Print.log("sedang membaca", p);
      const kode = await bacaFile(e, true);
      markdown += `\n\n---\n\n*lokasi*\n\n${p}\n\n*isi konten*\n\n${kode}\n\n---`;
    }
    const echo = `nama repository: ${dir}
path repository: ${target}
berikut kodenya:
${markdown}`;
    await tulisFile("history/repo.md", echo);
    Print.log("selesai terbaca");
    return echo;
  } catch (err) {
    throw new Error(`readRepo() error: ${err.message}`);
  }
}
export default readRepo;
