<template>
  <el-container>
    <el-header>Header</el-header>
    <el-container>
      <el-aside width="200px">
        <sidebar />
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

export default {
  components: {
    Sidebar,
    Breadcrumb
  }
};
</script>
