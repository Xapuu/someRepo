const User = require('mongoose').model('User')
const Organisation = require('mongoose').model('Organisation')
const tokenConfig = require('./../../config/token.config')
const ObjectId = require('mongodb').ObjectId

var jwt = require('jwt-simple')

const userToOrganisationOpenAccount = (req, res) => {
  const token = req.headers.authorization
  const data = req.body
  const currentuserId = jwt.decode(
    token.replace('jwt ', ''),
    tokenConfig.jwtSecret
  )

  Organisation.findById(data.userOrganisationId)
    .then(organisation => {
      let target = organisation.staticAccounts
        .map(x => x.id)
        .indexOf(data.staticAccountId)

      let connectId = ObjectId()

      organisation.staticAccounts[target].status = true
      organisation.staticAccounts[target].connectId = connectId

      const accountSchema = {
        payer: currentuserId,
        reciever: organisation.owner,
        connectId: connectId
      }
      organisation.income.push(accountSchema)
      organisation
        .save()
        .then(updatedOrganisation => {
          res.status(200).json(updatedOrganisation).end()
        })
        .catch(err => {
          res.status(404).json({ message: 'Message invalid save' }).end()
        })
    })
    .catch(err => {
      res.status(404).json({ message: 'Invalid organisation id' }).end()
    })
}

const userToOrganisationCloseAccount = (req, res) => {
  const token = req.headers.authorization
  const data = req.body
  const currentuserId = jwt.decode(
    token.replace('jwt ', ''),
    tokenConfig.jwtSecret
  )
  Organisation.findOne({ _id: data.userOrganisationId })
    .then(organisation => {
      let targetStaticAccountIndex = organisation.staticAccounts
        .map(x => x.id)
        .indexOf(data.staticAccountId)
      let connectId =
        organisation.staticAccounts[targetStaticAccountIndex].connectId
      organisation.staticAccounts[targetStaticAccountIndex].status = false
      organisation.staticAccounts[
        targetStaticAccountIndex
      ].connectId = ObjectId()

      let targetOrganisationIndex = organisation.income
        .map(x => x.connectId.toString())
        .indexOf(connectId.toString())

      const activeTab = organisation.income[targetOrganisationIndex]

      console.log(organisation.balance)
      console.log(activeTab.total)

      organisation.balance =
        Number(organisation.balance) + Number(activeTab.total)

      organisation
        .save()
        .then(save => {
          res.status(200).json({ message: 'Payment complete' })
        })
        .catch(err => {
          console.log(err)
          res.status(404).json({ message: 'Invalid save' }).end()
        })
    })
    .catch(err => {
      console.log(err)
      res.status(404).json({ message: 'Invalid organisation id' }).end()
    })
}

const userToOrganisationAddItemToAccount = (req, res) => {
  const token = req.headers.authorization
  const data = req.body
  const currentuserId = jwt.decode(
    token.replace('jwt ', ''),
    tokenConfig.jwtSecret
  )
  Organisation.findOne({ _id: data.userOrganisationId })
    .then(organisation => {
      let targetStaticAccountIndex = organisation.staticAccounts
        .map(x => x.id)
        .indexOf(data.staticAccountId)

      let connectId = organisation.staticAccounts[
        targetStaticAccountIndex
      ].connectId.toString()

      console.log(data)

      let kur = organisation.income.map(x => x.connectId).indexOf(x => {
        return x.toString() == connectId.toString()
      })

      //   console.log('___________-')
      //   console.log(targetOrganisationIncomeIndex)

      let desiredBlue = organisation.soldItemsBlueprint.find(
        x => x._id.toString() === data.blueprintId.toString()
      )

      //   console.log(desiredBlue)

      //   console.log(organisation.income)
      //  organisation.income[targetOrganisationIndex].itemsOnTab.push()
    })
    .catch(err => {
      console.log(err)
      res.status(404).json({ message: 'Invalid organisation id' }).end()
    })
}

module.exports = {
  userToOrganisationOpenAccount,
  userToOrganisationCloseAccount,
  userToOrganisationAddItemToAccount
}
