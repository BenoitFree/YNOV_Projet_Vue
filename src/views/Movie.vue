<template>
  <div class="">
    <p>{{movie.name}}</p>
    <p>{{movie.description}}</p>
    <p>{{movie.releaseDate}}</p>
    <p>{{movie.voteCount}}</p>
    <p>{{movie.voteAverage}}</p>
    <p>{{movie.status}}</p>
    <img :src="'https://image.tmdb.org/t/p/w200/'+movie.imagePath" />
    <p>Trailer</p>
    <iframe v-for="(video, index) in movie.videos" :key="index" width="560" height="315" :src="'https://www.youtube.com/embed/'+video" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    <p>Similars movies</p>
    <movie-card v-for="(similar, index) in movie.similars" :key="index" :value="similar" />
    <p>Casting :</p>
    <ul>
      <li v-for="(cast, index) in movie.cast" :key="index">
        {{cast.name}}
        {{cast.character}}
        <img :src="'https://image.tmdb.org/t/p/w200/'+cast.imagePath" />
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
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
      if(castElement.known_for_department != "Acting") continue
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
    for (const video of data.results) {
      if(video.type != "Trailer" && !video.official) continue
      videoKeys.push(video.key)
    }
    Vue.set(this.movie, "videos", videoKeys)
  }

  async getSimilarMovie(): Promise<void>{
    if(this.movie === null) return
    const {data} = await axios.get(`${process.env.VUE_APP_API_URL}movie/${this.$route.params.id}/similar?api_key=${process.env.VUE_APP_API_KEY}`)
    const similars: iMovie[] = []
    let counter = 0
    for (const similar of data.results) {
      if(counter > 2) break
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


  async mounted(): Promise<void>{
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
  }
}
</script>


<style scoped>

</style>