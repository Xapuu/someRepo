const User = require('mongoose').model('User')
const Organisation = require('mongoose').model('Organisation')
const tokenConfig = require('./../../config/token.config')
const jwt = require('jwt-simple')
const ObjectId = require('mongodb').ObjectId

const createBlueprint = (req, res) => {
  const token = req.headers.authorization
  const data = req.body

  const currentuserId = jwt.decode(
    token.replace('jwt ', ''),
    tokenConfig.jwtSecret
  )

  Organisation.findById(data.organisationId, (err, organisation) => {
    if (err) {
      res.status(404).json({ message: err }).end()
      return
    }
    const idCheck = organisation.owner.toString() !== currentuserId.toString()
    if (idCheck) {
      res.status(401).json({ message: 'Invalid credentials' }).end()
      return
    }
    const bluePrint = {
      name: data.bluePrintName,
      price: data.bluePrintPrice
    }
    organisation.soldItemsBlueprint.push(bluePrint)
    organisation.save()

    res.status(200).json({ message: 'Blueprint added' }).end()
  })
}

const delteBlueprint = (req, res) => {
  const token = req.headers.authorization
  const data = req.body

  const currentuserId = jwt.decode(
    token.replace('jwt ', ''),
    tokenConfig.jwtSecret
  )

  Organisation.findById(data.organisationId)
    .then(organisation => {
      const idCheck = organisation.owner.toString() !== currentuserId.toString()
      if (idCheck) {
        res.status(401).json({ message: 'Invalid credentials' }).end()
        return
      }

      organisation.soldItemsBlueprint.pull({ _id: data.bluePrintId })
      organisation.save()

      res.status(200).json({ message: 'Blueprint delete' }).end()
    })
    .catch(err => {
      res.status(404).json({ message: err }).end()
    })
}

const updateBlueprint = (req, res) => {
  const token = req.headers.authorization
  const data = req.body

  const currentuserId = jwt.decode(
    token.replace('jwt ', ''),
    tokenConfig.jwtSecret
  )

  Organisation.findById(data.organisationId)
    .then(organisation => {
      const idCheck = organisation.owner.toString() !== currentuserId.toString()
      if (idCheck) {
        res.status(401).json({ message: 'Invalid credentials' }).end()
        return
      }

      const bluePrint = {
        name: data.bluePrintName,
        price: data.bluePrintPrice
      }

      organisation.soldItemsBlueprint.pull({ _id: data.bluePrintId })
      organisation.soldItemsBlueprint.push(bluePrint)

      organisation.save()

      res.status(200).json({ message: 'Blueprint update' }).end()
    })
    .catch(err => {
      res.status(404).json({ message: err }).end()
    })
}

const retrieveBlueprints = (req, res) => {
  const token = req.headers.authorization
  const data = req.query
  const currentuserId = jwt.decode(
    token.replace('jwt ', ''),
    tokenConfig.jwtSecret
  )
  Organisation.findById(data.organisationId)
    .then(org => {
      let responsePayload = data.blueprintId
        ? org.soldItemsBlueprint.find(x => x.id === data.blueprintId)
        : org.soldItemsBlueprint

      res.status(200).json(responsePayload).end()
    })
    .catch(err => {
      res.status(404).send(err.message).end()
    })
}

module.exports = {
  createBlueprint,
  delteBlueprint,
  updateBlueprint,
  retrieveBlueprints
}
