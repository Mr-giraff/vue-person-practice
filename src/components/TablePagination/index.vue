<template>
  <div class="table-pagination">
    <el-table v-bind="$attrs" v-on="$listeners">
      <el-table-column v-for="item in columns" :key="item.prop" v-bind="item" />
    </el-table>

    <div class="table-pagination-footer" v-if="pagination">
      <el-pagination
        :current-page="1"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="10"
        :total="100"
        layout="total, sizes, prev, pager, next, jumper"
        v-bind="pagination"
        v-on="$listeners"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    columns: Array,
    pagination: [Boolean, Object]
  }
};
</script>
