import * as Types from '../actions/types';

const initialState = {
  isPosting: false, // 正在提交表单
  postErrorMessage: '', // 提交表单接口的错误信息
  isFetching: false, // 正在获取作品列表
  works: [], // 作品列表
  fetchErrorMessage: '' // 获取作品列表错误信息
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case Types.POST_WORK:
      return Object.assign({}, state, {
        isPosting: true,
        postErrorMessage: ''
      })
    case Types.POST_WORK_FAILURE:
      return Object.assign({}, state, {
        isPosting: false,
        postErrorMessage: action.payload
      })
    case Types.POST_WORK_SUCCESS:
      return Object.assign({}, state, {
        isPosting: false
      })
    case Types.FETCH_WORK:
      return Object.assign({}, state, {
        isFetching: true,
        works: [],
        fetchErrorMessage: ''
      })
    case Types.FETCH_WORK_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        works: action.payload
      })
    case Types.FETCH_WORK_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        fetchErrorMessage: action.payload
      })
    default:
      return state
  }
}