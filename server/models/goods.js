var mongoose = require('mongoose');


var productSchema = new mongoose.Schema({
    "productId":{type:String},
    "productName":String,
    "salePrice":Number,
    "productImage":String,
})


module.exports  = mongoose.model('Goods',productSchema);