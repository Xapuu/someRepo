const User = require('mongoose').model('User')
const Organisation = require('mongoose').model('Organisation')
const tokenConfig = require('./../../config/token.config')
const jwt = require('jwt-simple')
const ObjectId = require('mongodb').ObjectId

const createStaticAccount = (req, res) => {
  const token = req.headers.authorization
  const data = req.body
  const currentuserId = jwt.decode(
    token.replace('jwt ', ''),
    tokenConfig.jwtSecret
  )

  Organisation.findById(data.organsiationId, (err, organisation) => {
    if (err) {
      res.status(404).send(err.message).end()
      return
    }

    if (!organisation) {
      res.status(404).send({ message: 'No such organisation' }).end()
      return
    }

    const idCheck = organisation.owner.toString() !== currentuserId.toString()
    if (idCheck) {
      res.status(401).json({ message: 'Invalid credentials' }).end()
      return
    }

    organisation.staticAccounts.push({
      name: data.staticAccountName
    })
    organisation.save()
    res.status(200).json({ message: 'Static account create' }).end()
  })
}

const deleteStaticAccount = (req, res) => {
  const token = req.headers.authorization
  const data = req.body
  const currentuserId = jwt.decode(
    token.replace('jwt ', ''),
    tokenConfig.jwtSecret
  )

  Organisation.findById(data.organsiationId, (err, organisation) => {
    if (err) {
      res.status(404).send(err.message).end()
      return
    }

    if (!organisation) {
      res.status(404).send({ message: 'No such organisation' }).end()
      return
    }

    if (!data.staticAccountId) {
      res
        .status(404)
        .send({ message: 'Please provide static account Id' })
        .end()
      return
    }

    const idCheck = organisation.owner.toString() !== currentuserId.toString()
    if (idCheck) {
      res.status(401).json({ message: 'Invalid credentials' }).end()
      return
    }

    organisation.staticAccounts.pull({
      _id: data.staticAccountId
    })
    organisation.save()
    res.status(200).json({ message: 'Static account deleted' }).end()
  })
}

module.exports = {
  createStaticAccount,
  deleteStaticAccount
}
