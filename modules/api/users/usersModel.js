const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var usersModel = new Schema({
  id : { type : Number, required: true },
  userName : { type : String, required: true},
  password  : {type : String, required: true},
  permission  : {type : Number, required: true, default : 0},
  nickName  : {type : String, default : 'Guess'},
  rank  : {type : Number, required: true, default : 0},
  email : {type : String}
});

module.exports = mongoose.model('users', usersModel);
