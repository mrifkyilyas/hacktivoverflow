const router = require('express').Router()
const {questionContr} = require('../controllers')
const auth = require('../middlewares/authenticate')


router.get('/',questionContr.list)
router.post('/',auth,questionContr.addQuestion)
router.get('/:id', questionContr.getOne);










module.exports = router