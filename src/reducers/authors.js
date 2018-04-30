import {
  FETCH_AUTHORS,
  FETCH_AUTHORS_FAILURE,
  FETCH_AUTHORS_SUCCESS
} from '../actions/types'

const initialState = {
  authors: [], // 作者列表
  errorMessage: '', // api获取的错误信息
  isFetching: false // 正在获取
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case FETCH_AUTHORS:
      return Object.assign({}, state, {
        isFetching: true,
        errorMessage: ''
      })
    case FETCH_AUTHORS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        authors: action.payload
      })
    case FETCH_AUTHORS_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        errorMessage: ''
      })
    default:
      return state
  }
}