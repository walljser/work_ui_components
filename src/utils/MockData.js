import Mock from 'mockjs';

/**
 * mock数据
 * 
 * @class MockData
 */
class MockData {
  constructor(apis) {
    this.apis = apis
  }

  /**
   * 处理key，  例如 'get /api/v1/user' to { url: '/api/v1/user', method: 'get'}
   * @param {*} name 
   */
  dealUrl(name) {
    const url = name.split(" ") 

    if (url.length === 2) {
      return {
        url: url[1],
        method: url[0]
      }
    } else {
      return {
        url: url,
        method: 'get'
      }
    }
  }

  delay(time = 600) {
    Mock.setup({
      timeout: time
    })
  }

  /**
   * mock data
   */
  listen() {
    const apiNames = Object.keys(this.apis)
    apiNames.map((name) => {
      const config = this.dealUrl(name)
      Mock.mock(config.url, config.method, this.apis[name])
      return null
    })

    this.delay()

    Mock.mock(/\/names/, 'POST', { name: '@cname'})
  }
}

export default MockData