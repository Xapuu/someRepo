const User = require('mongoose').model('User')
const Organisation = require('mongoose').model('Organisation')
const tokenConfig = require('./../../config/token.config')
const jwt = require('jwt-simple')
const ObjectId = require('mongodb').ObjectId

const createInvitation = (req, res) => {
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

    organisation.pendingInvitations.push({
      organisationId: organisation.id
    })
    organisation.save()
    res.status(200).json({ message: 'Invitation send' }).end()
  })

  // TODO send mail logic
}

const acceptInvitation = (req, res) => {
  const token = req.headers.authorization
  const data = req.query
  const currentuserId = jwt.decode(
    token.replace('jwt ', ''),
    tokenConfig.jwtSecret
  )

  console.log(data)

  Organisation.findById(data.organisationId, (err, organisation) => {
    if (err) {
      res.status(404).send(err.message).end()
      return
    }

    console.log(data.key)
    // TODO improve  validation logic

    User.findById(currentuserId, (err, user) => {
      if (err) {
        res.status(404).send(err.message).end()
        return
      }

      organisation.workers.push(currentuserId)

      // TODO fix key removeval pull is buggy
      organisation.pendingInvitations.pull({
        key: ObjectId(data.key),
        organisationId: data.organisationId
      })

      //   user.workPlace.push(organisation.id)

      user.workPlace.push(organisation.id)
      user.save()
      organisation.save()
      res.status(200).json({ message: 'Invitation accpeted' }).end()
    })
  })
}

const getEmployee = (req, res) => {
  const token = req.headers.authorization
  const data = req.query
  const currentuserId = jwt.decode(
    token.replace('jwt ', ''),
    tokenConfig.jwtSecret
  )

  if (!data.organisationId) {
    res.status(404).send({ message: 'Required organisation id' }).end()
    return
  }

  Organisation.findById(data.organisationId)
    .populate('workers')
    .then(organisation => {
      const idCheck = organisation.owner.toString() !== currentuserId.toString()
      if (idCheck) {
        res.status(401).json({ message: 'Invalid credentials' }).end()
        return
      }

      let searchedEmloyee = organisation.workers.find(
        x => x.id.toString() === data.employeeId
      )

      if (searchedEmloyee) {
        res.status(200).json({ searchedEmloyee }).end()
        return
      }

      res.status(200).json(organisation.workers).end()
    })
    .catch(err => {
      res.status(404).send(err.message).end()
    })
}

const deleteEmployee = (req, res) => {
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

      organisation.workers = organisation.workers.filter(
        x => x === data.employeeId
      )
      organisation.save()
      User.findById(data.employeeId, (err, user) => {
        if (err) {
          res.status(404).send(err.message).end()
          return
        }
        user.workPlace = user.workPlace.filter(x => x === organisation.id)
        user.save()
        res.status(200).json({ message: 'Success delete' }).end()
      })
    })
    .catch(err => {
      res.status(404).send(err.message).end()
    })
}

module.exports = {
  createInvitation,
  acceptInvitation,
  getEmployee,
  deleteEmployee
}
