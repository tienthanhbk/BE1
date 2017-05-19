const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

var imagesModel = new Schema({
  id : { type : Number, required: true },
  name : { type : String, default : '' },
  imageLink : { type : String , default : ''},
  description : { type : String },
  views : { type : Number, default : 0 },
  likes : [{
    likeBy : { type : ObjectId, ref : 'users' }
  }],
  comments : [{
    comment : { type : String },
    commentBy : { type : ObjectId, ref : 'users' }
  }],
  createBy : { type : ObjectId, ref : 'users' }
}, { timestamps : true });//timestamps.createAt timestamps.updateAt

module.exports = mongoose.model('images', imagesModel);
