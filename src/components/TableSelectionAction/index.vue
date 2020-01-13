<template>
  <div class="table-selection-action">
    <el-button
      v-for="item in actions"
      v-bind="item"
      :key="item.action"
      :disabled="item.disabled(selections)"
      @click="onAction(item.action)"
    >
      {{ item.label }}
    </el-button>
  </div>
</template>

<script>
export default {
  name: "TableSelectionAction",

  inheritAttrs: false,

  props: {
    actions: Array,
    selections: Array
  },

  methods: {
    onAction(action) {
      this.$emit("action", action);
    }
  }
};
</script>
