<template>
  <el-container>
    <el-header>Header</el-header>
    <el-container>
      <el-aside width="200px">
        <sidebar :menus="menus" />
      </el-aside>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Sidebar from "@/components/Sidebar";
import { routes } from "@/router";
export default {
  components: {
    Sidebar
  },
  data() {
    return {
      menus: [routes[1]]
    };
  }
};
</script>
