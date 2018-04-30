import { POST_WORK, POST_WORK_SUCCESS, POST_WORK_FAILURE, FETCH_WORK, FETCH_WORK_FAILURE, FETCH_WORK_SUCCESS } from "./types";
import workService from '../services/workService';

function postWork() {
  return {
    type: POST_WORK
  } 
}

function postWorkSuccess() {
  return {
    type: POST_WORK_SUCCESS
  }
}

function postWorkFailure(message) {
  return {
    type: POST_WORK_FAILURE,
    payload: message
  }
}

function fetchWork() {
  return {
    type: FETCH_WORK
  }
}

function fetchWorkSuccess(err) {
  return {
    type: FETCH_WORK_SUCCESS,
    payload: err
  }
}

function fetchWorkFailure(works) {
  return {
    type: FETCH_WORK_FAILURE,
    payload: works
  }
}

/**
 * 新建作品
 * 
 * @param {any} work 作品表单对象
 * @returns 
 */
function createWork(work) {
  return async function(dispatch) {
    try {
      dispatch(postWork())
      const res = await workService.post(work)
      const status = res.data.status
      if (status === 201) {
        return dispatch(postWorkSuccess())
      } else {
        const message = res.data.message
        return dispatch(postWorkFailure(message))
      }
    } catch (err) {
      console.log(err)
    }
  }
}

/**
 * 分页获取作品列表
 * 
 * @param {any} pageNum 当前页码 
 * @param {number} [pageSize=8] 页面大小
 * @returns 
 */
function getWorkByPageHelper(pageNum, pageSize = 8) {
  return async function(dispatch) {
    try {
      dispatch(fetchWork())
      const res = await workService.all(pageNum, pageSize)
      const status = res.data.status
      if (status === 200) {
        const data = res.data.data.works
        return dispatch(fetchWorkSuccess(data))
      } else {
        const message = res.data.message
        return dispatch(fetchWorkFailure(message))
      }
    } catch(err) {
      console.log(err)
    }
  }
}

export {
  createWork,
  getWorkByPageHelper
}