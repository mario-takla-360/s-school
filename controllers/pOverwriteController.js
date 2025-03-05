const pupilInfo = require('../models/pupils.js');
const { StatusCodes } = require('http-status-codes');

const storeListData = async (req, res) => {
    try {
        console.log('Received request:', req.method, req.url);
        const receivedDataList = req.body;
        console.log('Received data list:', receivedDataList);

        if (!receivedDataList || Object.keys(receivedDataList).length === 0) {
            console.log('No data provided in the list.');
            return res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                message: 'No data provided in the list.',
            });
        }

        // Convert the indexed object to an array of datasets
        const datasets = Object.values(receivedDataList);
        console.log('Extracted datasets:', datasets);

        // Process each dataset separately
        const promises = datasets.map(async (dataset) => {
            // Check if a document with the same student_id exists
            const existingDoc = await pupilInfo.findOne({ student_id: dataset.student_id }).exec();

            if (existingDoc) {
                // Document exists, update it without upsert
                console.log(`Updating existing document with student_id: ${dataset.student_id}`);
                return pupilInfo.findOneAndUpdate(
                    { student_id: dataset.student_id },
                    dataset,
                    { new: true } // Return the updated document
                ).exec();
            } else {
                // Document does not exist, create a new one
                console.log(`Creating new document with student_id: ${dataset.student_id}`);
                const newDocument = new pupilInfo(dataset);
                return newDocument.save();
            }
        });

        await Promise.all(promises);
        console.log('All datasets stored or updated successfully.');

        return res.status(StatusCodes.CREATED).json({
            success: true,
            message: 'All datasets stored or updated successfully.',
        });
    } catch (error) {
        console.error('Error storing or updating list data:', error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: 'Error storing or updating list data. Please try again later.',
        });
    }
};

module.exports = { storeListData };
