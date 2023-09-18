const mongoose = require("mongoose");

const database = async ()=> {
    mongoose
    .connect(
      "mongodb+srv://admin:admin123@testnode.mbax30o.mongodb.net/NodeApi?retryWrites=true&w=majority"
    )
    .then(() => {
      console.log("Connected to mongoDB")
    }).catch((error)=>{
      console.log(error);
    });  
}

module.exports = database;