<template>
  <div class="home">
    <h1>Search</h1>
    <search-movie @search="searchMovies"/>
    <div class="mt-5">
      <h1>Results</h1>
      <p class="text-center text-white" v-if="movies.length === 0">No results</p>
      <div class="cards">
        <movie-card v-for="(movie, index) in movies" :value="movie" :key="index" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import MovieCard from "@/components/MovieCard.vue";
import SearchMovie from "@/components/SearchMovie.vue";
import iMovie from "@/common/Movie.interface";

@Component({
  components: {
    SearchMovie,
    MovieCard
  },
})
export default class Home extends Vue {
  private movies: iMovie[] = []
  searchMovies(movies: iMovie[]): void{
    this.movies = movies
  }
}
</script>


<style scoped>
  h1{
    color: var(--orange);
  }
</style>