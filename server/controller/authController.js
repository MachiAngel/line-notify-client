const db = require('../db/pgdb.js')
const UserModel = require('../model/UserModel')

const userModel = new UserModel({db})

module.exports = {

  checkLineId: async (req,res,next) => {
    const { user_line_id } = req.body
    
    if (!user_line_id) {
      return res.status(403).json({ isSucceeded: false, msg: 'Auth forbidden' })
    }
    const user = await userModel.findUserById(user_line_id)
    
    if (!user) { 
      return res.status(403).json({isSucceeded:false,msg:'auth forbin'})
    }
    next()
  }
}