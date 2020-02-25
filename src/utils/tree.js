/**
 * 关键字过滤树节点开始
 * @param {string} cur - 当前关键字
 * @param {string} prev - 先前关键字
 */
export function searchStart(cur, prev) {
  return prev === "" && cur;
}

/**
 * 关键字过滤树节点结束
 * @param {string} cur - 当前关键字
 * @param {string} prev - 先前关键字
 */
export function searchEnd(cur, prev) {
  return cur === "" && prev;
}

/**
 * 保存展开节点key
 * @param {Object} nodesMap - {key:node}
 * @returns {Array} expandedKeys
 */
export function saveExpandedKeys(nodesMap) {
  return Object.values(nodesMap)
    .filter(({ expanded, isLeaf }) => expanded && !isLeaf) // 减少不必要的文件展开状态，只保留文件夹的展开状态即可
    .map(({ key }) => key);
}

/**
 * 恢复指定节点的展开节点状态
 * @param {Object} nodesMap - {key:node}
 * @param {Array} expandedKeys - [1]
 */
export function restoreExpandedKeys(nodesMap, expandedKeys) {
  Object.values(nodesMap).forEach(node => (node.expanded = false));
  expandedKeys.forEach(
    expandedKey => ((nodesMap[expandedKey] || {}).expanded = true)
  );
}
