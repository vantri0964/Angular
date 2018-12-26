const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')
//gọi hàm user của models
const User = require('../models/user');
//goi ham useradmin của models
const UserAdmin = require('../models/userAdmin');
//goi ham useradmin của models
const Author = require('../models/author');
//goi ham product của models
const Product = require('../models/product');
//goi hàm cart của model
const Cart = require('../models/cart');
//goi commentUsẻ
const commentUser = require('../models/commentUser')
//start mongodb
const mongoose = require('mongoose');
const db = "mongodb://shoeshop:levantri1998@ds127094.mlab.com:27094/eventsdatabase";
mongoose.connect(db, { useNewUrlParser: true }, function (err) {
  if (err) {
    console.error('Error! ' + err)
  } else {
    console.log('Connected to mongodb')
  }
});

//end connect mongodb
router.get('/', (req, res) => { //gọi bên server,js
  res.send('router')
})

//gọi hàm register
router.post('/register', (req, res) => {
  let userData = req.body
  let user = new User(userData)
  user.save((err, registeredUserData) => {
    if (err) {
      console.log("loix " + err)
    } else {

      let payload = { subject: registeredUserData._id }
      let token = jwt.sign(payload, 'secretKey')
      res.status(200).send({ token })
      // res.status(200).send(registeredUserData)
    }
  })
})

//check mail
router.get('/checkmail/:id', (req, res) => {
  User.find().count({ email: req.params.id }, (err, check) => {
    if (err) {
      console.log(err)
    } else {
      check = check
      res.status(200).send({ check })
    }
  })
})

//goi ham  login
router.post('/login', (req, res) => {
  let userData = req.body
  User.findOne({ email: userData.email }, (err, user) => {
    if (err) {
      console.log(err)
    } else {
      if (!user) {
        res.status(401).send('Invalid Email')
      } else
        if (user.password !== userData.password) {
          res.status(401).send('Invalid Password')
        } else {
          let payload = { subject: user._id }
          let token = jwt.sign(payload, 'secretKey')
          let iduser = user._id
          res.status(200).send({ token, iduser })

        }
    }
  })
})

//login admin
router.post('/loginAdmin', (req, res) => {
  let userData = req.body
  UserAdmin.findOne({ UserName: userData.UserName }, (err, useradmin) => {
    if (err) {
      console.log(err)
    } else {
      if (!useradmin) {
        res.status(401).send('Invalid Email')
      } else
        if (useradmin.PassWord !== userData.PassWord) {
          res.status(401).send('Invalid Password')
        } else {
          // let payload = {subject: user._id}
          // let token = jwt.sign(payload, 'secretKey')
          // res.status(200).send({token})
          let idadmin = useradmin._id
          res.status(200).send(idadmin);
        }
    }
  })
})

//Hiên thị sản phẩm
router.get('/events', (req, res) => {
  Product.find(function (err, events) {
    if (err) {
      res.send(err);
    }
    res.json(events);
  });
})

// get event Nam
router.get('/man', (req, res) => {
  Product.find({ loai: 'Nam' }, function (err, events) {
    if (err) {
      res.send(err);
    }
    res.json(events);
  });
})

// get event Nu
router.get('/woman', (req, res) => {
  Product.find({ loai: 'Nữ' }, function (err, events) {
    if (err) {
      res.send(err);
    }
    res.json(events);
  });
})

//Chi tiết sản phẩm
router.get('/detailshoe/:_id', function (req, res) {
  console.log((req.params._id));
  Product.findById(req.params._id, function (err, detail, next) {

    if (err) {
      res.send(err);
    }
    res.json(detail);
  });
});

//search
router.get('/search/:id', function (req, res) {
  // console.log((req.params.id));
  //var query={name:'/^'+req.params.id+'/'}
  Product.find({ $or: [{ name: { $regex: '^' + req.params.id } }, { loai: { $regex: '^' + req.params.id } }] }, function (err, search, next) {

    if (err) {
      res.send(err);
    }
    res.json(search);
  });
});

//delete
router.delete('/delete/:id', function (req, res) {
  // console.log("id la:"+req.params.id);
  Product.findByIdAndRemove(req.params.id, function (err) {
    if (err) {
      res.send(err);
      res.json("product deleted fail!");
    }
    res.json("product deleted successfully!");
  });
});

//insert product
router.post('/insert', (req, res) => {
  let userData = req.body
  let product = new Product(userData)
  product.save((err, insertData) => {
    if (err) {
      console.log("Lỗi:" + err)
      res.json("false");
    } else {
      res.json("Id " + insertData._id + " Insert successfully!")
    }
  })
})

//update product
router.put('/update', (req, res) => {
  let userData = req.body
  Product.updateOne({ _id: userData._id }, userData, { new: true }, function (err) {
    if (err) {
      console.log("Lỗi:" + err)
      res.json("false");
    } else {
      res.json("true")
    }

  })
})

