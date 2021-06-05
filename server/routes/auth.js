require('dotenv').config();
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const LearnProcess = require('../models/learnProcess')
const bcrypt = require('bcryptjs');
const verifyToken = require('../middlewares/verifyToken')

//Check if user is logged in
router.get('/', verifyToken, async(req, res) => {
    try {
        const user = await User.findById(req.userId).select('-password');
        if (!user) return res.status(400).json({success: false, message: 'User not found'})
        res.json({success: true, user})
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success : false,
            message : "Internal server error"
        });
    }
})

//Login
router.post('/login', async(req, res) => {
    //Validate data
    //Check syntax 
    console.log(req.body.username);
    console.log(req.body.password);

    if (!req.body.username || !req.body.password){
        return res.status(400).send({
            success: false,
            message: "Missing username or password"
        })
    }

    try {

        //Check if username exist
        const usernameExist = await User.findOne({username : req.body.username});
        if (!usernameExist){
            return res.status(400).send({
                success: false,
                message : "Incorrect username or password"
            })
        };

        //Check password
        const passwordCorrect = await bcrypt.compare(req.body.password, usernameExist.password);
        if (!passwordCorrect){
            return res.status(400).send({
                success: false,
                message : "Incorrect username or password"
            })
        };

        //Create and assign token
        const accessToken = jwt.sign(
			{ userId: usernameExist._id },
			process.env.ACCESS_TOKEN_SECRET
		)
		res.json({
			success: true,
			message: 'User logged in successfully',
			accessToken
        })
    } catch(error){
        res.status(500).send({
            success : false,
            message : "Internal server error"
        });
    };

})

//Register
router.post('/register', async(req,res) => {
    //Validate data
    //Check syntax 
    if (!req.body.username || !req.body.password || !req.body.email)
        return res.status(400)
            .json({success: false, message: "Missing something"});
    

    try {
        //Check for existing user
        const usernameExist = await User.findOne({username : req.body.username});
        if (usernameExist)
            return res.status(400).json({success: false, message: "Username already exist"});
        
        //Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        //Create new user
        const newUser = new User({
            username : req.body.username,
            password : hashedPassword,
            email : req.body.email
        });

        await newUser.save();

        //Create user learn process
        const newProcess = new LearnProcess({
            username : req.body.username
        });

        await newProcess.save();

        const accessToken = jwt.sign(
			{ userId: newUser._id },
			process.env.ACCESS_TOKEN_SECRET
		)

		res.json({
			success: true,
			message: 'User created successfully',
			accessToken
		})
    } catch(error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
})

module.exports = router;