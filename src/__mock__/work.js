/**
 * 新建作品接口
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
    'post /api/v1/work': (options) => {
      const data = JSON.parse(options.body)
      if (data.name === "") {
        return {
          'status': 400,
          'message': '作品名字不能为空',
          'data': {

          }
        }
      }

      if (data.authors.length === 0) {
        return {
          'status': 400,
          'message': '请选择作品作者'
        }
      }

      return {
        'status': 201,
        'message': '创建作品成功'
      }
    },
    'get /api/v1/work': {
      'status': 200,
      'data': {
        'pageNum': 1,
        'pageSize': 8,
        'count': 200,
        'works|8': [{
          'id|+1': 10000000,
          'name|1': ['郑和下西洋', '活字印刷', '静夜思'],
          'image|1': ['http://119.29.161.228/test1.jpg', 'http://119.29.161.228/test2.jpg'],
          'authors|6-10': ['@cname'],
          'createTime|1': [
            '2016/10/3 10:23',
            '2017/1/6 8:39',
          ],
        }]
      },
      'message': '获取成功'
    }
  }
}