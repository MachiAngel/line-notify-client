const express = require('express')
const Router = express.Router()
const lineLogin = require('../Line/lineLogin.js')

Router.get('/auth', lineLogin.callback(
  (req, res, next, token_response) => {
    // Success callback
    console.log('token_response')
    console.log(token_response)

    const idToken = token_response.id_token || {}
    const { sub: userLineId = '' } = idToken

    //userLineId 去server拿東西
    req.userLineId = userLineId

    console.log('成功解出id')
    console.log(req.userLineId)
    next()

  },
  (req, res, next, error) => {
    // Failure callback
    //直接送回
    // console.log(req)
    console.log(error)
    next()
    // res.status(400).json(error);
  }
))

module.exports = Router