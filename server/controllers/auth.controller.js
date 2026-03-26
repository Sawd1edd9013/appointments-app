const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email и пароль обязательны" });
    }

    if (email !== process.env.OPERATOR_EMAIL) {
      return res.status(401).json({ message: "Неверный email или пароль" });
    }

    const isMatch = await bcrypt.compare(
      password,
      process.env.OPERATOR_PASSWORD,
    );

    if (!isMatch) {
      return res.status(401).json({ message: "Неверный email или пароль" });
    }

    const token = jwt.sign(
      { email: process.env.OPERATOR_EMAIL, role: "operator" },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    res.json({ token });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

module.exports = {
  login,
};
