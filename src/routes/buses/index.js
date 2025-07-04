const  express = require('express');
const router = express.Router();
const { busController } = require('../../controllers');
const busMiddleware = require('../../middlewares/busMiddleware');
  

router.post('/',busController.createBus);
router.get('/search',busController.search);

//router.get('/seat',seatController.getSeatsForBus);
module.exports = router;