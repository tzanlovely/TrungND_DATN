const express = require('express')
const router = express.Router();
const ExLesson = require('../../models/exercise/exLesson')
const ExTopic = require('../../models/exercise/exTopic')

//Create new exercise lesson
router.post('/postExLesson', async(req,res)=> {
    const exLesson = new ExLesson({
        exTopicId : req.body.exTopicId,
        exLessonId : req.body.exLessonId,
        exLessonNameVn : req.body.exLessonNameVn,
        exLessonNameEn : req.body.exLessonNameEn,
        type : req.body.type,
        maxScore : req.body.maxScore
    })

    try {
        await exLesson.save();
        await ExTopic.findOneAndUpdate({exTopicId : req.body.exTopicId}, {$push : { exListLesson : exLesson }})
        res.json({
            success : true,
            message : "Created new exercise"
        })
    } catch (error) {
        res.status(500).send({
            success : false,
            message : "Internal server error"
        })
    }
})

module.exports = router;