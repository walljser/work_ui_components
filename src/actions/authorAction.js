import {
  FETCH_AUTHORS,
  FETCH_AUTHORS_SUCCESS,
  FETCH_AUTHORS_FAILURE
} from './types';
import authorService from '../services/authorService';

function fetchAuthors() {
  return {
    type: FETCH_AUTHORS
  }
}

function fetchAuthorsFailure(error) {
  return {
    type: FETCH_AUTHORS_FAILURE,
    payload: error
  }
}

function fetchAuthorsSuccess(data) {
  return {
    type: FETCH_AUTHORS_SUCCESS,
    payload: data
  }
}

/**
 * 获取全部作者
 */
function getAllAuthors() {
  return async dispatch => {
    try {
      dispatch(fetchAuthors())
      const res = await authorService.all()
      const status = res.data.status
      if (status === 200) {
        const data = res.data.data
        return dispatch(fetchAuthorsSuccess(data))
      } else {
        const message = res.data.message
        return dispatch(fetchAuthorsFailure(message))
      }
    } catch (err) {
      console.log(err)
    }
  }
}

export {
  getAllAuthors
}