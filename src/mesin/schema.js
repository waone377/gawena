import { Type } from "@google/genai";

const repoItemSchema = {
  type: Type.OBJECT,
  properties: {
    jenis: {
      type: Type.STRING,
      enum: ["folder", "file", "dok", "config"],
      description:
        "Jenis komponen. 'folder' untuk direktori, 'file' untuk kode sumber, 'config' untuk file konfigurasi, 'dok' untuk dokumentasi.",
    },
    lokasi: {
      type: Type.STRING,
      description:
        "Path relatif dari root proyek, contoh: 'src/components/Button.jsx'. Gunakan garis miring '/' sebagai pemisah, tapi jangan menyertakan nama folder dari repositorynya.",
      pattern: "^[a-zA-Z0-9._\\-/]+$",
    },
    konten: {
      type: Type.STRING,
      description:
        "Isi konten lengkap untuk file. Untuk 'jenis: folder', nilai ini harus string kosong ''.",
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
      description: "Tipe entitas yang akan dihapus: 'file' atau 'folder'.",
    },
    lokasi: {
      type: Type.STRING,
      description:
        "Path relatif dari root proyek untuk file/folder yang akan dihapus, tapi jangan menyertakan nama folder dari repositorynya.",
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
        "Daftar semua file dan folder yang dibuat atau dimodifikasi. Jangan sertakan file yang tidak berubah.",
      items: repoItemSchema,
    },
    delets: {
      type: Type.ARRAY,
      description:
        "Daftar file atau folder yang perlu dihapus dari proyek. Jika tidak ada, gunakan array kosong [].",
      items: deleteItemSchema,
    },
    text: {
      type: Type.STRING,
      description:
        "Ringkasan teknis yang jelas dan profesional tentang perubahan yang dibuat, arsitektur yang diterapkan, dan keputusan teknis penting. seperti file dan folder mana saja yang dirubah atau diperbaiki dan mana saja yang baru dibuat).",
    },
  },
  required: ["repo", "text"],
};

export default mainSchema;
