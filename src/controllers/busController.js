const { route } = require("../routes");
const { BusService } = require("../services");
const mongoose = require("mongoose");
const { Error } = require("../utils/common");
const { success } = require("../utils/common");
 const AppError = require("../utils/errors/app-error");
const { StatusCodes } = require("http-status-codes");
const { Bus } = require("../models");


async function createBus(req,res){
    try{
       const busdata=req.body;
        const newbusdata=await BusService.createBus(busdata);
        //  console.log(success);
        success.data = newbusdata;
        success.message = 'Bus created successfully';
         return res.status(StatusCodes.CREATED).json(success);
    }
    catch(error)
    {
        console.error(error);
    Error.error = error;
    return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json(Error);
    }
}

async function getAllBuses(req, res) {
   
    try {
        const buses = await BusService.getAllBuses();
        success.data= buses;
        success.message = 'Buses retrieved successfully';
        return res.status(StatusCodes.OK).json(success);
    } catch (error) {
        Error.error = error;
        return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json(Error);
    }
}   

async function search(req,res) {
  try
  {
    const from = req.body.from.trim();
const to = req.body.to.trim();
const dateOfJourney = req.body.dateOfJourney.trim(); // '2025-02-13'
console.log("Searching for", { from, to, dateOfJourney });

     if (!from || !to || !dateOfJourney) {
      return res.status(400).json({ 
        error: 'Source, destination, and dateOfJourney are required' 
      });
    }
    console.log(from,to,dateOfJourney);
    const buses = await BusService.search({from,to,dateOfJourney});
     
    success.data=buses;
    success.message="successfyllu Retrived Buses"
    return res.status(StatusCodes.OK).json(success);
  }
  catch (error) {
        Error.error = error;
        return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json(Error);
   // Find buses with matching segments
}
}
// async function getBusById(req, res) {
//     try {
//         const bus = await BusService.getBusById(req.body);
//         success.data = bus;

//         success.message = 'Bus retrieved successfully';
//         return res.status(StatusCodes.OK).json(success);
//     } catch (error) {
//         Error.error = error;
//         return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json(Error);
//     }
// }

// async function updateBus(req, res) {
//     try {
//         const updatedBus = await BusService.updateBus(req.params.id, req.body);
//         success.data = updatedBus;
//         success.message = 'Bus updated successfully';
//         return res.status(StatusCodes.OK).json(success);
//     } catch (error) {
//         Error.error = error;
//         return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json(Error);
//     }
// }
// async function deleteBus(req, res) {
//     try {
//         const deletedBus = await BusService.deleteBus(req.params.id);
//         success.data = deletedBus;
//         success.message = 'Bus deleted successfully';
//         return res.status(StatusCodes.OK).json(success);
//     } catch (error) {
//         Error.error = error;
//         return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json(Error);
//     }
// }


// const searchBusesBySegments = async (req, res) => {
//  try {
//     const { from,to,dateOfJourney } = req.query;

//     if (!source || !destination || !date) {
//       return res.status(400).json({ success: false, message: 'source, destination, and date are required' });
//     }

//     const bookingDate = new Date(date);
//     if (isNaN(bookingDate.getTime())) {
//       return res.status(400).json({ success: false, message: 'Invalid date format' });
//     }

//     const startOfDay = new Date(bookingDate.setHours(0, 0, 0, 0));
//     const endOfDay = new Date(bookingDate.setHours(23, 59, 59, 999));

//     const buses = await Bus.find({
//       date: { $gte: startOfDay, $lte: endOfDay }
//     });

//     const matchedBuses = buses.filter(bus => {
//       const fromIndex = bus.route.findIndex(city => city.toLowerCase() === source.toLowerCase());
//       const toIndex = bus.route.findIndex(city => city.toLowerCase() === destination.toLowerCase());
      
//       console.log(fromIndex,toIndex);
//       // Only allow routes where both cities are in the middle (via), and ordered
//       if (
//         fromIndex >= 0 &&
//         toIndex >= 0 &&
//         toIndex <= bus.route.length - 1 &&
//         fromIndex < toIndex
//       ) {
//         console.log("yes");
//         return true;
//       }
//        console.log("No");
//       return false;
//     });
//     console.log(matchedBuses);
//     success.data=matchedBuses;

//     return res.status(200).json(success);

//   } catch (error) {
//     console.error('Via Search Error:', error);
//     res.status(500).json({ success: false, message: 'Internal Server Error' });
//   }
// };

module.exports = {
    createBus,
    getAllBuses,
    search
    // getBusById,
    // updateBus,
    // deleteBus,
    // searchBusesBySegments
};