<template>
  <nav id="nav">
    <router-link to="/">Home</router-link>
    <router-link to="/movie">Movie</router-link>
    <router-link to="/actor">Actor</router-link>
  </nav>
</template>

<style scoped>
#nav{
  width: 100%;
  height: 70px;
  background: var(--gray);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
}

#nav a {
  text-decoration: none;
  font-weight: bold;
  color: #fff;
}

#nav a.router-link-exact-active {
  color: var(--orange);
}

</style>