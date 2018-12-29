const pgdb = require('../db/pgdb.js')
const { USERS_TABLE_STRING } = require('../constants/tableSchema')



//資料庫沒東西 驗證過也是有問題
const getUserViaAuth = async (req, res, next) => {

  const { userLineId } = req

  if (!userLineId) {
    res.status(400).json({ user:null, success: false, msg: '參數錯誤' })
    return
  }

  //拿db資料回傳
  try {
    const user = await pgdb(USERS_TABLE_STRING).where({
      'line_userId': userLineId
    }).select('*')

    if (!user.length) {
      //找不到user
      return res.status(400).json({ user: null, success: false, msg: 'cant not found user' })
    }
    
    res.json({ user: fomatUserPorperty(user[0]), success: true, msg: '' })
  } catch (e) {
    console.log(e.message)
    res.status(500).json({ user: null, success: false, msg: 'server error' })
  }
  
}

const getUser = async (req, res) => {

  const { userLineId } = req.params 

  if (!userLineId) {
    res.status(400).json({ user: null, success: false, msg: '參數錯誤' })
    return
  }

  //拿db資料回傳
  try {
    const user = await pgdb(USERS_TABLE_STRING).where({
      'line_userId': userLineId
    }).select('*')
    
    if (!user.length) {
      //找不到user
      return res.status(400).json({ user: null, success: false, msg: 'cant not found user' })
    }
    res.json({ user: fomatUserPorperty(user[0]), success: true, msg: '' })
  } catch (e) {
    console.log(e.message)
    res.status(500).json({ user: null, success: false, msg: 'server error' })
  }
  
}





const fomatUserPorperty = (user) => {
  console.log(user)
  const { line_displayName, line_statusMessage, line_pictureUrl, line_userId, status, vip} = user
  return {
    userName: line_displayName,
    userAvatar: line_pictureUrl,
    userStatusMsg: line_statusMessage,
    userLineId: line_userId,
    vip,
    status
  }
}


module.exports = {
  getUserViaAuth,
  getUser
}