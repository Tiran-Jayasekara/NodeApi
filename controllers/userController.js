const User = require("../models/userModels");
const Joi = require("joi").extend(require("@joi/date"));
const express = require("express");
const app = express();
app.use(express.json());
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

function validateUser(req) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email(),
    password: Joi.string().min(8).max(20).required(),
    role: Joi.string().required(),
  });
  return schema.validate(req);
}

//Register User
module.exports.addUser = async (req, res) => {
  try {
    const { error } = validateUser(req.body);
    if (error) {
      res.status(400).json({ message: error.message });
    } else {
      const { name, email, password, role } = req.body;
      const isUserAlreadyExist = await User.findOne({ email });
      if (isUserAlreadyExist) {
        res.status(400).json({ message: "This email is Already Exist !" });
      } else {
        const hash = await bcrypt.hash(password, 10);

        const user = await User.create({
          name,
          email,
          password: hash,
          role,
        });

        if (user) {
          res.status(200).json({ message: "User Add Successfull", user });
        } else {
          res.status(400).json({ message: "Unsuccess" });
        }
      }
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//Login User
module.exports.Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const checkUser = await User.findOne({ email });
    if (checkUser) {
      const match = await bcrypt.compare(password, checkUser.password);
      if (match) {
        const token = jwt.sign(
            {
              id: checkUser._id,
              email: checkUser?.email,
              role: checkUser?.role,
            },
            "default_secret_key",
            { expiresIn: "1d" }
          );

        res.status(200).json({ message: "Login Success", checkUser,token });
      } else {
        res.status(400).json({ message: "Password Is Wrong" });
      }
    } else {
      res.status(400).json({ message: "Email Not Register" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports.getAllUsers = async (req, res) => {
  try {
    const allUser = await User.find({});
    if (allUser) {
      res.status(200).json(allUser);
    } else {
      res.status(400).json({ message: "There is somthiing wrong" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
