import axios from 'axios'
import { push } from 'connected-react-router'
// ptt Reducer

// Actions
const LOAD = 'line-notify/ptt/LOAD';
const LOAD_EDIT_INIT_DATA = 'line-notify/ptt/LOAD_EDIT_INIT_DATA';

const CREATE_REQUEST = 'line-notify/ptt/CREATE_REQUEST';
const CREATE_SUCCESS = 'line-notify/ptt/CREATE_SUCCESS';
const CREATE_FAIL = 'line-notify/ptt/CREATE_FAIL';


const UPDATE = 'line-notify/ptt/UPDATE';
const REMOVE = 'line-notify/ptt/REMOVE';


const subPttReducerDefaultState = {
  isFetching:false,
  list:[],
  errMsg:'',
  initialValues: {
    author: "",
    board: "",
    category: "",
    rate: "",
    title: "",
    not_title:""
  }
};

export default (state = subPttReducerDefaultState, action) => {
  switch (action.type) {
    case LOAD:
      return { ...state, list: action.payload}
    case LOAD_EDIT_INIT_DATA:
      const { author, board, category, rate, title, not_title } = action.payload
      return { ...state, initialValues: { author, board, category, rate, title, not_title, sub_type:"ptt_articles" }}
    case CREATE_REQUEST:
      return { ...state, isFetching: true };
    case CREATE_SUCCESS:
      return { ...state, isFetching: false };
    case CREATE_FAIL:
      return { ...state, isFetching: false };
    default:
      return state;
  }
};



// Action Creators
export const loadPttSub = (payload) => {
  return {
    type: LOAD,
    payload
  }
}

export const addPttSub = (payload) => {
  return {
    type: CREATE_SUCCESS,
    payload
  }
}

export const loadEditInitData = (payload) => {
  return {
    type: LOAD_EDIT_INIT_DATA,
    payload
  }
}



export const createPttSub = (sub,alert) => (dispatch, getState) => {

  const { userLineId } = getState().user
  dispatch({ type: CREATE_REQUEST });

  axios.post('/api/v1/subscriptions/ptt', { ...sub, user_line_id:userLineId})
    .then(result => {
      console.log('get ptt create data')
      console.log(result.data)
      //檢查數據 fail會 throw error 
      validateResultStatus(result)
      
      alert.success('新增成功', {
        timeout: 2000, 
        onOpen: () => { console.log('hey') }, 
        onClose: () => { 
          dispatch({ type: CREATE_SUCCESS, payload: result.data.result });
          dispatch(push('/subscription'))
        } // callback that will be executed after this alert is removed
      })
      
      //成功
      
      
      
    }).catch(e => {
      alert.success('新增失敗', {
        timeout: 2000,
        onOpen: () => { console.log('hey') },

        onClose: () => {
          dispatch({ type: CREATE_FAIL, errMsg: e.message });
        } // callback that will be executed after this alert is removed
      })
      
    })
};


export const editPttSub = (id ,sub, alert) => (dispatch, getState) => {

  const { userLineId } = getState().user
  dispatch({ type: CREATE_REQUEST });
  console.log(sub)
  console.log(sub)
  axios.patch('/api/v1/subscriptions/ptt', { id, update: sub, user_line_id: userLineId, })
    .then(result => {
      console.log('get ptt edit data')
      //檢查數據 fail會 throw error 
      validateResultStatus(result)

      alert.success('修改成功', {
        timeout: 2000,
        onOpen: () => {},
        onClose: () => {
          dispatch({ type: CREATE_SUCCESS, payload: result.data.result });
          dispatch(push('/subscription'))
        } // callback that will be executed after this alert is removed
      })

      //成功
    }).catch(e => {
      alert.success('修改失敗', {
        timeout: 2000,
        onOpen: () => { console.log('hey') },
        onClose: () => {
          dispatch({ type: CREATE_FAIL, errMsg: e.message });
        } // callback that will be executed after this alert is removed
      })

    })
};



const validateResultStatus = (result) => {

  const { data } = result 

  if (!data.isSucceeded) {
    throw new Error(data.msg)
  } 
}