const express = require('express')
const Router = express.Router()
const userController = require('../controller/userController.js')

Router.get('/auth', async (req, res, next) => { userController.getUserViaAuth(req, res, next) })
Router.get('/users/:userLineId', async (req, res) => { userController.getUser(req, res) })


module.exports = Router