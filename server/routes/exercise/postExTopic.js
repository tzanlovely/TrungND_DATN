const express = require('express');
const router = express.Router();
const ExTopic = require('../../models/exercise/exTopic')

//Create new exercise topic
router.post('/postExTopic', async(req,res) => {
    const exTopic = new ExTopic({
        exTopicId : req.body.exTopicId,
        exTopicNameVn : req.body.exTopicNameVn,
        exTopicNameEn : req.body.exTopicNameEn
    })

    try {
        await exTopic.save();
        res.json({
            success : true,
            message : "Created new exercise topic"
        })
    } catch (error) {
        res.status(500).send({
            success : false,
            message : "Internal server error"
        })
    }
})

module.exports = router;