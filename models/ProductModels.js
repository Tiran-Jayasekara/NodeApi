const mongoose = require("mongoose");


const ProductModels = mongoose.Schema(
    {
        name:{
            type:String,
            required:[true,'please Enter a product Name']
        },
        quantity:{
            type:Number,
            required:true,
            default:0,
        },
        price:{
            type:Number,
            required:true,
        },
        image:{
            type:String,
            required:false
        }
            
    },
    {timestamp:true}
)


const Product =  mongoose.model.Product || mongoose.model('Product',ProductModels)

module.exports = Product;