export function isVisible(meta) {
  return !(meta && meta.hidden);
}

/**
 *
 * @param {Object[]} routes
 * @returns {Object}
 */
export function createRouteMap(routes) {
  const pathList = [];
  const pathMap = {};
  const nameMap = {};

  routes.forEach(route => addRouteRecord(pathList, pathMap, nameMap, route));

  return {
    pathList,
    pathMap,
    nameMap
  };
}

/**
 *
 * @param {string[]} pathList
 * @param {Object} pathMap
 * @param {Object} nameMap
 * @param {Object} route
 * @param {Object} parent
 */
export function addRouteRecord(pathList, pathMap, nameMap, route, parent) {
  const { path, name } = route;
  const normalizedPath = normalizePath(path, parent);

  const record = {
    ...route,
    parent,
    path: normalizedPath
  };

  if (route.children) {
    route.children.forEach(child => {
      // 把子路由添加到路由表记录中（递归）
      addRouteRecord(pathList, pathMap, nameMap, child, record);
    });
  }

  // 如果路由不存在于 pathMap 对象中，则把些 path 保存到 pathList 以及 pathMap 对象中
  if (!pathMap[record.path]) {
    pathList.push(record.path);
    pathMap[record.path] = record;
  }

  // 生成名字与路由的映射表
  if (name) {
    if (!nameMap[name]) {
      nameMap[name] = record;
    }
  }
}

/**
 *
 * @param {string} path - 当前路径
 * @param {Obejct|Null} parent - 父路由记录
 */
export function normalizePath(path, parent) {
  // 如果 path 中第一个字符是 "/" 说明是顶级路径，直接返回 path
  if (path[0] === "/") return path;
  // 或者如果 parent 为 空 也直接返回 path
  if (!parent) return path;
  // 如果以前条件都不满足，那么返回
  return `${parent.path}/${path}`;
}
