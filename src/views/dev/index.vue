<template>
  <div class="data-dev">
    <div class="data-dev-left side-tabs">
      <el-tabs v-model="activeName" tab-position="left">
        <el-tab-pane
          v-for="item in tabs"
          :key="item.label"
          :label="item.label"
          :name="item.label"
        >
          <component :ref="item.component" :is="item.component" />
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="data-dev-right"></div>
  </div>
</template>

<script>
import TreeTask from "./TreeTask";
import TreeResource from "./TreeResource";

export default {
  components: {
    TreeTask,
    TreeResource
  },

  data() {
    const tabs = [
      {
        label: "任务开发",
        component: "TreeTask"
      },
      {
        label: "资源管理",
        component: "TreeResource"
      }
    ];

    return {
      tabs,
      activeName: "任务开发"
    };
  }
};
</script>

<style lang="less" scoped>
.data-dev {
  display: flex;

  &-left {
    width: 340px;
  }
}
</style>

<style lang="less">
/* 通过调整样式 实现 ui - sideTabs */
.side-tabs {
  .el-tabs__nav {
    white-space: normal !important;
  }

  .el-tabs--left .el-tabs__active-bar.is-left {
    left: 0 !important;
    right: auto !important;
  }

  .el-tabs--right .el-tabs__active-bar.is-right {
    right: 0 !important;
    left: auto !important;
  }

  .el-tabs__item {
    width: 50px !important;
    height: auto !important;
    padding: 10px 17px !important;
    line-height: normal !important;
  }

  .el-tabs--left .el-tabs__item.is-active {
    border-left: 2px solid !important;
    background: aliceblue !important;
  }

  .el-tabs--right .el-tabs__item.is-active {
    border-right: 2px solid !important;
    background: aliceblue !important;
  }

  .el-tabs__nav-wrap:after {
    background-color: transparent !important;
  }
}
</style>
