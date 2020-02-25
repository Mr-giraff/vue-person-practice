<template>
  <div class="table-row-action">
    <template v-for="item in actions">
      <el-dropdown v-if="item.children" :key="item.action" @command="onAction">
        <el-button
          type="text"
          v-bind="item"
          :disabled="item.disabled && item.disabled(row)"
        >
          {{ item.label }}
        </el-button>

        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            v-for="item in item.children"
            :key="item.action"
            :icon="item.icon"
            :command="item.action"
            :disabled="item.disabled(row)"
          >
            {{ item.label }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

      <el-button
        v-else
        type="text"
        v-bind="item"
        :key="item.action"
        :disabled="item.disabled(row)"
        @click="onAction(item.action)"
      >
        {{ item.label }}
      </el-button>
    </template>
  </div>
</template>

<script>
export default {
  name: "TableRowAction",

  inheritAttrs: false,

  props: {
    actions: Array,
    row: Object
  },

  methods: {
    onAction(action) {
      this.$emit("action", action, this.row);
    }
  }
};
</script>
