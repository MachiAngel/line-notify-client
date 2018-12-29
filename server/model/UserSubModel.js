
const { 
  USER_PUSHED_TABLE_STRING,
  SUBSCRIBE_PTT_TABLE_STRING,
  SUBSCRIBE_EYNY_VIDEO_TABLE_STRING,
  SUBSCRIBE_EYNY_BT_MOVIE_TABLE_STRING,
  SUBSCRIBE_EYNY_MOVIE_TABLE_STRING
} = require('../constants/tableSchema')

const {
  PTT_SOURCE,
  EYNY_SOURCE_VIDEO,
  EYNY_SOURCE_MOIVE,
  EYNY_SOURCE_MOIVE_BT
} = require('../constants/constants')


// user_line_id
// sub_type
// title
// not_title
// board
// author
// category
// rate

module.exports = class UserSubModel {


  constructor({db}) {
    this.db = db
  }

  /** @description Get all user subscriotions
  * @param {String} user_line_id  
  * @return { object } return all data from table u given
  */
  async getAllUserSubscriptions(user_line_id) {
    
    try {
      const pttSubs = await this.db
        .select('id', 'author', 'board', 'category', 'created_at', 'title', 'not_title', 'rate','sub_type')
        .from(SUBSCRIBE_PTT_TABLE_STRING)
        .where({ user_line_id})

      const eynyVideoSubs = await this.db(SUBSCRIBE_EYNY_VIDEO_TABLE_STRING).where({ user_line_id }).returning('*')
      const eynyBTMovieSubs = await this.db(SUBSCRIBE_EYNY_BT_MOVIE_TABLE_STRING).where({ user_line_id }).returning('*')
      const eynyMovieSubs = await this.db(SUBSCRIBE_EYNY_MOVIE_TABLE_STRING).where({ user_line_id }).returning('*')

      return { pttSubs, eynyVideoSubs, eynyBTMovieSubs, eynyMovieSubs}

    } catch (e) {
      console.log(e.message)
      throw e
    }
  }

  /** @description Save ptt sub to pgdb
  * @param {object} params
  * @param {object} pgdb
  * @return {object} return sub data from  u given
  */
  async addPttSubScription(pttSub) {

    const { 
      user_line_id,
      title,
      not_title,
      board,
      author,
      category,
      rate
    } = pttSub
    const handledRate = Number(rate) || 0
    try {
      const insertResult = await this.db.insert({
        user_line_id, 
        title,
        not_title,
        board,
        author,
        category,
        rate: handledRate,
        sub_type: PTT_SOURCE
      })
        .into(SUBSCRIBE_PTT_TABLE_STRING)
        .returning('*')

      return insertResult[0]

    } catch (e) {
      console.log(e.message)
      throw e
    }
  }


  /** @description Delete ptt sub to pgdb
  * @param {object } params
  * @return {object} return remove data from u given
  */
  async deletePttSubScription(params) {

    const { user_line_id, id } = params

    try {
      const deleteResult = await this.db(SUBSCRIBE_PTT_TABLE_STRING)
        .where({
          user_line_id,
          id
        })
        .del()
      //return 0 沒刪除到 , 1以上  刪除了幾個
      return deleteResult
    } catch (e) {
      console.log(e.message)
      throw e
    }
  }


  async editPttSubScription({ user_line_id, id, update }) {
    try {
      const result = await this.db(SUBSCRIBE_PTT_TABLE_STRING)
        .where({
          user_line_id,
          id
        })
        .update(update)
        ///TODO

      if (!result) {return 0}
      return {...update, id}

    } catch (e) {
      console.log(e.message)
      throw e
    }
  }
  

  /** @description Save pushed article to pgdb
  * @param {String} user_line_id.
  * @param {String} article_url   
  * @param {object} Knex 
  */
  async savePushedArticleUrlToPGDB(user_line_id, article) {
    const { article_url, article_source } = article
    try {

      const insertResult = await this.db.insert({
        user_line_id,
        article_url,
        sub_type: article_source
      })
        .into(USER_PUSHED_TABLE_STRING)
        .returning('*')

      if (!insertResult.length) {
        throw new Error(`insert ${USER_PUSHED_TABLE_STRING} table return nothing`)
      }
      return insertResult[0]

    } catch (e) {

      console.log(e.message)
      throw e
    }
  }


  /** @description Determines articles is pushed or not.
  * @param {String} user_line_id.
  * @param {String} article_url   
  * @param {object} Knex
  * @return {Boolean} return true or false 
  */
  async isSubscriptionPushed(user_line_id, article_url, pgdb) {
    try {

      const query = {
        user_line_id,
        article_url
      }
      const subs = await this.db(USER_PUSHED_TABLE_STRING)
        .where(query)
        .select('id')

      return subs.length ? true : false 

    } catch (e) {
      console.log(e.message)
      throw e
    }
  }

  /** @description Get array of ptt board by all user subscription
  * @return {array} array of ptt board by all user subscription
  */
  async getSubscriptionBoardsFromPtt(pgdb) {
    try {
      const boards = await this.db
        .select('board')
        .from(SUBSCRIBE_PTT_TABLE_STRING)
        .groupBy('board')
        .returning('board')

      return boards.map(sub => {
        return sub.board
      })
        
    } catch (e) {
      console.log(e)
      throw e
    }

  }

  /** @description Get array of keyword of eyny video by all user subscription
  * @return {array} array of keyword of eyny video by all user subscription
  */
  async getSubscriptionsOfKeywordFromEynyVideo(pgdb) {
    try {
      const keywords = await pgdb
        .select('keyword')
        .from(SUBSCRIBE_EYNY_VIDEO_TABLE_STRING)
        .groupBy('keyword')
        .returning('keyword')

      return keywords.map(sub => {
        return sub.keyword
      })

    } catch (e) {
      console.log(e)
      throw e
    }

  }


}


 