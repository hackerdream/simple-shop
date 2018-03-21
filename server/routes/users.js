var express = require('express');
var user = express.Router();

var User = require('../models/users');
/* GET home page. */
user.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express,Very Goood'
  });
});


//登录
user.post('/login', function (req, res, next) {
  let params = {
    userName: req.body.username,
    userPassword: req.body.password
  };

  User.findOne(params, function (err, doc) {
    if (err) {
      res.json({
        status: 1,
        msg: err.message
      })
    } else {
      if (doc) {
        res.cookie("userId", doc.userId, {
          path: '/',
          maxAge: 1000 * 60 * 60
        })

        req.session.username = doc.userName;
        req.session.userId = doc.userId;
        res.json({
          status: 0,
          msg: '',
          result: "success "
        })
      } else {
        res.json({
          status: 1,
          msg: '',
          result: "error username or password"
        })
      }
    }
  })
})

//登出
user.post('/logout', function (req, res, next) {
  res.cookie("userId", '', {
    path: '/',
    maxAge: -1
  });
  req.session.destroy();
  res.json({
    status: 0,
    msg: '',
    result: 'logout succes'
  })
})

//校验是否登录
user.get("/checkLogin", function (req, res, next) {

  if (req.session.username) {
    res.json({
      status: 0,
      mes: '',
      result: {
        username: req.session.username
      }
    })
  } else {
    res.json({
      status: 1,
      mes: '未登录，请登录',
      result: ''
    })
  }
})

//查看当前用户的购物车
user.get('/cartList', function (req, res, next) {
  let userId = req.session.userId;

  User.findOne({
    userId: userId
  }, function (err, doc) {
    if (err) {
      res.json({
        status: 1,
        msg: err.message,
        result: ''
      })
    } else {
      if (doc) {
        res.json({
          status: 0,
          msg: 'success',
          result: doc.cartList
        })
      }
    }
  })
})

//删除物品
user.delete('/deleteGood', function (req, res, next) {
  let productId = req.query.productId,
    userId = req.session.userId;

  User.update({
    userId: userId
  }, {
    $pull: {
      'cartList': {
        'productId': productId
      }
    }
  }, function (err, doc) {
    if (err) {
      res.json({
        status: 1,
        msg: err.msg,
        result: ''
      })
    } else {
      res.json({
        status: 0,
        msg: '',
        result: "success"
      })
    }
  })
})

//修改购物车里的商品数量
user.post("/editCart", function (req, res, next) {
  let userId = req.session.userId,
    productId = req.body.productId,
    productNum = req.body.productNum,
    checked = req.body.checked;
  console.log(productId, productNum, checked)
  User.update({
    "userId": userId,
    "cartList.productId": productId
  }, {
    "cartList.$.productNum": productNum,
    "cartList.$.checked": checked,
  }, function (err, doc) {
    if (err) {
      res.json({
        status: 1,
        msg: err.msg,
        result: ''
      })
    } else {
      res.json({
        status: 0,
        msg: '',
        result: "success"
      })
    }
  })
})


//全部选择与全部不选择
user.post("/selectAll", function (req, res, next) {
  let selectAll = req.body.selectAll === true ? 1 : 0;
  let userId = req.session.userId;

  User.findOne({
    userId: userId
  }, function (err, doc) {
    if (err) {
      res.json({
        status: 1,
        msg: err.message,
        result: ''
      })
    } else {
      if (doc) {
        doc.cartList.forEach(item => {
          if (item.checked !== selectAll) {
            item.checked = selectAll;
          }
        });

        doc.save(function (err1, doc1) {
          if (err1) {
            res.json({
              status: 1,
              msg: err.message,
              result: ''
            })
          } else {
            res.json({
              status: 0,
              msg: '',
              result: "update success"
            })
          }
        })
      }
    }
  })


})
module.exports = user;


//完成地址的获取
user.get("/getAddress", function (req, res, next) {
  var userId = req.session.userId;
  User.findOne({
    userId: userId
  }, function (err, doc) {
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
        result: doc.addressList
      })
    }
  })
})

//设置默认地址
user.post("/setDefault", function (req, res, next) {
  var userId = req.session.userId;
  var addressId = req.body.addressId;
  if (addressId === undefined) {
    res.json({
      status: 1001,
      msg: "addressId is null",
      result: ''
    })
  }else{
    User.findOne({
      userId: userId
    }, function (err, doc) {
      if (err) {
        res.json({
          status: 1,
          msg: err.message,
          result: ''
        })
      } else {
  
        doc.addressList.forEach((item) => {
          if (item.addressId === addressId) {
            item.isDefault = true;
          } else {
            item.isDefault = false;
          }
        })
  
        doc.save(function (err1, doc1) {
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
              result:""
            })
          }
        })
      }
    })
  }

})
