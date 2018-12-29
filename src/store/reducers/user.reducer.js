// const ERROR_MSG = 'error_msg'
// const LOGIN_SUCCESS = 'login_success'
const LOAD_DATA = 'load_data'
const initState = {
  id:'',
  userName: '',
  userAvatar: '',
  userStatusMsg: '',
  userLineId: '',
  vip:'',
  status:''
}




export default (state=initState, action) => {
  switch(action.type) {
    case LOAD_DATA:
      return { ...state, ...action.payload}
    default:
      return state 
  }
  
}