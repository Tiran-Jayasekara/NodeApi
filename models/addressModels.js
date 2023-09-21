const mongoose = require("mongoose");


const AddressModels = mongoose.Schema(
    {
        userID:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required:true,
        },
        fullName:{
            type:String,
            required:[true,'please Enter a Address FullName']
        },
        address:{
            type:String,
            required:true,
        },
        city:{
            type:String,
            required:true,
        },
        country:{
            type:String,
            required:false
        },
        postalCode:{
            type:String,
            required:false
        }
            
    },
    {timestamp:true}
)


const Address =  mongoose.model.Address || mongoose.model('Address',AddressModels)

module.exports = Address;