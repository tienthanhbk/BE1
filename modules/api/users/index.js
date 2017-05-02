const express = require('express');

const Router = express.Router();

const usersController = require('./usersController');

Router.post('/', (req, res) => {
  //khai bao object
  var userInfo = {
    userName : req.body.userName,
    password : req.body.password,
    permission : req.body.permission,
    nickName  : req.body.nickName,
    email : req.body.email
  }

  //regular expressions để valid email
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if(userInfo.email != null){
    if(re.test(userInfo.email) == false){
      res.send("Dia chi email nhap khong dung");

      return;
    }
  }

  console.log('post data ',req.body);

  usersController.addUser(userInfo, (err, doc) => {
    if(err) {
      console.log(err);
      res.send("Co loiiiiiiiiiiiiiiii");
    }
    else {
      res.send("Success");
    }
  });
});

Router.get('/', (req, res) => {
  try {
    usersController.getAllUsers((err, doc) => {
      if(err){
        console.log(err);
        res.send("Co loiiiiiiiiiiiiiiiiiiiiiiiii");
      }
      else {
        res.send(doc);
      }
    });

  } catch (e) {
    console.log(e);
    res.send("Co exceptiom");
  }
})

Router.get('/search/', (req, res) => {
  var userName = req.query.userName;
  console.log(userName);
  usersController.getUsersLikeName(userName, (err, doc) => {
    if(err){
      console.log(err);
      res.send("Co loiiiiiiiiiiiiiiiiiiii");
    }
    else {
      res.send(doc);
    }
  })
})

Router.put('/', (req, res) => {
  if (req.body.id) {
    var newData = {
      id : req.body.id,
      userName : req.body.userName,
      password : req.body.password,
      nickName : req.body.nickName
    }

    usersController.updateUserInfoById(newData, (err) => {
      if(err){
        console.log(err);
        res.send("Co loiiiiiiiiiiiiiiiiii");
      }
      else {
        res.send("Update thanh cong");
      }
    })
  } else {
    req.send("Vui long nhap id, khong thi cho version sau");
  }

})

Router.delete('/', (req, res) => {
  res.send("Chua viet");
})

module.exports = Router;
