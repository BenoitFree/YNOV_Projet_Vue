<template>
  <div class="home">
    <h1 class="text-center text-white text-uppercase">Ynov movie database</h1>
    <h2>Search</h2>
    <search-movie @search="searchMovies"/>
    <movie-list :value="movies" label="Results" key-prefix="movie" />
    <movie-list :value="popular" label="Popular movies" key-prefix="popular" />
    <movie-list :value="upComing" label="Up coming" key-prefix="coming" />
  </div>
</template>

<script lang="ts">
import axios from "axios";
import { Component, Vue } from 'vue-property-decorator';
import MovieCard from "@/components/MovieCard.vue";
import SearchMovie from "@/components/SearchMovie.vue";
import iMovie from "@/common/Movie.interface";
import MovieList from "@/components/MovieList.vue";

@Component({
  components: {
    MovieList,
    SearchMovie,
    MovieCard
  },
})
export default class Home extends Vue {
  private movies: iMovie[] = []
  private popular: iMovie[] = []
  private upComing: iMovie[] = []
  searchMovies(movies: iMovie[]): void{
    this.movies = movies
  }
  async fetchPopular() {
    const {data} = await axios.get(`${process.env.VUE_APP_API_URL}movie/popular?api_key=${process.env.VUE_APP_API_KEY}`)
    return data.results
  }
  async fetchUpComing() {
    const {data} = await axios.get(`${process.env.VUE_APP_API_URL}movie/upcoming?api_key=${process.env.VUE_APP_API_KEY}&region=FR`)
    return data.results
  }
  mapToMovies(apiResult: any[]): iMovie[]{
    const movies: iMovie[] = []
    let counter = 0
    for (const result of apiResult) {
      if (counter > 3) break
      movies.push({
        id: result.id,
        name: result.original_title,
        description: result.overview,
        genres: [],
        imagePath: result.poster_path,
        releaseDate: result.release_date,
        voteCount: result.vote_count,
        voteAverage: result.vote_average
      })
      counter++
    }
    return movies
  }
  async mounted() {
    this.popular = this.mapToMovies(await this.fetchPopular())
    this.upComing = this.mapToMovies(await this.fetchUpComing())
  }
}
</script>


<style scoped>
  h1{
    color: var(--orange);
  }
</style>