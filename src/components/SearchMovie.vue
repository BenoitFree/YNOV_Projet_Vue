<template>
  <div class="search-movie">
    <div class="row">
      <div class="col-6">
        <label for="name">Name</label>
        <b-form-input id="name" v-model="search.name" @input="updateName" placeholder="Doctor Strange, Uncharted, ..." class="mb-2"></b-form-input>
      </div>
      <div class="col-6">
        <label for="genre">Genre</label>
        <b-form-select id="genre" v-model="search.genre" @change="updateFilters" :options="genreOptions" class="mb-2 form-control"></b-form-select>
      </div>
    </div>
    <div class="row">
      <div class="col-6">
        <label for="dateGte">Date between</label>
        <b-form-datepicker id="dateGte" v-model="search.releaseDateGte" nav-button-variant="secondary" close-button class="mb-2" @input="updateFilters"></b-form-datepicker>
      </div>
      <div class="col-6">
        <label for="dateLte">And</label>
        <b-form-datepicker id="dateLte" v-model="search.releaseDateLte" close-button today-button dark class="mb-2" @input="updateFilters"></b-form-datepicker>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import axios from "axios";
import iMovie from "@/common/Movie.interface";

@Component
export default class MovieCard extends Vue {
  private search = {
    name: '',
    genre: '',
    releaseDateGte: '',
    releaseDateLte: '',
  }
  private genres: {id: number, name: string}[] = []
  private filterSearchResults: any[] = []
  private genreOptions: {value: any, text: string}[] = []

  get advancedSearch(): boolean {
    return this.search.genre != '' ||
        this.search.releaseDateGte != '' ||
        this.search.releaseDateLte != '';
  }

  async mounted(): Promise<void> {
    const {data} = await axios.get(`${process.env.VUE_APP_API_URL}genre/movie/list?api_key=${process.env.VUE_APP_API_KEY}`)
    this.genreOptions = data.genres.map((genre: {id: number, name: string}) => {
      return {
        value: genre.id,
        text: genre.name
      }
    });
    this.genreOptions.unshift({
      value: '',
      text: '- Select an option -'
    })
  }

  async updateName(): Promise<void> {
    let results: any[];
    if (!this.advancedSearch) {
      results = await this.searchByNameOnly();
    } else {
      results = this.filterResultsByName();
    }

    this.emitMovies(results);
  }

  async updateFilters(): Promise<void> {
    if (!this.advancedSearch) return;
    await this.searchByFilters();

    let results: any[];
    if (this.search.name.trim() != '') {
      results = this.filterResultsByName();
    } else {
      results = this.filterSearchResults;
    }

    this.emitMovies(results);
  }

  emitMovies(apiResults: any[]): void {
    const movies: iMovie[] = []
    for (const result of apiResults) {
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
    }
    this.$emit("search", movies)
  }

  private async searchByNameOnly(): Promise<any[]> {
    if(this.search.name.length <= 2){
      return [];
    }

    const {data} = await axios.get(`${process.env.VUE_APP_API_URL}search/movie?api_key=${process.env.VUE_APP_API_KEY}&query=${this.search.name}&include_adult=false`)
    return data.results;
  }

  private async searchByFilters(): Promise<void> {
    let url = `${process.env.VUE_APP_API_URL}discover/movie?api_key=${process.env.VUE_APP_API_KEY}&include_adult=false`;
    if (this.search.genre != '') {
      url += `&with_genres=${this.search.genre}`
    }
    if (this.search.releaseDateLte != '') {
      url += `&primary_release_date.lte=${this.search.releaseDateLte}`
    }
    if (this.search.releaseDateGte != '') {
      url += `&primary_release_date.gte=${this.search.releaseDateGte}`
    }

    const {data} = await axios.get(url)
    this.filterSearchResults = data.results;
  }

  private filterResultsByName(): any[] {
    const results: any[] = [];
    for (const result of this.filterSearchResults) {
      if (result.original_title.toLowerCase().includes(this.search.name.trim().toLowerCase())) {
        results.push(result);
      }
    }
    return results;
  }
}
</script>

<style scoped>

</style>
