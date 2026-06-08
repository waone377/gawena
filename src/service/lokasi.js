import path from "path";

// Menghasilkan path absolut dengan menggabungkan direktori home dan path relatif
function absolute(audit_dir, p) {
  try {
    // Menggabungkan direktori utama dengan direktori audit
    const home = path.join(process.env.HOME, audit_dir);
    const finaly = path.join(home, p);
    // Mengembalikan path absolut yang sudah disesuaikan huruf kapitalnya
    return finaly.replace("/music", "/Music");
  } catch (err) {
    throw new Error(`absolute: ${err.message}`);
  }
}

// Mendapatkan path direktori kerja (cwd) yang dinormalisasi
function cwd(p, t) {
  try {
    // Menangani normalisasi path khusus untuk lingkungan penyimpanan emulated
    if (t === 0) {
      const resolve = path.resolve(p);
      const clear = resolve.replace("/emulated/0", "");
      const finaly = path.join(process.env.HOME, clear);
      return finaly;
    }
    // Menggabungkan path direktori relatif terhadap direktori HOME
    return path.join(process.env.HOME, p);
  } catch (err) {
    throw new Error(`cwd: ${err.message}`);
  }
}

// Mengambil potongan path relatif setelah nama direktori monitor
function potong(monitor_dir, p) {
  try {
    const monitor_array = monitor_dir.split("/");
    const dir = monitor_array.pop();
    const p_array = p.split("/");
    // Mengambil potongan path relatif setelah nama direktori monitor
    const finaly = p_array.slice(p_array.indexOf(dir) + 1);
    return finaly.join("/");
  } catch (err) {
    throw new Error(`potong: ${err.message}`);
  }
}

export { absolute, cwd, potong };
