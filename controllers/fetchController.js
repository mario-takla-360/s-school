const pupilInfo = require('../models/pupils.js');
const { StatusCodes } = require('http-status-codes');

const fetchByProperties = async (req, res) => {
    try {
        const { student_id, grade, language } = req.body;

        console.log('Received query parameters:', { student_id, grade, language }); // Log the received query parameters

        // Validate the required query parameters
        if (!student_id || !grade || !language) {
            console.log('Missing required query parameters.'); // Log missing parameters
            return res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                message: 'Missing required query parameters: student_id, grade, and language are required.',
            });
        }

        // Build the query object
        const query = {
            student_id: student_id,
            grade: grade,
            language: language
        };

        const matchingDatasets = await pupilInfo.find(query);

        console.log('Matching datasets found:', matchingDatasets); // Log the matching datasets

        return res.status(StatusCodes.OK).json({
            success: true,
            data: matchingDatasets,
        });
    } catch (error) {
        console.error('Error fetching data:', error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: 'Error fetching data. Please try again later.',
        });
    }
};

module.exports = { fetchByProperties };
