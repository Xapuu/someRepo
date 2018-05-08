const User = require('mongoose').model('User')
const tokenConfig = require('./../../config/token.config')

var jwt = require('jwt-simple')

const userToUserTransaction = (req, res) => {
  const token = req.headers.authorization
  const data = req.body
  const currentuserId = jwt.decode(
    token.replace('jwt ', ''),
    tokenConfig.jwtSecret
  )

  User.findById(currentuserId)
    .then(currentUser => {
      User.findById(data.recieverId)
        .then(reciever => {
          // TODO validate so that there are only positeve tabs
          const ammount = data.ammount

          if (currentUser.balance - ammount < 0) {
            res.status(200).json({ message: 'Inssuficient funds' }).end()
            return
          }

          let paymentSchema = {
            payer: currentUser.id,
            reciever: reciever.id,
            ammount: ammount,
            comment: data.comment ? data.comment : ''
          }

          currentUser.balance = currentUser.balance - ammount
          currentUser.expenditure.push(paymentSchema)
          reciever.expenditure.push(paymentSchema)

          reciever.balance = reciever.balance + ammount

          currentUser
            .save()
            .then(() => {
              reciever.save().then(() => {
                res.status(200).json({ message: 'Payment success' }).end()
              })
            })
            .catch(err => {
              res.status(404).json({ message: err }).end()
            })
        })
        .catch(err => {
          res.status(404).json({ message: err }).end()
        })
    })
    .catch(err => {
      res.status(404).json({ message: err })
    })
}

module.exports = {
  userToUserTransaction
}
