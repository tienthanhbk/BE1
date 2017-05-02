const fs = require('fs');
const imagesModel = require('./imagesModel');

var addImage = (data, callback) => {
  imagesModel.findOne({})
  .select('id')
  .sort({id : -1})
  .exec((err, doc) => {
    if(err){
      console.log(err);
      callback(err);
    }
    else {
      var id = doc && doc.id ? doc.id + 1 : 1;

      data.id = id;

      imagesModel.create(data, (err, doc) => {
        if (err) {
          console.log(err);
          callback(err);
        } else {
          console.log(doc);
          callback(null, doc);
        }
      })
    }
  })


}

var getFinalId = (callback) => {
  imagesModel.find({}, (err, doc) => {
    if(err){
      callback(err);
    }
    else {
      callback(null, doc);
    }
  })
}

var getAllImages = (callback) => {
  imagesModel.find({}, (err, doc) => {
    if(err){
      callback(err);
    }
    else {
      callback(null, doc);
    }
  })

}

var getImagesLikeName = (_name, callback) => {
  imagesModel.find({name : new RegExp(_name, 'i')}).exec((err, doc) => {
    if(err){
      callback(err);
    }
    else {
      callback(null, doc);
    }
  })
}

var deleteImageById = (_id, callback) => {
  imagesModel.remove({id : _id}, (err) => {
    if(err) callback(err);
    else
      //remove
      callback(null);
  })
}

var updateImageInfoById = (info, callback) => {
  imagesModel.update({id : info.id},
    {$set : //dùng $set để chỉ làm thay đổi các fields được chỉ định
      { name : info.name,
        description : info.description,
        imageLink: info.imageLink
      }
    }).exec((err) => {
      callback(err);
    })

}

var fetchImageCollection = () => {
  var imageInfoCollection = [];

  try {
    var contents = fs.readFileSync('imageData.json','utf-8');

    imageInfoCollection = JSON.parse(contents);

  } catch (e) {
    console.log(e);
  }

  return imageInfoCollection;
}

var saveImageCollection = (data) => {
    fs.writeFileSync('imageData.json', JSON.stringify(data));
}

var updateImageCollectionById = (id, newData) => {
  var imageInfoCollection = fetchImageCollection();

  if (id < 1 || id > imageInfoCollection.length)
    return 'Id invalid';
  else {
    imageInfoCollection[id-1] = newData;

    saveImageCollection(imageInfoCollection);
    return 'Success';
  }
}

module.exports = {
  fetchImageCollection,
  saveImageCollection,
  updateImageCollectionById,
  addImage,
  getAllImages,
  getFinalId,
  deleteImageById,
  updateImageInfoById,
  getImagesLikeName
}
