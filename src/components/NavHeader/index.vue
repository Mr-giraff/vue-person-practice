<template>
  <div class="nav-header">
    <div class="nav-header-left">
      <HeaderLogo class="nav-header-logo" :logo="logo" :title="title" />
      <HeaderMenu class="nav-header-menu" />
    </div>

    <div class="nav-header-right"><HeaderUser class="nav-header-user" /></div>
  </div>
</template>

<script>
import HeaderLogo from "components/GlobalHeader/HeaderLogo";
import HeaderMenu from "components/GlobalHeader/HeaderMenu";
import HeaderUser from "components/GlobalHeader/HeaderUser";

export default {
  components: {
    HeaderLogo,
    HeaderMenu,
    HeaderUser
  },

  props: {
    logo: String,
    title: String
  },

  data() {
    return {};
  }
};
</script>
<style src="./index.less" lang="less" scoped />
