<template>
  <div class="content-layout">
    <div class="content-layout-header" v-if="$slots.header">
      <slot name="header" />
    </div>

    <div class="content-layout-main">
      <div class="content-layout-shop" v-if="$slots.actions || $slots.search">
        <div class="content-layout-actions">
          <slot name="actions" />
        </div>

        <div class="content-layout-search">
          <slot name="search" />
        </div>
      </div>

      <slot />
    </div>
  </div>
</template>

<style src="./index.less" lang="less" scoped></style>
