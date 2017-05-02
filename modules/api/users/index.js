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

Router.put('/', (req, res) => {
  res.send("Chua viet");
})

Router.delete('/', (req, res) => {
  res.send("Chua viet");
})

module.exports = Router;
