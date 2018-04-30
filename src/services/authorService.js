import axios from 'axios';
import {
  API
} from '../constants';

const URL = `${API}/authors`

/**
 * 获取全部用户
 */
const all = async function() {
  return await axios.get(URL)
}

export default {
  all
}