<template>
  <t-row>
    <t-col>
      <router-view/>
    </t-col>
  </t-row>
</template>

<script setup lang="ts">
// document.documentElement.setAttribute('theme-mode', 'dark');
</script>


<style lang="scss">
body{
  padding: 0px;
  margin: 0px;
  font-weight: bold;
}
a{
  text-decoration: none;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  //text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
