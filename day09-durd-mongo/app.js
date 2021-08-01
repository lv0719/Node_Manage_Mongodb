var express = require('express')
var bodyParser = require('body-parser')
var router = require('./router')
var app = express()

app.engine('html', require('express-art-template'))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/public/', express.static('./public'))
app.use('/node_modules/', express.static('./node_modules'))

//把路由容器挂载到app服务中
app.use(router) 

app.listen(3031, function () {
    console.log('server is runing in port 3031')
})

module.exports = app
//有router的引入以后，app.js文件主要做一些服务的配置
    //启动服务
    //如模板引擎
    //body-parser解析post请求体
    //开放静态资源服务
    //挂在路由
    //监听端口监听服务


//package-lock.json 文件主要是保存了node_modules里面包的所有依赖信息，如版本号，下载地址等
//这个lock的意思是用来锁住对应依赖的版本，防止在npm install的时候自动下载最新的依赖版本


//JS 模块化
//Node中的CommonJS
//浏览器中的
    //AMD require.js
    //CMD sea.js
//ECMAScript官方在ECMAScript中增加了官方支持


//Node中如何操作数据mongodb数据库
    //使用第三方mongoose来操作mongodb数据库
    //它是基于官方的mongodb处理工具做了进一步的封装