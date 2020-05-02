<template>
  <el-menu router :default-active="activeIndex">
    <sidebar-item v-for="menu in menus" v-bind="menu" :key="menu.path" />
  </el-menu>
</template>

<script>
import { getActiveMenus } from "@/utils/route";
import { routeMapping } from "@/router/routes";
import SidebarItem from "./SidebarItem";

export default {
  components: {
    SidebarItem
  },

  data() {
    return {
      menus: []
    };
  },

  computed: {
    activeIndex() {
      // 倒序寻找第一个可见路由
      const lastIndex = this.$route.matched
        .map(({ path }) => (routeMapping.pathMap[path] || {}).hidden !== true) // hidden 不是 vue-router 内置属性，需要通过 routeMapping 读取
        .lastIndexOf(true);
      return this.$route.matched[lastIndex].path;
    }
  },

  methods: {
    getMenus() {
      const menus = this.getNamespacedMenus();
      // 过滤 hidden
      return getActiveMenus(menus);
    },

    // 每个路由都从属于某个命名空间，根据路由获取对应命名空间的菜单列表
    getNamespacedMenus() {
      const lastIndex = this.$route.matched
        .map(({ meta }) => meta.namespaced === true) // meta 是 vue-router 内置属性，可以直接读取
        .lastIndexOf(true);

      const path = lastIndex !== -1 ? this.$route.matched[lastIndex].path : "/";
      const { pathMap } = routeMapping;
      const root = pathMap[path] || {};
      return root.hidden ? root.children : [root];
    }
  },
  created() {
    this.menus = this.getMenus();
  }
};
</script>
