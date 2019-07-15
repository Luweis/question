const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const {QUESTYPE} = require('./enum');
const multer = require('multer');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log('======');
    // 接收到文件后输出的保存路径（若不存在则需要创建）
    cb(null, 'upload/');
  },
  filename: function (req, file, cb) {
    // 将保存文件名设置为 时间戳 + 文件原始名，比如 151342376785-123.jpg
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const createFolder = function(folder){
  try{
    // 测试 path 指定的文件或目录的用户权限,我们用来检测文件是否存在
    // 如果文件路径不存在将会抛出错误"no such file or directory"
    fs.accessSync(folder);
  }catch(e){
    // 文件夹不存在，以同步的方式创建文件目录。
    fs.mkdirSync(folder);
  }
};

createFolder('./upload/');

const app = express();
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

const upload = multer({ storage });
const Question = require('./models/question');

app.use('/public', express.static(path.join(__dirname, 'public')));

app.post('/upload',upload.single('file'), function (req, res) {
  console.log('post =======');
  res.json({ code: '0', msg: 'success'});
});

app.use('/test', function (req, res, next) {
  const ques = new Question({
    title: '问题一',
    type: QUESTYPE.One,
    options: [
      {
        des: '描述一',
        img: {
          id: 12,
          src: ''
        }
      }
    ]
  });

  ques.save(function (error) {
    console.log(error);

    Question.find().then(function (data) {
      console.log('data is %o', data);
    })
  });

  next()
});


//监听http请求
mongoose.connect('mongodb://localhost:27018/blog', function (err) {
  if (err) {
    console.log('数据库连接失败');
  } else {
    console.log('数据库连接成功');
    app.listen(8090);
  }
});
