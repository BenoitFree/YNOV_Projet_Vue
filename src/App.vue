<template>
  <div id="app">
    <Header />
    <div id="main" class="container">
      <router-view />
    </div>
  </div>
</template>

<style>
body{
  padding: 0;
  margin: 0;
  background-color: #f0eae2;
}

:root {
  --gray: #323232;
  --orange: #f38019;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#main{
  margin: 0 auto;
  padding-top: 4rem;
  padding-bottom: 4rem;
}

</style>
<script>
import Header from "@/components/Header";
export default {
  components: {Header}
}
</script>