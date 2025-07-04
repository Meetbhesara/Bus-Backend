const CrudRepository  = require('./crudRepository');

const { Bus } = require('../models');
class BusRepository extends CrudRepository {
  constructor() {
    super(Bus);
  }

   async searchBuses({ source, destination, date }){
    const query={
        source:source.toLowerCase(),
        destination:destination.toLowerCase(), 
    }
    if(date){
        query.date = new Date(date);
    }
    return await this.model.find(query);
   };
}
module.exports = BusRepository;