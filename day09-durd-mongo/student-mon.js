var mongoose = require('mongoose')
var Schema = mongoose.Schema

//链接数据库
mongoose.connect('mongodb://localhost/test')

var studentSchema = new Schema({
    name: { type: String, default: 'liwei', required: true },
    gender: { type: Number, enum: [0, 1], default: 1 ,required: true},
    age: { type: Number, default: 22, required: true},
    hobbies: { type: String, default: 'play code', required: true}
})

//导出学生模型构造函数
module.exports = mongoose.model('Student', studentSchema)