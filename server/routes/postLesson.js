require('dotenv').config();
const express = require('express');
const router = express.Router();
const Lesson = require ('../models/lesson');
const Theory = require('../models/theory');
const Practice = require('../models/practice');
const Topic = require ('../models/topic')

//Create new lesson
router.post('/postLesson', async(req,res) => {
    const lesson = new Lesson({
        topicId : req.body.topicId,
        lessonId : req.body.lessonId,
        lessonNameVn : req.body.lessonNameVn,
        lessonNameEn : req.body.lessonNameEn,
        type : req.body.type
    });

    if (req.body.type == "theory") {
        const theory = new Theory({
            topicId : req.body.topicId,
            lessonId : req.body.lessonId, 
            lessonNameVn : req.body.lessonNameVn,
            lessonNameEn : req.body.lessonNameEn           
        })
        await theory.save();
    } else if (req.body.type == "practice") {
        const practice = new Practice({
            topicId : req.body.topicId,
            lessonId : req.body.lessonId,  
            lessonNameVn : req.body.lessonNameVn,
            lessonNameEn : req.body.lessonNameEn     
        })
        await practice.save();
    }

    try {
        const saveLesson = await lesson.save();
        console.log("hello 1")
        await Topic.findOneAndUpdate({topicId : req.body.topicId}, {$push : { listLesson : lesson}})
        console.log("hello 2")
        res.json({
            success: true,
            message: "Created new lesson"
        })
    } catch (error) {
        res.status(500).send({
            success : false,
            message : "Internal server error"
        });
    }
})

module.exports = router;