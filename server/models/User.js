const mongoose = require('mongoose')
const encrypt = require('./../utils/crypto')

const appoinmentSchema = require('./commonSchemas/appointmentModel')

const userSchema = new mongoose.Schema({
  username: {
    type: mongoose.Schema.Types.String,
    required: true,
    unique: true
  },
  balance: {
    type: mongoose.SchemaTypes.Number,
    default: 0
  },
  appointments: {
    type: [appoinmentSchema],
    default: []
  },
  organisations: {
    type: [{ type: mongoose.Schema.ObjectId, ref: 'Organisation' }],
    default: []
  },
  salt: {
    type: mongoose.SchemaTypes.String,
    default: encrypt.generateSalt(),
    required: true
  },
  hashedPass: { type: mongoose.SchemaTypes.String, required: true }
})

userSchema.methods.authenticate = password =>
  this.hashedPass === encrypt.generateHashedPassword(this.salt, password)

userSchema.pre('save', function () {
  this.hashedPass = encrypt.generateHashedPassword(this.salt, this.hashedPass)
})

module.exports = mongoose.model('User', userSchema)
