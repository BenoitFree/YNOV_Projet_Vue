<template>
  <div class="">
    <p>{{movie.name}}</p>
    <p>{{movie.description}}</p>
    <p>{{movie.releaseDate}}</p>
    <p>{{movie.voteCount}}</p>
    <p>{{movie.voteAverage}}</p>
    <p>{{movie.status}}</p>
    <img :src="'https://image.tmdb.org/t/p/w200/'+movie.imagePath" />
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

@Component
export default class Movie extends Vue {
  private movie: iMovie | null = null
  async getCredits(movieId: number): Promise<void>{
    if(this.movie === null){
      return
    }
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

  async mounted(): Promise<void>{
    console.log("coucou")
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
    this.getCredits(this.movie.id)
  }
}
</script>


<style scoped>

</style>