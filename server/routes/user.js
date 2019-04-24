const router = require('express').Router()
const {userContr} = require('../controllers')



router.post('/register',userContr.register)
router.post('/login',userContr.login)









module.exports = router