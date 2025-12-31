import { Type } from "@google/genai";

const repoItemSchema = {
  type: Type.OBJECT,
  properties: {
    jenis: {
      type: Type.STRING,
      enum: ["folder", "file", "dok", "config"],
      description:
        "Jenis entitas dalam proyek. Gunakan 'folder' untuk direktori, 'file' untuk kode sumber utama, 'config' untuk file konfigurasi proyek, dan 'dok' untuk dokumentasi. Nilai harus sesuai enum dan tidak boleh diasumsikan.",
    },
    lokasi: {
      type: Type.STRING,
      description:
        "Path relatif dari root proyek (tanpa menyertakan nama repository). Gunakan '/' sebagai pemisah direktori. Contoh yang benar: 'src/components/Button.jsx'. Jangan gunakan path absolut.",
      pattern: "^[a-zA-Z0-9._\\-/]+$",
    },
    konten: {
      type: Type.STRING,
      description:
        "Isi lengkap file sesuai lokasi. Jika jenis bernilai 'folder', konten WAJIB berupa string kosong ''. Untuk jenis selain folder, konten harus berisi seluruh isi file secara utuh.",
    },
  },
  required: ["jenis", "lokasi", "konten"],
};

const deleteItemSchema = {
  type: Type.OBJECT,
  properties: {
    jenis: {
      type: Type.STRING,
      enum: ["file", "folder"],
      description:
        "Jenis entitas yang akan dihapus dari proyek. Gunakan 'file' untuk berkas dan 'folder' untuk direktori.",
    },
    lokasi: {
      type: Type.STRING,
      description:
        "Path relatif dari root proyek untuk file atau folder yang dihapus. Tidak boleh menyertakan nama repository dan harus sesuai struktur proyek.",
      pattern: "^[a-zA-Z0-9._\\-/]+$",
    },
  },
  required: ["jenis", "lokasi"],
};

const mainSchema = {
  type: Type.OBJECT,
  properties: {
    repo: {
      type: Type.ARRAY,
      description:
        "Daftar semua file dan folder yang dibuat atau dimodifikasi oleh AI pada respons ini. Jangan sertakan file atau folder yang tidak mengalami perubahan.",
      items: repoItemSchema,
    },
    delets: {
      type: Type.ARRAY,
      description:
        "Daftar file atau folder yang secara eksplisit dihapus dari proyek. Jika tidak ada penghapusan, field ini tetap harus ada dan berisi array kosong [].",
      items: deleteItemSchema,
    },
    text: {
      type: Type.STRING,
      description:
        "Ringkasan teknis profesional dalam Bahasa Indonesia yang menjelaskan arsitektur, perubahan yang dilakukan, serta keputusan desain utama. Jelaskan file dan folder apa saja yang dibuat, dimodifikasi, atau dihapus secara ringkas.",
    },
  },
  required: ["repo", "text"],
};

export default mainSchema;
