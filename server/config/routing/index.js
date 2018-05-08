const express = require('express')
const authStrategy = require('./../passprot')
const auth = require('./authenticaition')
const org = require('./organisation')
const profile = require('./userProfile')
const userToUser = require('./userToUserTransaction')
const userToOrganisation = require('./userToOrganisation')

module.exports = app => {
  app.use(express.static('public'))
  app.get('/', (req, res) => {
    res.status(200).send({ message: 'all is good' })
  })

  // TODO protect smart
  app.use('/auth', auth)
  app.use('/profile', authStrategy.authenticate(), profile)
  app.use('/organisation', authStrategy.authenticate(), org)
  app.use('/payment', authStrategy.authenticate(), userToUser)
  app.use('/purchase', authStrategy.authenticate(), userToOrganisation)

  app.all('*', (req, res) => {
    res.status(404)
    res.send('404 Not Found')
    res.end()
  })
}
