<template>
  <div class="search-toolbar">
    <div class="search-toolbar-input">
      <el-input
        placeholder="请输入"
        suffix-icon="el-icon-search"
        size="small"
        v-model="search"
        v-bind="$attrs"
      />
    </div>
  </div>
</template>

<script>
import _ from "lodash";

export default {
  inheritAttrs: false,

  data() {
    return {
      search: ""
    };
  },

  watch: {
    search(val) {
      this.sendKey(val);
    }
  },

  methods: {
    onAction(action) {
      this.$emit("action", action);
    }
  },

  created() {
    this.sendKey = _.debounce(function(str = "") {
      this.$emit("search", str.trim());
    }, 300);
  }
};
</script>

<style lang="less" scoped>
.search-toolbar {
  display: flex;
  align-items: center;
  padding: 10px 0;

  &-input {
    flex: 1;
  }
}
</style>
