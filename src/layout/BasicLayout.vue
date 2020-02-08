<template>
  <el-container>
    <el-header>
      <nav-header :logo="logo" :title="title" />
    </el-header>
    <el-container>
      <router-view v-if="$route.meta.blank" />
      <template v-else>
        <el-aside width="200px">
          <sidebar />
        </el-aside>
        <el-main>
          <breadcrumb />
          <router-view />
        </el-main>
      </template>
    </el-container>
  </el-container>
</template>

<script>
import NavHeader from "@/components/NavHeader";
import Sidebar from "@/components/Sidebar";
import Breadcrumb from "@/components/Breadcrumb";

export default {
  components: {
    NavHeader,
    Sidebar,
    Breadcrumb
  },

  data() {
    return {
      logo: require("@/assets/logo.png"),
      title: "AI station"
    };
  }
};
</script>
