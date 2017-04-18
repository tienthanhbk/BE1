console.log('Hello nodemon');

const fs = require('fs');
//dung cai thu vien express
const express = require('express');
const bodyParser = require('body-parser');

const imagesController = require(__dirname + '/modules/images/imagesController');
var app = express();

//set public folder public
//app.use(urlencoded)
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json({extended: true}));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
  res.send('./public/index.html');
})

app.post('/image', (req, res) => {
  var imageInfo = {
    name : req.body.name,
    imageLink : req.body.imageLink,
    description : req.body.description
  }

  imagesController.postImage(imageInfo);

  //bao thanh cong
  res.send('Success');
})

//Hien thi toan bo anh
app.get('/image', (req,res) => {
  var imageInfoCollection = imagesController.fetchImageCollection();

  htmlString = '';

  imageInfoCollection.forEach((data) => {
    htmlString += `<div>${data.name}</div><img src="${data.imageLink}"><div>${data.description}</div>`;
  })

  res.send(htmlString);
})

//Tim kiem anh theo name va description
app.get('/image/search', (req,res) => {
  var imageInfo = {
    name : req.query.name,
    imageLink : req.query.imageLink,
    description : req.query.description
  }

  imageInfoCollection = imagesController.getImage(imageInfo);

  htmlString = '';

  imageInfoCollection.forEach((data) => {
    htmlString += `<div>${data.name}</div><img src="${data.imageLink}"><div>${data.description}</div>`;
  })

  res.send(htmlString);
})

//update anh theo link
app.put('/image', (req, res) => {
  var imageInfo = {
    name : req.body.name,
    imageLink : req.body.imageLink,
    description : req.body.description
  }

  imagesController.updateImage(imageInfo);

  res.send("Update Success");
})

//Delete anh theo link
app.delete('/image', (req, res) => {
  var imageInfo = {
    imageLink : req.body.imageLink,
  }

  imagesController.deleteImage(imageInfo);

  res.send("Success delete");
})



//mo 1 cai port de chay local
app.listen(6969, (req, res) => {
  console.log('app listen on 6969');
})
