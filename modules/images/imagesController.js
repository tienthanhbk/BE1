const fs = require('fs');

var fetchImageCollection = () => {
  var imageInfoCollection = [];

  try {
    var contents = fs.readFileSync('imageData.json', 'utf-8');

    imageInfoCollection = JSON.parse(contents);

  } catch (e) {
    console.log(e);
  }

  return imageInfoCollection;
}

var saveImageCollection = (data) => {
  fs.writeFileSync('imageData.json', JSON.stringify(data));
}

//Tim kiem anh theo name va description
var getImage = (imageInfo) => {
  var imageInfoCollection = fetchImageCollection();

  var images = [];

  name = imageInfo.name.toLowerCase();

  description = imageInfo.description.toLowerCase();

  imageInfoCollection.forEach((data, index) => {
    var dataName = data.name.toLowerCase();
    var dataDescription = data.description.toLowerCase();
    if(dataName.search(name) >= 0 && dataDescription.search(description) >= 0){
      images.push(data);
    }
  })

  return images;
}

//Them anh
var postImage = (imageInfo) => {
  //doc du lieu tu file imageData
  var imageInfoCollection = fetchImageCollection();

  //push data moi vao colletiom
  imageInfoCollection.push(imageInfo);

  //luu lai vao file
  saveImageCollection(imageInfoCollection);

}

//Sua thong tin anh, gom co name va description
var updateImage = (imageInfo) => {
  var imageInfoCollection = fetchImageCollection();

  var imageAlive = false;
  imageInfoCollection.forEach((data, index) => {
    if(data.imageLink == imageInfo.imageLink){
      data.name = imageInfo.name;

      data.description = imageInfo.description;

      imageAlive = true;
    }
  })

  if(imageAlive == false){
    postImage(imageInfo);
    console.log("chua co anh nay 2222222222");
  }
  else {
    saveImageCollection(imageInfoCollection);
  }

}

//Xoa anh theo link
deleteImage = (imageInfo) => {
  var imageInfoCollection = fetchImageCollection();

  imageInfoCollection.forEach((data, index) => {
    if(data.imageLink == imageInfo.imageLink){
      imageInfoCollection.splice(index, 1);
    }
  })

  saveImageCollection(imageInfoCollection);
}

module.exports = {
  fetchImageCollection  : fetchImageCollection,
  saveImageCollection   : saveImageCollection,
  postImage             : postImage,
  updateImage           : updateImage,
  deleteImage           : deleteImage,
  getImage              : getImage
}
