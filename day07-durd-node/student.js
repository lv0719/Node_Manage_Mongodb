const { call } = require('body-parser')
var fs = require('fs')

//想要获取异步函数处理的结果，可以传递一个callback进去
//在这里不处理业务，只处理数据
//这才是node的精髓

//封装的json读取所有学生数据的方法
exports.findAll = function (callback) {
    fs.readFile('./db.json', 'utf-8', function (err, data) {
        if (err) {
            return callback(err)
        }
        callback(null, JSON.parse(data).students) 
    })

}

//封装的json读取所有学生数据的方法
exports.save = function (student, callback) {
    //传入学生对象，将学生对象加入到db.json中
    fs.readFile('./db.json', 'utf-8', function (err, data) {
        if (err) {
            return callback(err)
        }
        var students = JSON.parse(data).students, obj = {}
        obj.students = [student, ...students]
        var str = JSON.stringify(obj)
        fs.writeFile('./db.json', str, function (err) {
            if (err) {
                callback(err)
            }
            callback()
        })

    })
}

//封装更新学生数据
exports.update = function (student, callback) {
    //通过传入的学生对象，然后将起加入到db.json中
    fs.readFile('./db.json', 'utf-8', function (err, data) {
        if (err) {
            return callback(err)
        }
        var students = JSON.parse(data).students
        // var obj = students.find((item) => {
        //     return student.id == item.id
        // })
        // for(let key in student){
        //     obj[key] = student[key]
        // }

        students.forEach((item, index) => {
            if (item.id == student.id) {
                students[index] = student
                return
            }
        })
        var str =  JSON.stringify({students: students})
        fs.writeFile('./db.json', str, function (err) {
            if (err) {
               return callback(err) 
            }
            callback()
        })
    })
}

//根据id去查找对应数据用于模板渲染到编辑页面
exports.findById = function (id, callback) {
    fs.readFile('./db.json', 'utf-8', function (err, data) {
        if (err) {
            return callback(err)
        }
        var students = JSON.parse(data).students
        var stu = students.find((item) => {
            return item.id == id
        })
        callback(null, stu)
    })
}   

//封装删除学生数据
exports.delete = function (id, callback) {
    //根据传入的学生id去匹配对应的学生，然后删除
    fs.readFile('./db.json', 'utf-8', function (err, data) {
        if (err) {
            return callback(err)
        }
        var students = JSON.parse(data).students
        students.forEach((item, index) => {
            if (item.id == id) {
                students.splice(index, 1)
                return
            }
        })
        var str = JSON.stringify({students: students})
        fs.writeFile('./db.json', str, function (err) {
            if (err) {
                return callback(err)
            }
            callback()
        })
    })
}
function jieliu (fn, delay) { //函数的节流
    var date = Date.now()
    return function () {
        let time = Date.now()
        if(time - date < delay) {return}
        fn.call(this)
        date = Date.now()
    }
}
function fangdou (fn, delay) { //函数的防抖
    var timer = null
    return function () {
        if(timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            fn.call(this, arguments)
        }, delay)
    }
}