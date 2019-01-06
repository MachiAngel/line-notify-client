
const { PTT_TABLE_STRING, PTT_HOTBOARD_TABLE_STRING } = require('../constants/tableSchema')
const axios = require('axios')

module.exports = class PttModel {

  
  constructor({ db }) {
    this.db = db
  }

  async getPttHotBoards() {

    try {
      //刪除表
      const hotBoards = await this.db.select('*').from(PTT_HOTBOARD_TABLE_STRING)  
      return hotBoards
      
    } catch (e) {
      console.log(e.message)
      throw e
    }

  }
  
  async checkPttBoard(boardName){
    try {
      const firstPage = `https://www.ptt.cc/bbs/${boardName}/index.html`
      console.log(firstPage)
      const response = await axios.get(firstPage, {
        headers: {
          Cookie: "over18=1"
        }
      })

      if (response.status !== 200) {
        return { success: false }
      }

      return { success: true }
    } catch (e) {
      
      return {success:false}
    }
  }

}


