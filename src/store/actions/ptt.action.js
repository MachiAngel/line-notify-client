
const LOAD_SUB_PTT = 'load_sub_ptt'
const ADD_SUB_PTT = 'add_sub_ptt'
const EDIT_SUB_PTT = 'edit_sub_ptt'
const SAVE_SUB_PTT = 'save_sub_ptt'
const REMOVE_SUB_PTT = 'remove_sub_ptt'

export const loadPttData = (payload) => {
  return {
    type: LOAD_SUB_PTT,
    payload
  }
}

