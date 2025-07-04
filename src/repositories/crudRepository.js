const { StatusCodes } = require("http-status-codes");
const AppError  = require("../utils/errors/app-error");

class CrudRepository {
  constructor(model) {
    this.model = model;
  }

  // Create a new record
  async create(data) {
    return await this.model.create(data);
  }

  // Get all records (optional filter not used here)
  async getAll() {
    return await this.model.find();
  }

  // Get a record by primary key (e.g., id)
  async get(id) {
    const response=await this.model.findById(id);
    if(!response)
      throw new AppError('Record not found',StatusCodes.NOT_FOUND);
    return response;
  }

  // Update a record by id
  async update(id, data) {
    return await this.model.findByIdAndUpdate(id,data, {new:true});

  }

  // Delete a record by id
  async destroy(id) {
    const response= await this.model.findByIdAndDelete(id);
    if(!response)
      throw new AppError('Record not found',StatusCodes.NOT_FOUND); 
    return response;
}
};

module.exports = CrudRepository;
