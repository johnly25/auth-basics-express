const express = require('express')
const router = express.Router()
const controller = require('../controllers/controller')

  
router.get("/sign-up", controller.signUpGET)
router.post("/sign-up", controller.signUpPOST)  
module.exports = router;