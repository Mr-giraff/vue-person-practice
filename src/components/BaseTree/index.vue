<template>
  <el-tree v-bind="$attrs" v-on="$listeners" @node-click="hdlClick" />
</template>

<script>
import _ from "lodash";

export default {
  inheritAttrs: false,

  data() {
    return {
      clickCount: 0
    };
  },

  methods: {
    hdlClick() {
      const args = arguments;
      // 发送单击事件
      this.$emit("nod-click", ...args);
      // 发送双击事件
      this.clickCount++;
      this.fnEmitDblClick(args);
    }
  },

  created() {
    this.fnEmitDblClick = _.debounce(function(args) {
      if (this.clickCount > 1) {
        this.$emit("node-dblclick", ...args);
      }
      this.clickCount = 0;
    }, 300);
  }
};
</script>
