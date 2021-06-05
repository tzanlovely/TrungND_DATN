require('dotenv').config();
const express = require('express');
const router = express.Router();
const Theory = require('../models/theory');
const Practice = require('../models/practice')

//Post new theory slide
router.post('/postTheory', async(req,res) => {
    const slide = {
        slideId : req.body.slideId,
        type : req.body.type,
        content : req.body.content
    }

    try {
        await Theory.findOneAndUpdate({topicId : req.body.topicId, lessonId : req.body.lessonId}, {$push : {slides : slide}})
        res.json({
            success : true,
            message : "Created new slide"
        })
    } catch (error) {
        res.status(500).send({
            success : false,
            message : "Interal server error"
        });
    }
})

//Post new practice slide
router.post('/postPractice', async(req,res) => {
    const slide = {
        slideId : req.body.slideId,
        type : req.body.type,
        content : req.body.content
    }

    try {
        await Practice.findOneAndUpdate({topicId : req.body.topicId, lessonId : req.body.lessonId}, {$push : {slides : slide}})
        res.json({
            success : true,
            message : "Created new slide"
        })
    } catch (error) {
        res.status(500).send({
            success : false,
            message : "Interal server error"
        });
    }
})

module.exports = router;