const mongoose = require('mongoose')

const lessonSchema = mongoose.Schema({
    topicId : Number,
    lessonId : Number,
    lessonNameVn : String,
    lessonNameEn : String,
    type : String,
    minScore : {type : Number, default : 70},
    maxScore : {type : Number, default : 100}
})

module.exports = mongoose.model('lesson', lessonSchema)