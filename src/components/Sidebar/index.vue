<template>
  <el-menu router :default-active="activeIndex">
    <sidebar-item v-for="menu in menus" :key="menu.path" v-bind="menu" />
  </el-menu>
</template>

<script>
import SidebarItem from "./SidebarItem";

export default {
  components: {
    SidebarItem
  },
  props: {
    menus: Array
  },
  data() {
    return {
      activeIndex: this.$route.path
    };
  }
};
</script>
