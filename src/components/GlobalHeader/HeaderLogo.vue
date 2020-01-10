<template>
  <div v-if="logo || title">
    <img :src="logo" alt="logo" />
    <h1 v-if="title">{{ title }}</h1>
  </div>
</template>

<script>
export default {
  props: {
    logo: String,
    title: String
  }
};
</script>

<style scoped>
img {
  width: 32px;
  vertical-align: middle;
}
h1 {
  display: inline-block;
  margin: 0 0 0 12px;
}
</style>
