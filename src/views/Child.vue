<template>
  <div>{{ msg }}</div>
</template>

<script>
export default {
  computed: {
    msg() {
      return this.$route.params.id ? this.$route.params.id : "hello";
    }
  }
};
</script>
