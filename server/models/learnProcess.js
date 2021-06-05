const mongoose = require('mongoose')

const fix = [[],[],[],[],[],[],[],[],[]]

const streak = [0,0,0,0,0]

const learnProcessSchema = mongoose.Schema({
    username : String,
    learnProcess : {type : [], default : fix},
    exerciseProcess : {type : [], default : fix},
    currentLesson : {type : Object, default : { topicId : 1, lessonId : 1, exTopicId : 1, exLessonId : 1}},
    totalScore : {type : Number, default : 0},
    lastStreak : {type : [], default : streak}
})

module.exports = mongoose.model('learnProcess', learnProcessSchema)