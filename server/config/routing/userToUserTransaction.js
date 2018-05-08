const express = require('express')

const controlers = require('./../../controlers/userTransactions/userToUser')

const router = express.Router()

router.post('/', controlers.userToUserTransaction)

module.exports = router
