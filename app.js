require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();
const path = require('path');

//Connect to MongoDB
const connectDB = require('./db/connect');

//Routers
const pupilRouter = require('./routes/pupilRoute');

//Middleware
app.use(express.json());
app.use(express.static('./public')); //Serve static files from the "public" folder

//Routes
app.use('/api/v1/pupilInfo', pupilRouter);

//Error Handler
const errorHandlerMiddleware = require('./middleware/error-handler');

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
