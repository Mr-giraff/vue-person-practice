export function isVisible(menu) {
  return !(menu && menu.hidden);
}

export function isVisibleBreadcrumb(meta) {
  return meta && meta.title && meta.hideBreadcrumb !== true;
}

export function isVisibleWholeBreadcrumb(meta) {
  return !(meta && meta.hideWholeBreadcrumb);
}

export function hasChildren({ children }) {
  return Array.isArray(children) && children.length > 0;
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

// eslint-disable-next-line no-useless-escape
const regUrl = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

export function isUrl(path) {
  return regUrl.test(path);
}

const regAbsolutePath = /^\//;

export function isAbsolutePath(path) {
  return regAbsolutePath.test(path);
}

// 统一使用相对路径
export function formatter(routes, parentPath = "/") {
  return routes.map(item => {
    let { path } = item;
    if (!isUrl(path)) {
      // 处理 path: '' 引发的 '//' 问题
      path = (parentPath + path).replace(/\/\//, "/");
    }
    const result = {
      ...item,
      path
    };
    if (item.children) {
      result.children = formatter(item.children, `${path}/`);
    }
    return result;
  });
}

export function getActiveMenus(menus) {
  let result = [];
  menus.forEach(menu => {
    if (!isVisible(menu)) return;

    const record = {
      ...menu,
      children: hasChildren(menu) ? getActiveMenus(menu.children) : []
    };

    result.push(record);
  });
  return result;
}
