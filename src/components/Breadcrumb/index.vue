<template>
  <el-breadcrumb v-if="visible" separator="/">
    <el-breadcrumb-item
      v-for="(item, index) in breadcrumbs"
      :key="item.path"
      :to="index !== breadcrumbs.length - 1 ? item.path : ''"
    >
      {{ item.meta.title }}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
import { isVisibleBreadcrumb, isVisibleWholeBreadcrumb } from "@/utils/route";

export default {
  data() {
    return {
      breadcrumbs: []
    };
  },
  computed: {
    visible() {
      return this.$route.matched.every(route =>
        isVisibleWholeBreadcrumb(route.meta)
      );
    }
  },
  watch: {
    $route() {
      this.getBreadcrumbs();
    }
  },
  methods: {
    getBreadcrumbs() {
      // hideBreadcrumb
      this.breadcrumbs = this.$route.matched.filter(item =>
        isVisibleBreadcrumb(item.meta)
      );
    }
  },
  created() {
    this.getBreadcrumbs();
  }
};
</script>
