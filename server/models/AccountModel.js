const mongoose = require('mongoose')

const paymentBluePrintSchema = new mongoose.Schema({
  name: {
    type: String
  },
  price: {
    type: mongoose.SchemaTypes.Number,
    required: true
  },
  payedBy: {
    type: mongoose.SchemaTypes.ObjectId
  }
})

const accountSchema = new mongoose.Schema({
  payer: {
    type: mongoose.Schema.Types.ObjectId
  },
  reciever: {
    type: mongoose.Schema.Types.ObjectId
  },
  balance: {
    type: mongoose.SchemaTypes.Number,
    default: 0
  },
  limit: {
    type: mongoose.SchemaTypes.Number
  },
  account: {
    type: mongoose.SchemaTypes.ObjectId,
    default: mongoose.Types.ObjectId()
  },
  items: {
    type: [paymentBluePrintSchema]
  },
  isActive: {
    type: mongoose.SchemaTypes.Boolean
  }
})

module.exports = mongoose.model('Account', userSchema)
