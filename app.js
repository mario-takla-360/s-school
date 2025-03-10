require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();
//const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

//Connect to MongoDB
const connectDB = require('./db/connect');

//Routers
const pupilRouter = require('./routes/pupilRoute');
const pupilListRouter = require('./routes/pupilListRoute');
const fetchRouter = require('./routes/fetchRoute');
const pOverwriteRouter = require('./routes/pOverwriteRoute');

//Middleware
app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // Parse incoming request bodies
app.use(express.json());
app.use(express.static('./public')); //Serve static files from the "public" folder

//Routes
app.use('/api/v1/pupilInfo', pupilRouter);
app.use('/api/v2/pupilListInfo', pupilListRouter);
app.use('/api/v1/fetch', fetchRouter);
app.use('/api/v3/pupilListInfo', pOverwriteRouter);

//Error Handler
//const errorHandlerMiddleware = require('./middleware/error-handler');

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
