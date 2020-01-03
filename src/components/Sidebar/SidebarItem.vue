<template>
  <el-submenu :index="currentPath" v-if="children">
    <Item v-bind="meta" />
    <sidebar-item
      v-for="child in children"
      :key="child.path"
      v-bind="child"
      :parent="currentPath"
    />
  </el-submenu>
  <el-menu-item :index="currentPath" v-else>
    <Item v-bind="meta" />
  </el-menu-item>
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
    }
  }
};
</script>
