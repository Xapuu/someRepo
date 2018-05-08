const express = require('express')

const controlers = require('./../../controlers/profile')

const router = express.Router()

router.get('/', controlers.getProfile)

module.exports = router
