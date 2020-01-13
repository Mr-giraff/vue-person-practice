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
import { isVisible, createRouteMap, normalizePath } from "@/utils/route";
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
      // 子级不可见时，使用父级路径
      const { path, meta, parent } = [...this.$route.matched].pop();
      return meta && meta.hidden ? parent.path : path;
    }
  },
  methods: {
    currentPath(route) {
      const { path, parent } = route;
      return normalizePath(path, parent);
    },
    getMenus() {
      return this.$router.options.routes.filter(item => isVisible(item.meta));
    },
    // 获取某个模块下的路由配置
    getModuleRoute() {
      const { pathMap } = createRouteMap(this.$router.options.routes);

      // 从上往下找到第一个可见的路由项
      const route = this.$route.matched.find(item => isVisible(item.meta));
      // 无可见路由，返回空数组
      if (!route) return [];
      // 父级不存在，则为第一层级路由
      if (!route.parent) return [pathMap[route.path]];
      // 父级不可见，采用所有子级路由
      return route.parent.children.map(child => pathMap[child.path]);
    }
  },
  created() {
    this.menus = this.getMenus();
  }
};
</script>
