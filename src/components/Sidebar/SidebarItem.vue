<template>
  <div v-if="!hidden">
    <el-submenu v-if="hasVisibleChild(children)" :index="currentPath">
      <Item v-bind="meta" />
      <sidebar-item
        v-for="child in children"
        v-bind="child"
        :key="child.path"
        :parent="currentPath"
      />
    </el-submenu>

    <el-menu-item v-else :index="currentPath">
      <Item v-bind="meta" />
    </el-menu-item>
  </div>
</template>

<script>
import Item from "./Item";
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
    hidden: Boolean,
    parent: String // 父级路径
  },
  computed: {
    currentPath() {
      return this.resolvePath(this.parent, this.path);
    }
  },
  methods: {
    resolvePath(parent, path) {
      return /^\//.test(path) ? path : `${parent}/${path}`;
    },
    hasVisibleChild(children) {
      if (!Array.isArray(children)) return false;
      return children.some(child => !child.hidden);
    }
  }
};
</script>
