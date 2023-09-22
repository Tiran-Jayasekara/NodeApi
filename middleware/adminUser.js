const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports.verifyAdmin = (req, res, next) => {
  const token = req.header(process.env.ReqHeader);
  if (!token) return res.status(401).send("No token provided");
  try {
    const payload = jwt.verify(token, process.env.SecretKey);
    req.user = payload;

    if (req.user.role === "admin") {
      next();
    } else {
      res
        .status(400)
        .json({ message: "Your Not a Admin! Only Admin Can allow this page" });
    }
  } catch (ex) {
    res.status(401).send(ex.message);
  }
};
