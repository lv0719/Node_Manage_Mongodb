var fs = require('fs')
var student = require('./student')
var express = require('express')
//express提供了一个更好的方式，专门用来包装路由的
var router = express.Router()

//挂载get,post方法到router中
        router.get('/studens', function (req, res) {
            student.findAll(function (err, students) {
                if(err){
                    return res.status(500).send('server error')
                }
                res.render('index.html', {
                    datas: [    
                        '香蕉',
                        '菠萝',
                        '苹果',
                        '菠萝蜜'
                    ],
                    students: [...students]
                })
            })
           
            //res.send('ok')
        })
        router.get('/students/new', function (req, res) {
            res.render('new.html')
        })
        router.post('/studens/new', function (req, res) {
                var body = req.body
                body = { ...body }
                body.id = parseInt(Math.random()*100)+1
                student.save(body, function (err) {
                    if (err) {
                        return res.status(500).end('server error')
                    }
                    console.log('添加成功')
                    res.redirect('/studens')
                })
                
        })
        router.get('/students/edit', function (req, res) {
            //得到想要编辑学生的id
            //把编辑学生页面渲染出去，使用模板引擎
            var id = parseInt(req.query.id)
            student.findById(id, function (err, data) {
                if (err) {
                    return res.status(500).end('server error')
                }
                res.render('edit.html', {
                    student: data
                })
            })
            // res.render('edit.html')
        })
        router.post('/students/edit', function (req, res) {
            //获取编辑好后的学生信息
            //然后保存到db.json
            //处理响应，重定向
            var body = req.body
            student.update(body, function (err) {
                if (err) {
                    return res.status(500).end('server error')
                }
                res.redirect('/studens')
            })
            
        })
        router.get('/students/delete', function (req, res) {
            //获取要删除学生对象的id，然后传入函数，匹配删除掉对应学生信息
            var id = parseInt(req.query.id)
            student.delete(id, function (err) {
                if (err) {
                    return res.status(500).end('server error')
                }
                res.redirect('/studens')
            })
        })
module.exports = router

//router.js文件主要用来处理路由
        //根据不同的请求方法+路径来设置具体的请求处理函数