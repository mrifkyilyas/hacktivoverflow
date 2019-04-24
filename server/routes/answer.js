const router = require('express').Router()
const {answerContr} = require('../controllers')
const auth = require('../middlewares/authenticate')



router.post('/',auth,answerContr.post)











module.exports = router