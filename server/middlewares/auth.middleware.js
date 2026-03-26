const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "Нет токена" });
    }

    const [type, token] = authHeader.split(" ");

    if (type !== "Bearer" || !token) {
      return res.status(401).json({ message: "Неверный формат токена" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    next();
  } catch (e) {
    res.status(401).json({ message: "Токен недействителен" });
  }
}

module.exports = auth;
