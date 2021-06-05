require('dotenv').config();
const express = require('express');
const router = express.Router();
const Topic = require('../models/topic');

//Create new topic
router.post('/postTopic', async(req,res) => {
    const topic = new Topic({
        topicId : req.body.topicId,
        image : req.body.image,
        topicNameVn : req.body.topicNameVn,
        topicNameEn : req.body.topicNameEn
    })

    try {
        const saveTopic = await topic.save();
        res.json({
            success : true,
            message : "Created new topic"
        }) 
    }
    catch (error) {
        res.status(500).send({
            success : false,
            message : "Internal server error"
        })
    }
})

module.exports = router;