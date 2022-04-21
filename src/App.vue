<template>
  <div id="app">
    <Header />
    <div id="main">
      <router-view/>
    </div>
  </div>
</template>

<style>
body{
  padding: 0;
  margin: 0;
  background: #f0eae2;
}

:root {
  --gray: #323232;
  --orange: #f38019;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#main{
  max-width: 1240px;
  width: 100%;
  padding: 1rem 15px;
  margin: 0 auto;
}

</style>
<script>
import Header from "@/components/Header";
export default {
  components: {Header}
}
</script>