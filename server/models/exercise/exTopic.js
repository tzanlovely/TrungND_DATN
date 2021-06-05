const mongoose = require('mongoose')

const exTopicSchema = mongoose.Schema({
    exTopicId : Number,
    exTopicNameVn : String,
    exTopicNameEn : String,
    exListLesson : {type : [], default : []}
})

module.exports = mongoose.model('extopic', exTopicSchema)