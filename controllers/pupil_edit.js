const pupilInfo = require('../models/pupils.js');
const { StatusCodes } = require('http-status-codes');

const storeData = async (req, res) => {
    try {
        console.log('Received request:', req.method, req.url); // Log the request method and URL
        const receivedData = req.body;
        console.log('Received data:', receivedData); // Log the received data

        if (!receivedData || Object.keys(receivedData).length === 0) {
            console.log('No data provided.'); // Log that no data was provided
            return res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                message: 'No data provided.',
            });
        }

        const newDocument = new pupilInfo(receivedData);
        await newDocument.save();
        console.log('Data stored successfully:', newDocument); // Log the stored data

        return res.status(StatusCodes.CREATED).json({
            success: true,
            message: 'Data stored successfully.',
        });
    } catch (error) {
        console.error('Error storing data:', error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: 'Error storing data. Please try again later.',
        });
    }
};

module.exports = { storeData };
