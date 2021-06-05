const express = require('express');
const router = express.Router();
const ExLesson = require('../../models/exercise/exLesson');

//Post new slide
router.post('/postExSlide', async(req, res) => {
    const exSlide = {
        exSlideId : req.body.exSlideId,
        type : req.body.type,
        content : req.body.content
    }

    try {
        await ExLesson.findOneAndUpdate({exTopicId : req.body.exTopicId, exLessonId : req.body.exLessonId, type : req.body.type}, {$push : { slides : exSlide}})
        res.json({
            success : true,
            message : "Created new slide"
        })
    } catch (error) {
        res.status(500).send({
            success : false,
            message : "Internal server error"
        })
    }
})

module.exports = router;