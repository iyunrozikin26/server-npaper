const bcrypt = require("bcryptjs");

// digunakan untuk generate password ketika register sebelum di create ke DB
const hashPassword = (password) => {
    const hash = bcrypt.hashSync(password);
    return hash;
};

// digunakan verifikasi inputan password saat login dengan hashPass yang ada di DB
const comparePassword = (password, hash) => {
    const compare = bcrypt.compareSync(password, hash);
    return compare;
};

module.exports = {
    hashPassword,
    comparePassword,
};
