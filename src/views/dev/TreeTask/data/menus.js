export const taskMenus = [
  {
    icon: "el-icon-refresh",
    action: "refresh"
  },
  {
    icon: "el-icon-folder-add",
    action: "add",
    children: [
      {
        icon: "el-icon-refresh",
        action: "add"
      }
    ]
  }
];

const contextMenus = {
  addDirectory: {
    label: "新建目录",
    icon: "el-icon-circle-plus-outline",
    action: "addDirectory"
  },

  addFile: {
    label: "新建任务",
    icon: "el-icon-plus",
    action: "addFile"
  },

  rename: {
    label: "重命名",
    icon: "el-icon-circle-plus-outline",
    action: "rename"
  },

  move: {
    label: "移动",
    icon: "el-icon-circle-plus-outline",
    action: "move"
  },

  unlock: {
    label: "解锁",
    icon: "el-icon-circle-plus-outline",
    action: "unlock"
  },

  clone: {
    label: "克隆",
    icon: "el-icon-circle-plus-outline",
    action: "clone"
  }
};

export const rootDirMenus = [contextMenus.addDirectory, contextMenus.addFile];

export const childDirMenus = [
  contextMenus.addDirectory,
  contextMenus.addFile,
  contextMenus.rename,
  contextMenus.move
];

export const fileMenus = [
  contextMenus.rename,
  contextMenus.move,
  contextMenus.unlock,
  contextMenus.clone
];
