<template>
  <div class="">
    {{movie.original_title}}
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import axios from "axios";

@Component({
  components: {

  },
})
export default class Movie extends Vue {
  private movie: any = null
  async mounted(): Promise<void>{
    const {data} = await axios.get(`${process.env.VUE_APP_API_URL}movie/${this.$route.params.id}?api_key=${process.env.VUE_APP_API_KEY}`)
    this.movie = data
  }
}
</script>


<style scoped>

</style>