var mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
  "userId": String,
  "userName": String,
  "userPassword": String,
  "orderList": [{
      "orderId": String,
      "orderTotal": Number,
      "addressInfo": {
        "addressId": String,
        "userName": String,
        "streetName": String,
        "postCode": Number,
        "tel": Number,
        "isDefault": Boolean
      },
      "goodsList": [{
        "productImage": String,
        "salePrice": String,
        "productName": String,
        "productId": String,
        "productNum": String,
        "checked": String

      }],
      "orderStatus": Number,
      "createDate": String
    }

  ],
  "cartList": [{
    "productImage": String,
    "salePrice": String,
    "productName": String,
    "productId": String,
    "productNum": String,
    "checked": String
  }],
  "addressList": [{
    "addressId": String,
    "userName": String,
    "streetName": String,
    "postCode": Number,
    "tel": Number,
    "isDefault": Boolean
  }]
});

module.exports = mongoose.model('Users', userSchema);
