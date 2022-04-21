<template>
  <div>
    <input type="text" v-model="searchName" @input="searchMovies">
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import axios from "axios";
import iMovie from "@/common/Movie.interface";

@Component
export default class MovieCard extends Vue {
  private searchName = ''
  async searchMovies(): void{
    if(this.searchName.length <= 2){
      return;
    }
    const {data} = await axios.get(`${process.env.VUE_APP_API_URL}search/movie?api_key=${process.env.VUE_APP_API_KEY}&query=${this.searchName}&include_adult=false`)
    const movies: iMovie[] = []
    for (const result of data.results) {
      movies.push({
        id: result.id,
        name: result.original_title,
        description: result.overview
      })
    }
    this.$emit("search", movies)
  }
}
</script>

<style scoped>

</style>
