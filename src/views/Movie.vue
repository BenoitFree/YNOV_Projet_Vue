<template>
  <div class="movie" v-if="movie">
    <div class="movie-header mb-5 pb-5">
      <div class="movie--info">
        <div class="info--title">
          <h1>{{movie.name}}</h1>
        </div>
        <b-list-group>
          <b-list-group-item class="d-flex justify-content-start gap-4 align-items-center">
            <b-icon icon="calendar" variant="secondary"></b-icon>
            Release date : {{movie.releaseDate}}
          </b-list-group-item>
          <b-list-group-item class="d-flex justify-content-start gap-4 align-items-center">
            <b-icon icon="tv" variant="secondary"></b-icon>
            Status : {{movie.status}}
          </b-list-group-item>
          <b-list-group-item class="d-flex justify-content-start gap-4 align-items-center">
            <b-icon icon="star" variant="secondary"></b-icon>
            Note : {{movie.voteAverage}}
          </b-list-group-item>
          <b-list-group-item class="d-flex justify-content-start gap-4 align-items-center">
            <b-icon icon="arrow-up-right" variant="secondary"></b-icon>
            Positif vote by viewer : {{movie.voteCount}}
          </b-list-group-item>
          <b-list-group-item v-if="movie.description" class="d-flex justify-content-start gap-4 align-items-start">
            <b-icon icon="card-text" variant="secondary"></b-icon>
            {{movie.description}}
          </b-list-group-item>
        </b-list-group>
      </div>
      <div class="movie--poster">
        <img v-if="movie.imagePath" :src="'https://image.tmdb.org/t/p/w500/'+movie.imagePath" />
      </div>
    </div>
    <!-- Bande annonce -->
    <div class="mt-5 pb-5 row justify-content-center">
      <h2 class="text-center py-5">Trailer</h2>
      <div class="d-flex flex-row justify-content-center gap-4">
        <div class="p-0 m-0" v-for="(video, index) in movie.videos" :key="'C'+ index">
          <b-embed type="iframe" width="560" height="315" :src="'https://www.youtube.com/embed/'+video" title="YouTube video player" frameborder="0" allowfullscreen></b-embed>
        </div>
      </div>
    </div>
    <!-- Films similaires -->
    <div class="mt-5 pb-5 row justify-content-center" v-if="movie.similars.length != 0">
      <h2 class="text-center py-5">Recommended movie</h2>
      <div class="cards">
        <movie-card v-for="(similar, index) in movie.similars" :key="'similar'+ index" :value="similar" />
      </div>
    </div>
    <!-- Casting -->
    <div class="mt-5 pb-5 justify-content-center">
      <h2 class="text-center py-5">Casting</h2>
      <div class="d-grid">
        <b-row>
          <b-col cols="2" class="mb-4" v-for="(cast, index) in movie.cast" :key="'cast'+ index" @click="navigateToCast(cast.id)">
            <div role="button" class="d-flex flex-column justify-content-center align-items-center pointer-event">
              <img class="h-100 w-100" style="object-fit: cover" v-if="cast.imagePath" :src="'https://image.tmdb.org/t/p/w200/'+cast.imagePath" />
              <b class="text-white" v-if="cast.name">{{cast.name}}</b>
              <p class="text-white text-center" v-if="cast.character">{{cast.character}}</p>
            </div>
          </b-col>
        </b-row>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Vue, Watch} from 'vue-property-decorator';
import axios from "axios";
import iMovie from "@/common/Movie.interface";
import iCast from "@/common/Cast.Interface";
import MovieCard from "@/components/MovieCard.vue";

@Component({
  components: {MovieCard}
})

export default class Movie extends Vue {
  private movie: iMovie | null = null
  async getCredits(): Promise<void>{
    if(this.movie === null) return
    const {data} = await axios.get(`${process.env.VUE_APP_API_URL}movie/${this.$route.params.id}/credits?api_key=${process.env.VUE_APP_API_KEY}`)
    const listCast: iCast[] = []
    for (const castElement of data.cast) {
      if(castElement.known_for_department != "Acting" || castElement.profile_path === null) continue
      listCast.push({
        id: castElement.id,
        name: castElement.name,
        imagePath: castElement.profile_path,
        character: castElement.character
      })
    }
    Vue.set(this.movie, "cast", listCast)
  }

  async getVideos(): Promise<void>{
    if(this.movie === null) return
    const {data} = await axios.get(`${process.env.VUE_APP_API_URL}movie/${this.$route.params.id}/videos?api_key=${process.env.VUE_APP_API_KEY}`)
    const videoKeys: string[] = []
    let counter = 0
    for (const video of data.results) {
      if(counter > 1) break
      if(video.type != "Trailer" && !video.official) continue
      videoKeys.push(video.key)
      counter++
    }
    Vue.set(this.movie, "videos", videoKeys)
  }

  async getSimilarMovie(): Promise<void>{
    if(this.movie === null) return
    const {data} = await axios.get(`${process.env.VUE_APP_API_URL}movie/${this.$route.params.id}/recommendations?api_key=${process.env.VUE_APP_API_KEY}`)
    const similars: iMovie[] = []
    let counter = 0
    for (const similar of data.results) {
      if(counter > 3) break
      similars.push({
        id: similar.id,
        name: similar.original_title,
        description: similar.overview,
        genres: [],
        imagePath: similar.poster_path,
        releaseDate: similar.release_date,
        voteCount: similar.vote_count,
        voteAverage: similar.vote_average
      })
      counter++
    }
    Vue.set(this.movie, "similars", similars)
  }

  @Watch("$route.params.id")
  onPageIdChange(){
    this.updateMovie()
  }

  async updateMovie(){
    let {data} = await axios.get(`${process.env.VUE_APP_API_URL}movie/${this.$route.params.id}?api_key=${process.env.VUE_APP_API_KEY}`)
    this.movie = {
      id: data.id,
      name: data.original_title,
      description: data.overview,
      genres: [],
      imagePath: data.poster_path,
      releaseDate: data.release_date,
      voteCount: data.vote_count,
      voteAverage: data.vote_average,
      status: data.status
    }
    this.getCredits()
    this.getVideos()
    this.getSimilarMovie()
    scroll(0, 0)
  }

  async mounted(): Promise<void> {
    this.updateMovie()
  }

  navigateToCast(castId: number): void {
    this.$router.push({
      name: "Actor",
      params: {
        id: castId.toString()
      }
    })
  }
}
</script>