const express =require('express');
const router = express.Router();
const LearnProcess = require('../models/learnProcess');
const verifyToken = require('../middlewares/verifyToken');
const schedule = require('node-schedule');

const dailyUpdate = schedule.scheduleJob('0 * * * *', async function(){
    await LearnProcess.updateMany({}, { $pop : {lastStreak : -1}})
    await LearnProcess.updateMany({}, { $push : {lastStreak : 0}})
    console.log('daily')
})

router.post('/getDashboard', verifyToken, async(req,res) =>{
    const userProcess = await LearnProcess.findOne({username : req.body.username});
    res.json({
        currentLesson : userProcess.currentLesson,
        totalScore : userProcess.totalScore,
        lastStreak : userProcess.lastStreak
    })
})

router.post('/getLearnProcess', verifyToken, async(req,res) =>{
    const userProcess = await LearnProcess.findOne({username : req.body.username});
    res.send(userProcess.learnProcess)
})

router.post('/getExerciseProcess', verifyToken, async(req,res) =>{
    const exerciseScore = await LearnProcess.findOne({username : req.body.username});
    res.send(exerciseScore.exerciseProcess)
})

router.post('/getScoreboard', verifyToken, async(req,res) =>{
    const userProcess = await LearnProcess.find().sort({totalScore : -1}).limit(5);
    var scoreboard = [];
    userProcess.map(each => (
        scoreboard.push({name: each.username, score : each.totalScore})
    ))
    console.log(scoreboard)
    res.send(scoreboard)
})

router.post('/finishStudyLesson', verifyToken, async(req, res) => {
    var diffScore = req.body.newScore - req.body.currentScore;
    if (diffScore > 0) {
        if (req.body.currentScore < req.body.minScore && req.body.newScore >= req.body.minScore) {
            try {
                var scoreField = "learnProcess." + (req.body.topicId -1) + "." + (req.body.lessonId -1)
                await LearnProcess.findOneAndUpdate({username : req.body.username}, {$set : {[scoreField] : req.body.newScore}},  {new : true})
                await LearnProcess.findOneAndUpdate({username : req.body.username}, {$inc : {totalScore : diffScore}}, {new : true})
                await LearnProcess.findOneAndUpdate({username : username}, {$inc : {"lastStreak.5" : 1}}, {new : true})
                res.send("success")
            } catch (error) {
                console.log(error)
            }
        } else {
            try {
                var scoreField = "learnProcess." + (req.body.topicId -1) + "." + (req.body.lessonId -1)
                await LearnProcess.findOneAndUpdate({username : req.body.username}, {$set : {[scoreField] : req.body.newScore}},  {new : true})
                await LearnProcess.findOneAndUpdate({username : req.body.username}, {$inc : {totalScore : diffScore}}, {new : true})
                res.send("success")
            } catch (error) {
                console.log(error)
            }
        }
    }

    try {
        await LearnProcess.findOneAndUpdate({username : req.body.username}, {$set : {"currentLesson.topicId" : req.body.topicId, "currentLesson.lessonId" : req.body.lessonId}}, {new : true})
    } catch (error) {
        console.log(error)
    }
})

// router.post('/finishExerciseLesson', verifyToken, async(req, res) => {
//     var diffScore = req.body.newScore - req.body.currentScore;
//     if (diffScore > 0) {
//         if (req.body.currentScore < req.body.minScore && req.body.newScore >= req.body.minScore) {
//             try {
//                 var scoreField = "learnProcess." + (req.body.exTopicId -1) + "." + (req.body.exLessonId -1)
//                 await LearnProcess.findOneAndUpdate({username : req.body.username}, {$set : {[scoreField] : req.body.newScore}},  {new : true})
//                 await LearnProcess.findOneAndUpdate({username : req.body.username}, {$inc : {totalScore : diffScore}}, {new : true})
//                 await LearnProcess.findOneAndUpdate({username : username}, {$inc : {"lastStreak.5" : 1}}, {new : true})
//                 res.send("success")
//             } catch (error) {
//                 console.log(error)
//             }
//         } else {
//             try {
//                 var scoreField = "learnProcess." + (req.body.topicId -1) + "." + (req.body.lessonId -1)
//                 await LearnProcess.findOneAndUpdate({username : req.body.username}, {$set : {[scoreField] : req.body.newScore}},  {new : true})
//                 await LearnProcess.findOneAndUpdate({username : req.body.username}, {$inc : {totalScore : diffScore}}, {new : true})
//                 res.send("success")
//             } catch (error) {
//                 console.log(error)
//             }
//         }
//     }

//     try {
//         await LearnProcess.findOneAndUpdate({username : req.body.username}, {$set : {"currentLesson.topicId" : req.body.topicId, "currentLesson.lessonId" : req.body.lessonId}}, {new : true})
//     } catch (error) {
//         console.log(error)
//     }
// })

exports.dailyUpdate = dailyUpdate
module.exports = router;