
const { BusRepository }= require("../repositories");
const { StatusCodes } = require("http-status-codes");
const { Error } = require("../utils/common");
const { success } = require("../utils/common");
const generateSegments = require("../utils/common/generateSegment");
const AppError = require("../utils/errors/app-error");
const mongoose = require("mongoose");
const {Bus} = require("../models");
const { Seat }= require("../models");
 // Assuming you have a Bus model defined
const busRepository = new BusRepository();


async function createBus(busData) {
    try {
        const { route, totalSeats,departureTime,dateOfJourney } = busData;
        const parsedRoute = JSON.parse(route); //
        // parsedRoutes= parsedRoute.map(item => item.toLowerCase());
        const segments = generateSegments(parsedRoute, totalSeats,departureTime,dateOfJourney);
         busData.route = parsedRoute; // Store the parsed route
         busData.segments = segments; // Add segments to busData
        const bus = await busRepository.create(busData);
        const seats = [];
  for (let i = 1; i <= busData.totalSeats; i++) {
    seats.push({
      seatNumber: i,
      bus: bus._id,
      dateOfJourney:busData.dateOfJourney, // optional: add date if needed
      isBooked: false
    });
  }

  await Seat.insertMany(seats);
         // Ensure segments are included in the response
        success.data = bus;
        success.message = "Bus created successfully";
        return bus;
    } catch (error) {
        console.log(error);
    }
}
async function getAllBuses() {
    try{
        const buses = await busRepository.getAll();
        // buses.segments = buses.segments || [];// Ensure segments are included
        success.data = buses;
        success.message = "Buses retrieved successfully";
        return buses;
    }
    catch (error) {
         error.message = "Error retrieving buses";
         throw new AppError(error.message, StatusCodes.INTERNAL_SERVER_ERROR);
    }

    
}

async function search({from,to, dateOfJourney})
{ 
    try{
     
       const buses = await Bus.find({
         segments: {
    $all: [
      { $elemMatch: { from: from } },
      { $elemMatch: { to:  to } },
      { $elemMatch :{date:dateOfJourney} }
    ]
  }   
});
        success.data = buses;
        success.message = "Buses retrieved successfully";
        return buses;
    }
    catch(error)
    {
        return res.status(StatusCodes.BAD_REQUEST).json(Error);
    }

}



module.exports = {
    createBus,
    getAllBuses,
    search
    // getBusById,
    // updateBus,
    // deleteBus,
    // bookSeats
};
