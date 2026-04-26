import path from "path";

// ... fungsi untuk mendapatkan path absolut, menyesuaikan dengan environment
function absolute(audit_dir, p) {
  try {
    // ... menggabungkan home directory, direktori audit, dan path relatif
    const home = path.join(process.env.HOME, audit_dir);
    const finaly = path.join(home, p);
    // ... melakukan penyesuaian path jika ada '/music' menjadi '/Music'
    return finaly.replace("/music", "/Music");
  } catch (err) {
    throw new Error(`absolute: ${err.message}`);
  }
}

// ... fungsi untuk mendapatkan current working directory (cwd) yang disesuaikan
function cwd(p, t) {
  try {
    // ... logika kondisional berdasarkan parameter t (jika t adalah 0)
    if (t === 0) {
      const resolve = path.resolve(p);
      const clear = resolve.replace("/emulated/0", "");
      const finaly = path.join(process.env.HOME, clear);
      return finaly;
    }
    // ... menggabungkan home directory dengan path yang diberikan
    return path.join(process.env.HOME, p);
  } catch (err) {
    throw new Error(`cwd: ${err.message}`);
  }
}

// ... fungsi untuk memotong path, mengambil bagian setelah direktori monitor
function potong(monitor_dir, p) {
  try {
    const monitor_array = monitor_dir.split("/");
    const dir = monitor_array.pop(); // ... mendapatkan nama direktori terakhir sebagai pemisah
    const p_array = p.split("/");
    // ... mencari indeks direktori monitor dan mengambil bagian setelahnya
    const finaly = p_array.slice(p_array.indexOf(dir) + 1);
    return finaly.join("/");
  } catch (err) {
    throw new Error(`potong: ${err.message}`);
  }
}

export { absolute, cwd, potong };
