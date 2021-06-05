const express = require('express');
const router = express.Router();
const ExTopic = require('../../models/exercise/exTopic');
const verifyToken = require('../../middlewares/verifyToken');
const ExLesson = require('../../models/exercise/exLesson');

//Get list exercise topic and lesson
router.post('/getExercisePage', verifyToken, async(req, res) => {
    var listExTopic = await ExTopic.find();
    res.send(listExTopic);
})

router.post('/getLessonSlide', verifyToken, async(req, res) => {
    var lesson = await ExLesson.findOne({exTopicId : req.body.exTopicId, exLessonId : req.body.exLessonId})
    res.send(lesson.slides)
})

module.exports = router;