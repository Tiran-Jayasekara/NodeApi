const jwt = require("jsonwebtoken");

module.exports.verifyAuth = (req, res, next) => {
    const token = req.header("x-auth-token");
    if (!token) return res.status(401).send("No token provided");
    try {
      const payload = jwt.verify(token, "default_secret_key");
      req.user = payload;
      if (payload) next();
    } catch (ex) {
      res.status(401).send(ex.message);
    }
  };