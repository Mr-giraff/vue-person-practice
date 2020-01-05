<template>
  <el-menu router :default-active="activeIndex">
    <sidebar-item
      v-for="menu in menus"
      v-bind="menu"
      :key="menu.path"
      :parentPath="currentPath(menu)"
    />
  </el-menu>
</template>

<script>
import SidebarItem from "./SidebarItem";
import { normalizePath } from "@/utils/route";

export default {
  components: {
    SidebarItem
  },
  props: {
    menus: Array
  },
  computed: {
    activeIndex() {
      // 子级不可见时，使用父级路径
      const { path, meta, parent } = [...this.$route.matched].pop();
      return meta && meta.hidden ? parent.path : path;
    }
  },
  methods: {
    currentPath(route) {
      const { path, parent } = route;
      return normalizePath(path, parent);
    }
  }
};
</script>
