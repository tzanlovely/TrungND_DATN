require('dotenv').config()
const express = require('express');
const app = express();
const path= require('path')
const mongoose = require('mongoose');
const auth = require('./routes/auth')
const postLesson = require('./routes/postLesson')
const postTopic = require('./routes/postTopic')
const getLearnPage = require('./routes/getLearnPage')
const cors = require('cors');
const dailyUpdate = require('./routes/getLearnProcess')
const getLearnProcess = require('./routes/getLearnProcess')
const postSlide = require('./routes/postSlide')
const postExTopic = require('./routes/exercise/postExTopic')
const postExLesson = require('./routes/exercise/postExLesson')
const postExSlide = require('./routes/exercise/postExSlide')
const getExercisePage = require('./routes/exercise/getExercisePage')

const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@datn.xlhlv.mongodb.net/datn?retryWrites=true&w=majority`,{
            useCreateIndex : true,
            useNewUrlParser : true,
            useUnifiedTopology: true,
            useFindAndModify: false
    })
    console.log('Connected to Mongodb')
    } catch (error){
        console.log(error.message)
        process.exit(1)
    }
};
connectDB()

app.use(express.static('uploads'));
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname,'public')))

dailyUpdate;
app.get('/', (req, res) =>{
    res.send('Welcome');
})

//Routes Middlewares
app.use('/api/auth', auth);
app.use('/api/auth', getLearnPage);
app.use('/api/auth', getLearnProcess);
app.use('/api/auth', getExercisePage);
app.use('/', postTopic);
app.use('/', postLesson);
app.use('/', postSlide);
app.use('/', postExTopic);
app.use('/', postExLesson);
app.use('/', postExSlide)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`
))