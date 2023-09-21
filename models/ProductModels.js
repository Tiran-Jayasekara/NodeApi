const mongoose = require("mongoose");


const ProductModels = mongoose.Schema(
    {
        name:{
            type:String,
            required:[true,'please Enter a product Name']
        },
        description:{
            type:String,
            required:true
        },
        price:{
            type:Number,
            required:true
        },
        category:{
            type:String,
            required:true
        },
        sizes:{
            type:Array,
            required:true
        },
        deliveryInfo:{
            type:String,
            required:true,
        },
        onSale:{
            type:String,
            required:false,
        },
        priceDrop:{
            type:Number,
            required:false,
            default:0,
        },
        imageUrl:{
            type:String,
            required:true,
        }
            
    },
    {timestamp:true}
)


const Product =  mongoose.model.Product || mongoose.model('Product',ProductModels)

module.exports = Product;