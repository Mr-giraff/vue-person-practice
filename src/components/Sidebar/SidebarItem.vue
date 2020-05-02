<template>
  <el-submenu v-if="hasChild" :index="path">
    <Item v-bind="meta" />
    <sidebar-item v-for="child in children" v-bind="child" :key="child.path" />
  </el-submenu>

  <el-menu-item v-else :index="path">
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
    children: Array,
    meta: Object
  },

  computed: {
    hasChild() {
      return Array.isArray(this.children) && this.children.length > 0;
    }
  }
};
</script>
