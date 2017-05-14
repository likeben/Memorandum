// SSL证书
const fs = require('fs');
const http = require('http');
const https = require('https');

const options = {
  ca: [fs.readFileSync('./credentials//1_root_bundle.crt'), fs.readFileSync('./credentials/2_www.likeben.cn.crt')],
  cert: fs.readFileSync('./credentials/2_www.likeben.cn.crt'),
  key: fs.readFileSync('./credentials/3_www.likeben.cn.key')
};

// 创建应用
const express = require('express');
const app = express();
const httpServer = http.createServer(app);
const httpsServer = https.createServer(options, app);

const path = require('path');

// 解析post请求
let bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// 引入数据库
let db = require('./lib/db');

// icon
const favicons = require('connect-favicons');
app.use(favicons('./www/favicon'));

// 设置静态站点
app.use(express.static('./www'));
app.use(express.static('./src'));

// 获取列表
app.get('/getlist', (req, res) => {
  db.findDocuments((docs)=>{
    res.json(docs);
  })
})

// 新建任务
app.post('/addtask', (req, res) => {
  db.insertDocuments([req.body], (info)=>{
    res.send('OK');
  })
})

// 删除任务
app.post('/deletetask', (req, res) => {
  db.deleteDocuments(req.body, (info)=>{
    res.send('OK');
  })
})

// 改变任务状态
app.post('/changecheck', (req, res) => {
  db.updateDocuments({pid : req.body.pid}, {check : req.body.check}, (info)=>{
    res.send('OK');
  })
})

// 更新任务
app.post('/updatetask', (req, res) => {
  db.updateDocuments({pid : req.body.pid}, {content : req.body.content, time : req.body.time}, (info)=>{
    res.send('OK');
  })
})

// 获取地图页面
app.get('/amap', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/amap/location.html'))
})



// 启动应用
//app.listen(8080);
httpServer.listen(8080);
httpsServer.listen(8001);
