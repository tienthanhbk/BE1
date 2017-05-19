const express = require('express');
const Router = express.Router();
const imagesController = require('./imagesController');

Router.post('/', (req, res) => {
  //khai bao object
  var imageInfo = {
    name : req.body.name,
    imageLink : req.body.imageLink,
    description : req.body.description,
    createBy : req.body.userId
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

//Thiếu 2 trường posterAvatar và posterName.
//Why???????
Router.get('/', (req, res) => {
  try {
    if(req.query.s){
      //Co query s thi
      imagesController.getImagesLikeName(req.query.s, (err, data) => {
        if(err) {
          console.log(err);
          res.send('Co loi');
        } else {
          res.send(data);
        }
      })
    } else if(req.query.id){
      //Co query id thi
      imagesController.getImagesById(req.query.id, (err, data) => {
        if(err) {
          console.log(err);
          res.send('Co loi, khong co id tuong ung');
        } else {
          res.send(data);
        }
      })
    } else {
      //Ko co query s va id thi get all
      imagesController.getAllCookedImages((err, data) => {
        if(err) {
          console.log(err);
          res.send("co Loiii");
        } else {
          res.send(data);
        }
      });
    }

  } catch (e) {
    console.log(e);
    res.send("Co exceptiom");
  }
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
