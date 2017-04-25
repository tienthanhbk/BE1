const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var imagesModel = new Schema({
  id : { type: Number, require : true},
  name : { type : String, default : ''},
  imageLink : { type : String, default : ''},
  description : { type : String},
  view : { type : Number, default : 0},
  likes : [{
    likeBy : { type : Number}
  }],
  comments : [{
    comment : { type : String},
    commentBy : { type : Number}
  }]
});

module.exports = mongoose.model('image', imagesModel);