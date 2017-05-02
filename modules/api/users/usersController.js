const fs = require('fs');
const usersModel = require('./usersModel');

var addUser = (data, callback) => {
  usersModel.findOne({})
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

      usersModel.create(data, (err, doc) => {
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

var getAllUsers = (callback) => {
  usersModel.find({}, (err, doc) => {
    if(err){
      callback(err);
    }
    else {
      callback(null, doc);
    }
  })

}

var fetchUserCollection = () => {

}

var saveUserCollection = (data) => {

}

var updateUserCollectionById = (id, newData) => {

}

module.exports = {
  addUser,
  getAllUsers
}
