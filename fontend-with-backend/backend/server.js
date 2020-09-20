//nodemon server.js => for run this code
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

//Mongodb connection
mongoose.connect('mongodb://localhost:27017/todo_Application',{ useNewUrlParser: true })
    .then( () => {
        console.log('MongoDb connection established successfully');
    })
    .catch(err => {
        console.log(err)
    })


const exerciseRouter = require('./routes/exercise');
const userRouter = require('./routes/user');

app.use('/exercise', exerciseRouter);
app.use('/user', userRouter);

app.listen(port, ()=> {
    console.log(`Server is running on port ${port}`);
})