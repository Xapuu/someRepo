const mongoose = require('mongoose')

const appointmentSchema = new mongoose.Schema({
  consumer: {
    type: mongoose.Schema.Types.ObjectId
  },
  serviceProvider: {
    type: mongoose.Schema.Types.ObjectId
  },
  serviceId: {
    type: mongoose.SchemaTypes.ObjectId
  },
  dateStamp: {
    type: mongoose.SchemaTypes.Date,
    default: Date.now
  }
})

module.exports = appointmentSchema
