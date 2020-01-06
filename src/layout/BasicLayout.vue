<template>
  <el-container>
    <el-header>Header</el-header>
    <el-container>
      <el-aside width="200px">
        <sidebar :menus="menus" />
      </el-aside>
      <el-main>
        <breadcrumb />
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Sidebar from "@/components/Sidebar";
import Breadcrumb from "@/components/Breadcrumb";
import { isVisible, createRouteMap } from "@/utils/route";

export default {
  components: {
    Sidebar,
    Breadcrumb
  },
  data() {
    return {
      menus: []
    };
  },
  created() {
    this.menus = this.createMenus();
  },
  methods: {
    createMenus() {
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
  }
};
</script>
