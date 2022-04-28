<template>
  <div class="movie" v-if="actor">
    <div class="movie-header mb-5 pb-5">
      <div class="movie--info">
        <div class="info--title">
          <h1>{{actor.name}}</h1>
        </div>
        <b-list-group>
          <b-list-group-item v-if="actor.gender" class="d-flex justify-content-start gap-4 align-items-center">
            <b-icon icon="person-bounding-box" variant="secondary"></b-icon>
            <span v-if="actor.gender === 1">Genre : Female</span>
            <span v-if="actor.gender === 2">Genre : Male</span>
            <span v-if="actor.gender === 3">Genre : Trans</span>
          </b-list-group-item><b-list-group-item class="d-flex justify-content-start gap-4 align-items-center">
            <b-icon icon="calendar2-check" variant="secondary"></b-icon>
            Birthday : {{actor.birthday}}
          </b-list-group-item>
          <b-list-group-item class="d-flex justify-content-start gap-4 align-items-center">
            <b-icon icon="file-person" variant="secondary"></b-icon>
            Age : {{age}} years old
          </b-list-group-item>
          <b-list-group-item v-if="actor.deathday" class="d-flex justify-content-start gap-4 align-items-center">
            <b-icon icon="calendar2-x-fill" variant="secondary"></b-icon>
            Deathday : {{actor.deathday}}
          </b-list-group-item>
        </b-list-group>
        <b-list-group class="mt-4" v-if="actor.biography">
          <b-list-group-item>
            <b-button v-b-toggle.collapse-1 variant="dark">Show biography of {{actor.name}}</b-button>
            <b-collapse id="collapse-1" class="mt-2">
              {{actor.biography}}
            </b-collapse>
          </b-list-group-item>
        </b-list-group>
      </div>
      <div class="movie--poster">
        <img v-if="actor.imagePath" :src="'https://image.tmdb.org/t/p/w500/'+actor.imagePath" />
      </div>
    </div>
    <!-- Films dans lesquels il est présent -->
    <div class="mt-5 pb-5 row justify-content-center">
      <h2 class="text-center py-5">Movies</h2>
      <div class="cards">
        <movie-card v-for="(similar, index) in actor.movies" :key="'movie'+ index" :value="similar" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Vue, Watch} from 'vue-property-decorator';
import axios from "axios";
import iCast, {iMovieCast} from "@/common/Cast.Interface";
import MovieCard from "@/components/MovieCard.vue";

@Component({
  components: {MovieCard}
})

export default class Actor extends Vue {
  private actor: iCast | null = null

  async mounted(): Promise<void>{
    this.updateActor()
  }

  @Watch("$route.params.id")
  onPageIdChange(): void {
    this.updateActor()
  }

  get age(): number | null {
    if (this.actor === null || !this.actor.birthday) return null
    const comparingDate = this.actor.deathday ? new Date(this.actor.deathday) : new Date();
    const birthdate = new Date(this.actor.birthday);
    let age = comparingDate.getFullYear() - birthdate.getFullYear();
    const months = comparingDate.getMonth() - birthdate.getMonth();
    if (months < 0 || (months === 0 && comparingDate.getDate() < birthdate.getDate())) {
      age--;
    }
    return age;
  }

  async getMovies(): Promise<void> {
    if(this.actor === null) return
    const {data} = await axios.get(`${process.env.VUE_APP_API_URL}person/${this.$route.params.id}/movie_credits?api_key=${process.env.VUE_APP_API_KEY}&language=en-US`)
    const movies: iMovieCast[] = []
    for (const movie of data.cast) {
      movies.push({
        id: movie.id,
        character: movie.character,
        name: movie.title,
        description: movie.overview,
        genres: [],
        releaseDate: movie.release_date,
        voteCount: movie.vote_counte,
        voteAverage: movie.vote_average,
        imagePath: movie.poster_path
      })
    }
    Vue.set(this.actor, "movies", movies)
  }

  async updateActor(): Promise<void> {
    let {data} = await axios.get(`${process.env.VUE_APP_API_URL}person/${this.$route.params.id}?api_key=${process.env.VUE_APP_API_KEY}&language=en-US`)
    this.actor = {
      id: data.id,
      name: data.name,
      imagePath: data.profile_path,
      birthday: data.birthday,
      deathday: data.deathday,
      gender: data.gender,
      biography: data.biography
    }
    this.getMovies()
    scroll(0, 0)
  }
}
</script>