<template>
  <div class="tree-task">
    <search-toolbar @search="onSearch" />
    <el-tree
      ref="tree"
      node-key="id"
      :data="nodes"
      :render-content="renderContent"
      :filter-node-method="onFilterNode"
    />
  </div>
</template>

<script type="text/jsx">
import { findValue } from "utils/array";
import {
  searchStart,
  searchEnd,
  saveExpandedKeys,
  restoreExpandedKeys
} from "@/utils/tree";

import { taskTree } from "./data/tree";
import { FILETYPE } from "./data/options";
import SearchToolbar from "../components/SearchToolbar";

export default {
  components: {
    SearchToolbar
  },

  data() {
    return {
      nodes: taskTree,
      searchStr: '',
      expandedKeys: [],
    };
  },

  methods: {
    onSearch(val) {
      if (searchStart(val, this.searchStr)) {
        this.expandedKeys = saveExpandedKeys(this.$refs.tree.store.nodesMap);
      }

      if (searchEnd(val, this.searchStr)) {
        restoreExpandedKeys(
          this.$refs.tree.store.nodesMap,
          this.expandedKeys
        );
      }

      this.searchStr = val;
      this.$refs.tree.filter(val);
    },

    onFilterNode(val, data) {
      if (!val) return true;
      return data.label.toLocaleLowerCase().includes(val.toLocaleLowerCase());
    },

    renderTreeIcon(h, { node, data }) {
      const result = [];

      if (node.isLeaf) {
        const icon =
          findValue(FILETYPE, data.id, "value", "icon") || "el-icon-delete";

        result.push(
          h("el-icon", {
            class: icon
          })
        );
      } else {
        result.push(
          h("el-icon", {
            class: "el-icon-files"
          })
        );
      }

      return result;
    },

    renderTreeLabel(h, { node, data }) {
      const result = [];
      result.push(data.label);

      if (node.isLeaf) {
        result.push(data.id);
      }

      return result;
    },

    renderContent(h, props) {
      return h(
        "span",
        {
          class: "tree-task-tree"
        },
        [...this.renderTreeIcon(h, props), ...this.renderTreeLabel(h, props)]
      );
    }
  }
};
</script>
