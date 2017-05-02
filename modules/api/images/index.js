const express = require('express');

const Router = express.Router();

const imagesController = require('./imagesController');

Router.post('/', (req, res) => {
  //khai bao object
  var imageInfo = {
    name : req.body.name,
    imageLink : req.body.imageLink,
    description : req.body.description
  }

  console.log('post data ',req.body);

  imagesController.addImage(imageInfo, (err, doc) => {
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
    imagesController.getAllImages((err, doc) => {
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
  var name = req.query.name;
  res.send(name);
})

Router.put('/', (req, res) => {
  if (req.body.id) {
    var newData = {
      id : req.body.id,
      name : req.body.name,
      imageLink : req.body.imageLink,
      description : req.body.description
    }

    imagesController.updateImageInfoById(newData, (err) => {
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
  var id = req.body.id;
  imagesController.deleteImageById(id, (err) => {
    if(err) res.send("Co loiiiiiiiiiiiiiiiiiii khi xoa");
    else res.send("Xoa thanh cong");
  });
})

module.exports = Router;
