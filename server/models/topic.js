const mongoose = require('mongoose')


const topicSchema = mongoose.Schema({
    topicId : Number,
    image : String,
    topicNameVn : String,
    topicNameEn : String,
    listLesson : {type : [], default : []}
})

module.exports = mongoose.model('topic', topicSchema)