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

  //luu lai vao DB
  imagesController.addImage(imageInfo);
  //bao thanh cong
  res.send('Success');
})

Router.get('/', (req, res) => {
  var imageInfoCollection = imagesController.fetchImageCollection();
  res.send(imageInfoCollection);

  var imageInfo = {
    name : req.body.name,
    imageLink : req.body.imageLink,
    description : req.body.description
  }



})

Router.get('/search', (req, res) => {
  var imageInfo = {
    name : req.query.name
  }
  var imageInfoCollection = imagesController.fetchImageByName(imageInfo.name);

  res.send(imageInfoCollection + "hehe");

})

Router.put('/', (req, res) => {
  if(req.body.id) {
    var newData = {
      name  : req.body.name,
      imageLink : req.body.imageLink,
      description : req.body.description
    }

    var result = imagesController.updateImageCollectionById(req.body.id, newData);

  }
  else {
    res.send("Dont't have id");
  }

  res.send("Success");

})

Router.delete('/', (req, res) => {
  //khai bao object
  var imageInfo = {
    id : req.body._id
  }

  //luu lai vao DB
  imagesController.deleteImage(imageInfo);
  //bao thanh cong
  res.send('Success');
})

module.exports = Router;
