const fs = require('fs');
const imagesModel = require('./imagesModel');


var addImage = (data) => {
  imagesModel.create(data, (err, doc) => {
    if (err) {
      console.log(err);
    }
    else {
      console.log(doc);
    }
  })
}

var deleteImage = (data) => {
  imagesModel.deleteOne(data, (err, doc) => {
    if (err) {
      console.log(err);
    }
    else {
      console.log(doc);
    }
  })
}

var fetchImageCollection = () => {
  // var imageInfoCollection = [];
  //
  // try {
  //   var contents = fs.readFileSync('imageData.json','utf-8');
  //
  //   imageInfoCollection = JSON.parse(contents);
  //
  // } catch (e) {
  //   console.log(e);
  // }
  //
  // return imageInfoCollection;
}

var fetchImageByName = (_name) => {
  var data;
  var getData= (callback)=>{
    var obj;
    imagesModel.find({name : _name}, (err, data)=>{
      if(err){
        console.log(err);
      }
      else{
        obj= data;
        return callback(obj);
      }
    });
  }

  getData(function(_data){
    console.log(_data + "em chua biet cach de cho ra res nhung bay gio buon ngu qua roi :(((");
    data = _data;
    return JSON.stringify(_data);
  })

  return data;
}

var saveImageCollection = (data) => {
    fs.writeFileSync('imageData.json', JSON.stringify(data));
}

var updateImageCollectionById = (id, newData) => {
  imagesModel.update({_id : id}, newData, (err, raw) => {
    if (err) return handleError(err);
    console.log('The raw response from Mongo was ', raw);
  })
}
module.exports = {
  fetchImageCollection : fetchImageCollection,
  fetchImageByName : fetchImageByName,
  saveImageCollection : saveImageCollection,
  updateImageCollectionById : updateImageCollectionById,
  addImage : addImage,
  deleteImage : deleteImage
}
