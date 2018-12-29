
const UserSubModel = require('../model/UserSubModel')
const db = require('../db/pgdb.js')
const userSubModel = new UserSubModel({ db })


module.exports = {

  getAllSubs: async(req, res, next) => {
    const { user_line_id } = req.body

    const result = await userSubModel.getAllUserSubscriptions(user_line_id)
    return res.json({ subs: result, isSucceeded: true, msg: '' })
  },

  addPttSub: async (req, res, next) => {
    const {
      user_line_id,
      title,
      not_title,
      board,
      author,
      category,
      rate
    } = req.body

    const result = await userSubModel.addPttSubScription({
      user_line_id,
      title, not_title,
      board: board.toLowerCase(),
      author, category, rate
    })

    res.json({ result, isSucceeded: true, msg: '' })
  },

  deletePttSub: async (req, res, next) => {

    const { user_line_id, id } = req.body
    const result = await userSubModel.deletePttSubScription({
      user_line_id,
      id
    })
    if (!result) {
      return res.status(400).json({ isSucceeded: false, msg: '參數錯誤' })
    }
    res.json({ result: result, isSucceeded: true, msg: '成功刪除' })
    
  },
  editPttSub: async (req, res, next) => {

    const { user_line_id, id, update } = req.body
    const result = await userSubModel.editPttSubScription({
      user_line_id,
      id,
      update
    })
    if (!result) {
      return res.status(400).json({ isSucceeded: false, msg: '參數錯誤' })
    }
    res.json({ result: result, isSucceeded: true, msg: '成功修改' })

  },

}






