var express = require('express');

var router = express.Router();
var mongoose = require('mongoose');
var Goods = require('../models/goods');

mongoose.connect('mongodb://127.0.0.1:27017/dumall');

mongoose.connection.on("connection", function () {
  console.log("success");
})


mongoose.connection.on("error", function () {
  console.log("fail");
})

mongoose.connection.on("disconnection", function () {
  console.log("disconnected");
})

router.get('/', function (req, res, next) {
  let page = parseInt(req.query.page);
  let pageSize = parseInt(req.query.pageSize); //每页的数量
  let sort = parseInt(req.query.sort); //排序
  let priceLevel = req.query.priceLevel || 'all'; //价格区间  
  let skip = (page - 1) * pageSize;
  let params = {};
  let priceGt, priceLte;
  
  //选择区间
  if (priceLevel != 'all') {
    
    switch (priceLevel) {
      case '0':priceGt = 0;priceLte = 99.99;break;
      case '1':priceGt = 100;priceLte = 499.99;break;
      case '2':priceGt = 500;priceLte = 999.99;break;
      case '3':priceGt = 1000;priceLte = 5000;break;      
    }
    params = {
        'salePrice':{
            $gt:priceGt,
            $lte:priceLte
        }
    }
  }

  Goods.find(params).sort({
    'salePrice': 1
  }).skip(skip).limit(pageSize).exec(function (err, doc) {
    if (err) {
      res.json({
        status: 1,
        msg: err.message,
        result: ''
      })
    } else {
      res.json({
        status: 0,
        msg: '',
        result: {
          count: doc.length,
          list: doc
        }
      })
    }
  })

})

module.exports = router;
