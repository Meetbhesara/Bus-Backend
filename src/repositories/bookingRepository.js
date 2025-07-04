const CrudRepository  = require('./crudRepository');

const { Bus } = require('../models');
const { Booking } = require('../models');
class BookingRepository extends CrudRepository {
  constructor() {
    super(Booking);
  }
}
module.exports = BookingRepository;