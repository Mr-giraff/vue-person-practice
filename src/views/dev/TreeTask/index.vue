<template>
  <div class="tree-task">
    <search-toolbar @search="onSearch" />
    <base-tree
      ref="tree"
      :data="nodes"
      :filterText="filterText"
      :render-content="renderContent"
    />
  </div>
</template>

<script type="text/jsx">
import { findValue } from "utils/array";
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
      filterText: '',
    };
  },

  methods: {
    onSearch(val) {
      this.filterText = val;
    },

    renderTreeIcon(h, { node, data }) {
      const result = [];

      if (node.isLeaf) {
        const icon =
          findValue(FILETYPE, data.id, "value", "icon") || "el-icon-document";

        result.push(
          h("el-icon", {
            class: icon
          })
        );
      } else {
        result.push(
          h("el-icon", {
            class: node.expanded ? "el-icon-folder-opened" : "el-icon-folder"
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
