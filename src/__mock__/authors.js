/**
 * 获取作者列表 接口配置
 * 
 * response标准格式：
 *  {
 *     "status":  状态码，
 *     "data":    数据
 *     "message": 提示信息
 *  }
 */
export default () => {
  return {
    'get /api/v1/authors': {
      'status': 200,
      'data|100': [{
        'id|+1': 100000,
        'name': '@cname'
      }],
      'message': '获取成功'
    }    
  }
}