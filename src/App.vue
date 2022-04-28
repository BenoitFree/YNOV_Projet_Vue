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
  min-height: 100vh;
  background-color: var(--dark) !important;
}

:root {
  --dark: #060d17;
  --dark_light: #2A0944;
  --gray: #1A1A2E;
  --orange: #ECB365;
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

.card{
  border-color: var(--orange) !important;
}

</style>
<script>
import Header from "@/components/Header";
export default {
  components: {Header}
}
</script>