// slider
router.get('/carousel', (req, res) => {
  let carousel = [
    {
      "_id": "1",
      "img": "./assets/images/slider1.jpg",
      "title": "hello",
      "description": "i love you",
    },
    {
      "_id": "2",
      "img": "./assets/images/slider2.jpg",
      "title": "Shoe english",
      "description": "you are welcom",
    },
    {
      "_id": "3",
      "img": "./assets/images/slider3.jpg",
      "title": "hello",
      "description": "i love you",
    }
  ]
  res.json(carousel)

})

//them gio hang
router.post('/insertCart', (req, res) => {
  let userData = req.body
  let cart = new Cart(userData)
  cart.save((err, insertCart) => {
    if (err) {
      console.log("Lỗi:" + err)
      res.json("product insert fail!");
    } else {
      res.json("Id " + insertCart._id + " Insert Cart successfully!")
    }
  })
})

//thong tin nguoi dung
router.get('/infouser', (req, res) => {
  User.find(function (err, events) {
    if (err) {
      res.send(err);
    }
    res.json(events);
  });
})

//sort gia cao den thấp
router.get('/sortASC', (req, res) => {
  Product.find(function (err, events) {
    if (err) {
      res.send(err);
    }
    res.json(events);
  }).sort({ cost: -1 });
})

//sort gia thap den cao
router.get('/sortDESC', (req, res) => {
  Product.find(function (err, events) {
    if (err) {
      res.send(err);
    }
    res.json(events);
  }).sort({ cost: 1 });
})

// author 
router.get('/author', (req, res) => {
  Author.find(function (err, events) {
    if (err) {
      res.send(err);
    }
    res.json(events);
  });
})

//hien thi gio hang da them
router.get('/shopcart/:id', (req, res) => {
  Cart.find({ iduser: req.params.id, confirm: 0 }, function (err, events) {
    if (err) {
      res.send(err);
    }
    res.json(events);
  });
})

//hien thi gio hang da mua
router.get('/shopcartbuy/:id', (req, res) => {
  Cart.find({ iduser: req.params.id, confirm: 1 }, function (err, events) {
    if (err) {
      res.send(err);
    }
    res.json(events);
  });
})


router.put('/updatecart', (req, res) => {
  let userData = req.body
  Cart.updateMany({ iduser: userData.iduser }, userData, function (err) {
    if (err) {
      console.log("Lỗi:" + err)
      res.json("false");
    } else {
      res.json("true")
    }

  })
})

/// delete cart
router.delete('/deleteCart/:id', function (req, res) {

  Cart.findByIdAndRemove(req.params.id, function (err) {
    if (err) {
      res.send(err);
      res.json("product deleted fail!");
    }
    res.json("product deleted successfully!");
  });
});

//count số lượng sản phẩm đã thêm
router.get('/countcart/:id', function (req, res) {
  Cart.aggregate([
    { $match: { confirm: 0, iduser: req.params.id } },
    {
      $group: {
        _id: "$confirm",
        total: {
          $sum: "$soluong"
        }
      }
    }
  ]
    , function (err, count, next) {

      if (err) {
        res.send(err);
      }
      res.json(count)
    });
});

// tổng tiền trong hóa đơn
router.get('/sumcost/:id', function (req, res) {
  Cart.aggregate([
    { $match: { confirm: 0, iduser: req.params.id } },
    {
      $group: {
        _id: "$confirm",
        total: {
          $sum: "$sumcost"
        }
      }
    }
  ]
    , function (err, sum, next) {

      if (err) {
        res.send(err);
      }
      res.json(sum)
    });
});

//insert comment
router.post('/insertComment', (req, res) => {
  let userData = req.body
  let CommentUser = new commentUser(userData)
  CommentUser.save((err, insertData) => {
    if (err) {
      console.log("Lỗi:" + err)
      res.json("false");
    } else {
      res.json("Thank you was comment!")
    }
  })
})

//thong tin của user
router.get('/detailUser/:id', function (req, res) {
  User.findById(req.params.id, function (err, detailUser, next) {
    if (err) {
      res.send(err);
    }
    res.json(detailUser);
  });
});

//delete user
router.delete('/deleteUser/:id', function (req, res) {
  User.findByIdAndRemove(req.params.id, function (err) {
    if (err) {
      res.send(err);
      res.json("User deleted fail!");
    }
    res.json("User deleted successfully!");
  });
});

//update user
router.put('/updateuser', (req, res) => {
  let userData = req.body
  User.updateMany({ _id: userData._id }, userData, function (err) {
    if (err) {
      console.log("Lỗi:" + err)
      res.json("false");
    } else {
      res.json("true")
    }

  })
})
function verifyToken(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).send('Unauthorized request')
  }
  let token = req.headers.authorization.split(' ')[1]
  if (token === 'null') {
    return res.status(401).send('Unauthorized request')
  }
  let payload = jwt.verify(token, 'secretKey')
  if (!payload) {
    return res.status(401).send('Unauthorized request')
  }
  req.userId = payload.subject
  next()
}
module.exports = router;