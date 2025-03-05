const pupilInfo = require('../models/pupils.js');
const { StatusCodes } = require('http-status-codes');

const storeListData = async (req, res) => {
    try {
        console.log('Received request:', req.method, req.url); // Log the request method and URL
        const receivedDataList = req.body;
        console.log('Received data list:', receivedDataList); // Log the received data list

        // Check if receivedDataList is not empty
        if (!receivedDataList || Object.keys(receivedDataList).length === 0) {
            console.log('No data provided in the list.'); // Log that no data was provided
            return res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                message: 'No data provided in the list.',
            });
        }

        // Convert the indexed object to an array of datasets
        const datasets = Object.values(receivedDataList);
        console.log('Extracted datasets:', datasets); // Log the extracted datasets

        // Save each dataset separately
        const promises = datasets.map((dataset) => {
            const newDocument = new pupilInfo(dataset);
            return newDocument.save();
        });

        await Promise.all(promises);
        console.log('All datasets stored successfully.'); // Log success message

        return res.status(StatusCodes.CREATED).json({
            success: true,
            message: 'All datasets stored successfully.',
        });
    } catch (error) {
        console.error('Error storing list data:', error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: 'Error storing list data. Please try again later.',
        });
    }
};

module.exports = { storeListData };