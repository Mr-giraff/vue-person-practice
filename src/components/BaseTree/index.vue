<template>
  <el-tree
    ref="tree"
    node-key="id"
    icon-class="el-icon-arrow-right"
    :filter-node-method="onFilterNode"
    v-bind="$attrs"
    v-on="$listeners"
    @node-click="hdlClick"
  />
</template>

<script>
import _ from "lodash";
import {
  searchStart,
  searchEnd,
  saveExpandedKeys,
  restoreExpandedKeys
} from "./utils";

export default {
  inheritAttrs: false,

  props: {
    filterText: String // 处理本地搜索
  },

  data() {
    return {
      clickCount: 0
    };
  },

  watch: {
    filterText(cur, prev) {
      searchStart(cur, prev) && this.saveExpandedKeys();
      searchEnd(cur, prev) && this.restoreExpandedKeys();
      this.$refs.tree.filter(cur);
    }
  },

  methods: {
    hdlClick() {
      const args = arguments;
      // 发送单击事件
      this.$emit("nod-click", ...args);
      // 发送双击事件
      this.clickCount++;
      this.fnEmitDblClick(args);
    },

    onFilterNode(val, data) {
      if (!val) return true;
      return data.label.toLocaleLowerCase().includes(val.toLocaleLowerCase());
    },

    saveExpandedKeys() {
      this.expandedKeys = saveExpandedKeys(this.$refs.tree.store.nodesMap);
    },

    restoreExpandedKeys() {
      restoreExpandedKeys(this.$refs.tree.store.nodesMap, this.expandedKeys);
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
