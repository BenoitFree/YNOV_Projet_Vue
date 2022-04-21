<template>
  <div class="card" @click="navigateToMovie">
    <p>{{ value.name }}</p>
    <p>{{ value.description }}</p>
  </div>
</template>

<script lang="ts">
import { Component, Model, Vue } from 'vue-property-decorator';
import iMovie from "@/common/Movie.interface";

@Component
export default class MovieCard extends Vue {
    @Model() private value!: iMovie;
    navigateToMovie(){
      this.$router.push({
        name: "Movie",
        params: {
          id: this.value.id.toString()
        }
      })
    }
}
</script>

<style scoped>
  .card{
    display: flex;
    flex-direction: column;
    padding: 1rem;
    border: 1px solid #000;
    flex: 1;
    max-width: 250px;
    width: 100%;
    max-height: 350px;
    margin: 0 auto;
    overflow: hidden;
    background: #fff;

  }
</style>
