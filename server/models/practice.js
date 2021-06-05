const mongoose = require('mongoose')

const practiceSchema = mongoose.Schema({
    topicId : Number,
    lessonId : Number,
    lessonNameVn : String,
    lessonNameEn : String,
    type : {type : String, default : "practice"},
    slides : {type : [], default : []}
})

module.exports = mongoose.model('practice', practiceSchema)