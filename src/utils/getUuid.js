/**
 * 根据传入的key,生成一个不重复的uuid
 * 
 * @param {any} number 
 * @returns 
 */
function getUuid(key) {
  return "notification-" + new Date().getTime() + "-" + key;
}

export default getUuid