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
import _ from "lodash";

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
      const breadcrumbs = this.$route.matched.filter(item =>
        isVisibleBreadcrumb(item.meta)
      );

      // dynamicBreadcrumb
      this.breadcrumbs = breadcrumbs.map(item => {
        item.meta.title = this.getTitle(item.meta, this.$route);
        return item;
      });
    },

    getTitle({ title, dynamicBreadcrumb }, route) {
      if (dynamicBreadcrumb) {
        const keys = dynamicBreadcrumb.split(".");
        title = _.get(route, keys);
      }
      return title;
    }
  },
  created() {
    this.getBreadcrumbs();
  }
};
</script>
