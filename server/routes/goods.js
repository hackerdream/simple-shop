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

//查询商品
router.get('/list', function (req, res, next) {
  let page = parseInt(req.query.page);
  let pageSize = parseInt(req.query.pageSize); //每页的数量
  let sort = parseInt(req.query.sort); //排序
  let priceLevel = req.query.priceLevel; //价格区间  
  let skip = (page - 1) * pageSize;
  let params = {};
  let priceGt, priceLte;

  //选择区间
  if (priceLevel != 'all') {

    switch (priceLevel) {
      case '0':
        priceGt = 0;
        priceLte = 99.99;
        break;
      case '1':
        priceGt = 100;
        priceLte = 499.99;
        break;
      case '2':
        priceGt = 500;
        priceLte = 999.99;
        break;
      case '3':
        priceGt = 1000;
        priceLte = 5000;
        break;
    }
    params = {
      'salePrice': {
        $gt: priceGt,
        $lte: priceLte
      }
    }
  }

  Goods.find(params).sort({
    'salePrice': sort
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

});

//加入购物车
router.post('/addCart', function (req, res, next) {
  let userId = "100000077",
    productId = req.body.productId;
  var User = require("../models/users");
  
  User.findOne({
    'userId': userId
  }, function (err, userDoc) {
    if (err) {
      res.json({
        "status": 1,
        "msg": err.message,
        "result": ''
      })
    } else {
      if (userDoc) {

        let goodsItem = ''; //购物车判断是否存在这个商品

        userDoc.cartList.forEach(item => {
          if (item.productId === productId) {
            goodsItem = item;
            item.productNum++;
          }
        });
        if (goodsItem) {
          userDoc.save(function (err2, doc2) {

            if (err2) {
              res.json({
                "status": 1,
                "msg": err2.message,
                "result": ''
              })
            } else {
              res.json({
                "status": 0,
                "msg": '',
                "result": doc2.cartList
              })
            }

          })
        } else {
          Goods.findOne({
            productId: productId
          }, function (err1, doc) {

            if (err1) {
              res.json({
                "status": 1,
                "msg": err1.message,
                "result": ''
              })
            } else {

              if (doc) {

                doc["_doc"]["productNum"] = 1;
                doc["_doc"]["checked"] = 1;
                userDoc.cartList.push(doc);
                userDoc.save(function (err2, doc2) {

                  if (err2) {
                    res.json({
                      "status": 1,
                      "msg": err2.message,
                      "result": ''
                    })
                  } else {
                    res.json({
                      "status": 0,
                      "msg": '',
                      "result": doc2.cartList
                    })
                  }

                })
              }
            }

          })
        }


      }

    }
  })
})

module.exports = router;
