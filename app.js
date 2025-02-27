require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();
const path = require('path');

//Connect to MongoDB
const connectDB = require('./db/connect');

//Routers

//Middleware
app.use(express.json());
app.use(express.static('./public')); //Serve static files from the "public" folder

//Routes

//Error Handler

const port = process.env.PORT || 3000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, () =>
            console.log(`Server is listening on port ${port}... `)
        );
    } catch (error) {
        console.error(error);
    }
};

start();
