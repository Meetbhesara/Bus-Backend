const { StatusCodes } = require('http-status-codes');
const { Error , success } = require('../utils/common');    
const AppError = require('../utils/errors/app-error');

function validate(req, res, next) {
    {
        // Check if the request body contains the required fields
        const { busNumber, source, destination, date, departureTime, arrivalTime, totalSeats, availableSeats, price } = req.body;
       
        console.log(req.body);
        if (!busNumber || !source || !destination || !date || !departureTime || !arrivalTime || !totalSeats || !availableSeats || !price) {
            
            return new AppError('All fields are required', StatusCodes.BAD_REQUEST);
        }

        // Check if totalSeats is greater than availableSeats
        if (totalSeats < availableSeats) {
            return new AppError('Total seats cannot be less than available seats', StatusCodes.BAD_REQUEST);
        }

        console.log('Validation passed');
        next(); 

    }
}
module.exports = {
    validate,
    // You can add more middlewares here if needed
};