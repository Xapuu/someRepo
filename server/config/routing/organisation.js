const express = require('express')

const controlers = require('./../../controlers/organisation')

const router = express.Router()

router.post('/', controlers.createOrganisation)

router.get('/', controlers.retrieveOrganisations)

//
// Worker inivitation
//

// Should return index + confirmation
router.post('/invitation', controlers.createInvitation)

router.get('/confirm', controlers.acceptInvitation)

router.get('/employee', controlers.getEmployee)

router.delete('/employee', controlers.deleteEmployee)

// this will be automiezed with a timer
// router.delete('/invitation')

//
// BlueprintsComplete
//

router.post('/blueprint', controlers.createBlueprint)

router.delete('/blueprint', controlers.delteBlueprint)

router.put('/blueprint', controlers.updateBlueprint)

router.get('/blueprint', controlers.retrieveBlueprints)

//
// create static tab
//

router.post('/account', controlers.createStaticAccount)

router.delete('/account', controlers.deleteStaticAccount)

module.exports = router
