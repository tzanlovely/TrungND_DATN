const mongoose = require('mongoose')

const fixSlides = [
    {
        slideId : 1,
        type : "theory",
        content : [
            {
                title : "Cấu trúc (Form)",
                detail : [
                    {line : "I, We, You, They + Verb (bare-infinitive)"},
                    {line : "He, She, It + Verb + s/es"}
                ]
            }
        ]
    },
    {
        slideId : 2,
        type : "theory",
        content : [
            {
                title : "",
                detail : [
                    {line : ""},
                    {line : ""}
                ]
            }
        ]
    },
    {
        slideId : 3,
        type : "practice",
        content : [
            {
                title : "",
                detail : []
            }
        ]
    }
]

const theorySchema = mongoose.Schema({
    topicId : Number,
    lessonId : Number,
    lessonNameVn : String,
    lessonNameEn : String,
    type : {type : String, default : "theory"},
    slides : {type : [], default : []}
})

module.exports = mongoose.model('theory', theorySchema)