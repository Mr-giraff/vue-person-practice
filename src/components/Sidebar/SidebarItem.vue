<template>
  <div v-if="visible">
    <el-submenu v-if="hasVisibleChild(children)" :index="currentPath">
      <Item v-bind="meta" />
      <sidebar-item
        v-for="child in children"
        v-bind="child"
        :key="child.path"
        :parentPath="currentPath"
      />
    </el-submenu>

    <el-menu-item v-else :index="currentPath">
      <Item v-bind="meta" />
    </el-menu-item>
  </div>
</template>

<script>
import Item from "./Item";
import { isVisible } from "@/utils/route";

export default {
  name: "SidebarItem",
  components: {
    Item
  },
  inheritAttrs: false,
  props: {
    path: String,
    name: String,
    children: Array,
    meta: Object,
    parentPath: String // 父级路径
  },
  computed: {
    currentPath() {
      return this.resolvePath(this.parentPath, this.path);
    },
    visible() {
      return isVisible(this.meta);
    }
  },
  methods: {
    resolvePath(parentPath, path) {
      return /^\//.test(path) ? path : `${parentPath}/${path}`;
    },
    hasVisibleChild(children) {
      if (!Array.isArray(children)) return false;
      return children.some(child => isVisible(child.meta));
    }
  }
};
</script>
