<template>
  <nav id="nav" class="position-sticky top-0 z-100 shadow">
    <div>
    </div>
    <div class="d-flex gap-4">
      <router-link to="/">Home</router-link>
      <a href="https://developers.themoviedb.org/3" target="_blank">
        Documentation
      </a>
    </div>
    <div></div>
  </nav>
</template>

<style scoped>
#nav{
  width: 100%;
  height: 70px;
  background: var(--dark);
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  gap: 2rem;
  z-index: 100;
}

#nav a {
  text-decoration: none;
  color: var(--orange);
}

#nav a.router-link-exact-active {
  color: var(--orange);
  font-weight: bold;

}

.logo{
  width: 40px;
  object-fit: cover;
}

</style>