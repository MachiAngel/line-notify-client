const Joi = require('joi')

module.exports = {
  validateBody: (schema) => {
    return (req, res, next) => {
      const result = Joi.validate(req.body, schema)
      if (result.error) {
        return res.status(400).json({ isSucceeded: false, msg: result.error.details[0].message})
      }
      if (!req.value) { req.value = {} }
      req.value['body'] = result.value
      next()
      //req.value.body  instead req.body
    }
  },
  validateBodyOfUpdate: (schema) => {
    return (req, res, next) => {
      const result = Joi.validate(req.body.update, schema)
      if (result.error) {
        return res.status(400).json({ isSucceeded: false, msg: result.error.details[0].message })
      }
      if (!req.value) { req.value = {} }
      req.value['body'] = result.value
      next()
      //req.value.body  instead req.body
    }
  },
  schemas: {
    pttEditSchema: Joi.object().keys({
      "user_line_id": Joi.string(),
      "author": Joi.string().allow([null, '']),
      "board": Joi.string(),
      "category": Joi.string().allow(''),
      "title": Joi.string().allow([null, '']),
      "not_title": Joi.string().allow([null,'']),
      "rate": Joi.number().integer().min(0).max(100),
      "sub_type": Joi.string().valid('ptt_articles').required()
    })
  }
}