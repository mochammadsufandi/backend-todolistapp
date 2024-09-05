const bcrypt = require('bcryptjs');
const salt = parseInt(process.env.SALT);

const hashPassword = (password) => {
    return bcrypt.hashSync(password,salt);
}

const comparePassword = (password,hashedPassword) => {
    return bcrypt.compareSync(password,hashedPassword);
}

module.exports = {hashPassword,comparePassword};