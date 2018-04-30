/**
 * 延迟任意毫秒
 * @param {*} time 毫秒
 */
function delay(time = 0) {
  return new Promise((res) => setTimeout(res, time))
}

export default delay