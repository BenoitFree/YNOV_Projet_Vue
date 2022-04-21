<template>
  <div class="home">
    <search-movie @search="searchMovies"/>
    <div class="cards">
      <movie-card v-for="(movie, index) in movies" :value="movie" :key="index" />
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


<style>
.cards{
  display: grid;
  margin: 2rem auto;
  width: 100%;
  grid-template-columns: repeat(3, 1fr);
  justify-content: center;
  place-items: center;
  gap: 1rem;
}
@media screen and (max-width: 1200px){
  .cards {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media screen and (max-width: 640px){
  .cards {
    grid-template-columns: repeat(1, 1fr);
  }
}
</style>