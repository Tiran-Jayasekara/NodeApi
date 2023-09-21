const Joi = require("joi").extend(require("@joi/date"));
const express = require("express");
const app = express();
app.use(express.json());
const bcrypt = require("bcrypt");
const Address = require("../models/addressModels");


module.exports.AddAddress = async (req, res) => {
  const schema = Joi.object({
    userID: Joi.string().required(),
    fullName: Joi.string().min(3).max(30).required(),
    address: Joi.string().min(3).max(30).required(),
    city: Joi.string().min(2).max(20).required(),
    country: Joi.string().min(2).max(30).required(),
    postalCode: Joi.string().min(2).max(30).required(),
  });

  try {
    const { userID, fullName, address, city, country, postalCode } = req.body;
    const { error } = schema.validate({
      userID,
      fullName,
      address,
      city,
      country,
      postalCode,
    });
    if (error) {
      res.status(400).json({ message: error.message });
    } else {
      const addAddress = await Address.create({
        userID,
        fullName,
        address,
        city,
        country,
        postalCode,
      });

      if (addAddress) {
        res
          .status(200)
          .json({ message: "Add Address Successfull", addAddress });
      } else {
        res.status(200).json({ message: "There is somthing Wrong Here" });
      }
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports.getAllAddress = async (req, res) => {
  try {
    const userId = req.params.id;
    const allAddress = await Address.find({ userID: userId });
    console.log(allAddress);
    if (allAddress.length > 0) {
      res.status(200).json({ message: "All Address", allAddress });
    } else {
      res
        .status(400)
        .json({ message: "Couldn't find any address to this UserIds" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports.updateAddress = async (req, res) => {
  const schema = Joi.object({
    addressid: Joi.string().required(),
    fullName: Joi.string().min(3).max(30).required(),
    address: Joi.string().min(3).max(30).required(),
    city: Joi.string().min(2).max(20).required(),
    country: Joi.string().min(2).max(30).required(),
    postalCode: Joi.string().min(2).max(30).required(),
  });

  try {
    const { addressid, fullName, address, city, country, postalCode } = req.body;
    const { error } = schema.validate(
      {
        addressid,
        fullName,
        address,
        city,
        country,
        postalCode,
      }
    );
    if (error) {
      res.status(400).json({ message: error.message });
    } else {
      const update = await Address.findOneAndUpdate(
        { _id: addressid },
        {
        fullName,
        address,
        city,
        country,
        postalCode,
      }, { new: true }
      );
      if (update) {
        res.status(200).json({ message: "Update Success", update });
      } else {
        res.status(400).json({ message: "There is somthing wrong here" });
      }
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports.deleteAddress = async(req,res)=>{
    try {
        const addressId = req.params.id;
        const addressDelete = await Address.findByIdAndDelete(addressId);

        if (addressDelete) {
            res.status(200).json({message:"Delete Success",addressDelete})
        } else {
            res.status(400).json({message:"This Id is not exist"})
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
