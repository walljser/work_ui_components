import axios from 'axios';
import {
  API
} from '../constants';

const URL = `${API}/work`
const DEFAULT = {
  name: '',
  authors: [],
  image: {},
  description: ''
}

/**
 * 新建作品接口
 * @param {*} work 
 */
const post = async function(work) {
  work = Object.assign({}, DEFAULT, work)
  return await axios.post(URL, work)
}

/**
 * 获取作品接口， 由于mock不能接收get的请求参数， 先做一个假分页
 * @param {*} pageNum 
 * @param {*} pageSize 
 */
const all = async function(pageNum = 1, pageSize = 8) {
  return await axios.get(URL)
  // return await axios.get(URL, {
  //   params: {
  //     pageNum: pageNum,
  //     pageSize: pageSize
  //   }
  // })
}

export default {
  post,
  all
}