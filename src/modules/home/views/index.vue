<template>
  <div>
    <router-link v-for="item in links" :key="item" :to="item" tag="div">
      {{ item }}
    </router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      links: ["dev", "dashboard"]
    };
  }
};
</script>
