import path from "path";

/* Menghasilkan jalur absolut berdasarkan direktori dasar audit dan sub-path */
function absolute(audit_dir, p) {
  try {
    const home = path.join(process.env.HOME, audit_dir);
    const finaly = path.join(home, p);
    /* Menyesuaikan penulisan folder musik demi kompatibilitas sistem operasi Android */
    return finaly.replace("/music", "/Music");
  } catch (err) {
    throw new Error(`absolute: ${err.message}`);
  }
}

/* Mengonversi lokasi relatif menjadi lokasi absolut di direktori HOME */
function cwd(p, t) {
  try {
    if (t === 0) {
      const resolve = path.resolve(p);
      const clear = resolve.replace("/emulated/0", "");
      const finaly = path.join(process.env.HOME, clear);
      return finaly;
    }
    return path.join(process.env.HOME, p);
  } catch (err) {
    throw new Error(`cwd: ${err.message}`);
  }
}

/* Memotong dan memformat jalur berkas relatif terhadap folder proyek induk */
function potong(monitor_dir, p) {
  try {
    const monitor_array = monitor_dir.split("/");
    const dir = monitor_array.pop();
    const p_array = p.split("/");
    const finaly = p_array.slice(p_array.indexOf(dir) + 1);
    return finaly.join("/");
  } catch (err) {
    throw new Error(`potong: ${err.message}`);
  }
}

export { absolute, cwd, potong };
