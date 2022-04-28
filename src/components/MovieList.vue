<template>
  <div class="mt-5">
    <h2>{{label}}</h2>
    <p class="text-center text-white" v-if="value.length === 0">No results, please search a movie</p>
    <div class="cards">
      <movie-card v-for="(movie, index) in value" :value="movie" :key="`${keyPrefix}-${index}`" />
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Model, Prop, Vue} from "vue-property-decorator";
import iMovie from "@/common/Movie.interface";
import MovieCard from "@/components/MovieCard.vue";
@Component({
  components: {MovieCard}
})
export default class MovieList extends Vue {
  @Model() private value!: iMovie[]
  @Prop() private label!: string
  @Prop() private keyPrefix!: string
}
</script>