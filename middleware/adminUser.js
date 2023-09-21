const jwt = require("jsonwebtoken");


module.exports.verifyAdmin = (req, res, next) => {
    const token = req.header("x-auth-token");
    if (!token) return res.status(401).send("No token provided");
    try {
      const payload = jwt.verify(token, "default_secret_key");
      req.user = payload;
      console.log(req.user.role);
      if (req.user.role === "admin") {
        next();
      } else {
        res.status(400).json({message:"Your Not a Admin! Only Admin Can allow this page"})
      }

    } catch (ex) {
      res.status(401).send(ex.message);
    }
  };

