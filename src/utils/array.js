/**
 * 从数组中找到属性值为 value 的对象
 * @param {array} src
 * @param {*} value - 目标值
 * @param {string} key - 目标属性
 */
export function findItem(src, value, key = "key") {
  return src.find(item => item[key] === value);
}

/**
 * 获取目标对象对应的属性值
 * @param {array} src
 * @param {*} value
 * @param {string} key
 * @param {string} prop
 */
export function findValue(src, value, key = "key", prop) {
  const result = findItem(src, value, key) || {};
  return result[prop];
}
