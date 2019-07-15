const mongoose = require('mongoose');

//用户的表结构
module.exports = new mongoose.Schema({

  //用户名
  username: {
    type: String,
  }
});
