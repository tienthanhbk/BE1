const fs = require('fs');
const imagesModel = require('./imagesModel');

//callback(err, ObjectCb)
//ObjectCb: Info off image whith added
var addImage = (data, callback) => {
  imagesModel.findOne({})
  .select('id')
  .sort({id : -1})
  .exec((err, doc) => {
    if(err){
      console.log(err);
      callback(err);
    } else {
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

//callback(err, arrayCb)
//arrayCb: an array all of raw images' data
var getAllImages = (callback) => {
  imagesModel.find({}).populate('createBy').exec((err, doc) => {
    if(err){
      callback(err);
    }
    else {
      callback(null, doc);
    }
  })
}

//callback(err, arrayCb)
//arrayCb: an array all of cooked images' data
var getAllCookedImages = (cb) => {
  getAllImages((err, doc) => {
    if (err) {
      console.log(err);
      cb(err);
    } else {
      var newDoc = doc.map((value) => {//Chuyen documents ve 1 mang
        return cookImageData(value);
      })
      cb(null, newDoc);
    }
  })
}

//return: an Object stored cooked image's data
var cookImageData = (rawImageData) => {
  return {
    _id : rawImageData._id,
    imageUrl : rawImageData.imageLink,
    view : rawImageData.views,
    // date : rawImageData.createAt,
    plus : rawImageData.likes.length,
    posterAvatar : rawImageData.createBy ? rawImageData.createBy.avatar : '',
    posterName : rawImageData.createBy ? rawImageData.createBy.username : '',
    posterTitle : rawImageData.name,
    content : rawImageData.description
  }
}


var getImagesLikeName = (_name, callback) => {
  imagesModel.find({name : new RegExp(_name, 'i')})
  .populate('createBy')
  .exec((err, doc) => {
    if(err){
      callback(err);
    }
    else {
      var newDoc = doc.map((value) => {
        return cookImageData(value);
      })
      callback(null, newDoc);
    }
  })
}

var getImagesLikeDescription = (_des, callback) => {
  imagesModel.find({description : new RegExp(_des, 'i')})
  .populate('createBy')
  .exec((err, doc) => {
    if(err){
      callback(err);
    }
    else {
      callback(null, doc);
    }
  })
}

var getImagesById = (id, callback) => {
  imagesModel.find({_id : id})
  .populate('createBy')
  .exec((err, doc) => {
    if(err){
      callback(err);
    }
    else {
      var newDoc = doc.map((value) => {
        plusViewOfImage(value._id, (err) => {
          if(err){
            console.log('Co loi khi plus view: ');
            console.log(err);
          }
        })
        return cookImageData(value);
      })
      callback(null, newDoc);
    }
  })
}

//callback(err)
var plusViewOfImage = (id, callback) => {
  imagesModel.update({_id : id},
    {$inc : //increase view by 1
      {
        views : 1
      }
    }).exec((err) => {
      callback(err);
    }
  )
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
  var query = {};

  if(info.name != null){
    query.name = info.name;
  }

  if(info.description != null){
    query.description = info.description;
  }

  if(info.imageLink != null){
    query.imageLink = info.imageLink;
  }

  imagesModel.update({id : info.id},
    {$set : //dùng $set để chỉ làm thay đổi các fields được chỉ định
      { name : info.name,
        description : info.description,
        imageLink: info.imageLink
      }
    }).exec((err) => {
      callback(err);
    }
  )

}

module.exports = {
  addImage,
  getAllImages,
  deleteImageById,
  updateImageInfoById,
  getImagesLikeName,
  getImagesLikeDescription,
  getImagesById,
  getAllCookedImages
}
