const bodyParser = require('body-parser')
const authC = require('./passprot')
const cors = require('cors')

module.exports = app => {
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(cors())
  app.use(authC.initialize())
}
