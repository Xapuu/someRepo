const mongoose = require('mongoose')

// Find better name for serviceType, for now true is for services that are calculated,
// from start to end point and false is for single purchase

// TODO fiugre out what to do with overdue services
const itemBluprint = new mongoose.Schema({
  price: {
    type: mongoose.SchemaTypes.Number,
    required: true,
    min: 0,
    default: 0
  },
  startUsage: {
    type: mongoose.SchemaTypes.Date,
    required: true
  },
  endUsage: {
    type: mongoose.SchemaTypes.Date,
    required: true
  },
  serviceType: {
    type: mongoose.SchemaTypes.Boolean
  }
})

const organisationSchema = new mongoose.Schema({
  owner: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
    ref: 'User'
  },
  name: {
    type: mongoose.SchemaTypes.String,
    required: true
  },
  balance: {
    type: mongoose.SchemaTypes.Number,
    required: true,
    default: 0
  },
  soldItemsCatalouge: {
    type: [],
    default: []
  },
  soldItems: {
    type: [],
    default: []
  }
})
module.exports = mongoose.model('Organisation', organisationSchema)
