const pupilInfo = require('../models/pupils.js');
const { StatusCodes } = require('http-status-codes');

const storeData = async (req, res) => {
    try {
        const receivedData = req.body;

        if (!receivedData || Object.keys(receivedData).length === 0) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                message: 'No data provided.',
            });
        }

        const newDocument = new pupilInfo({ data: receivedData });
        await newDocument.save();

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
