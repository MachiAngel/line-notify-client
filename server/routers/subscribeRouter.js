const express = require('express')
// const Router = express.Router()

const router = require('express-promise-router')()

const SubController = require('../controller/subscribeController.js')
const AuthController = require('../controller/authController')
const { validateBodyOfUpdate, schemas } = require('./routeHelpers.js')

router.route('/')
  .post(AuthController.checkLineId, SubController.getAllSubs)

router.route('/ptt')
  .post(AuthController.checkLineId, SubController.addPttSub)
  .delete(AuthController.checkLineId, SubController.deletePttSub)
  .patch(validateBodyOfUpdate(schemas.pttEditSchema), AuthController.checkLineId, SubController.editPttSub)

module.exports = router