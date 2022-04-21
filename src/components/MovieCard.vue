<template>
  <div class="card" @click="navigateToMovie">
    <p>{{ value.name }}</p>
    <p class="limit">{{ value.description }}</p>
  </div>
</template>

<script lang="ts">
import { Component, Model, Vue } from 'vue-property-decorator';
import iMovie from "@/common/Movie.interface";

@Component
export default class MovieCard extends Vue {
    @Model() private value!: iMovie;
    navigateToMovie(){
      this.$router.push({
        name: "Movie",
        params: {
          id: this.value.id.toString()
        }
      })
    }
}
</script>

<style scoped>
  .card{
    display: flex;
    flex-direction: column;
    padding: 1rem;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    flex: 1;
    max-width: 290px;
    width: 100%;
    height: 250px;
    max-height: 250px;
    margin: 0;
    overflow: hidden;
    background: #fff;
    cursor: pointer;
    transform-origin: center;
    transition: transform 200ms ease-in;
  }
  .card:hover{
    transform: scale(1.02);
  }
  p{
    display: -webkit-box;
    overflow : hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 6;
    -webkit-box-orient: vertical;
  }
</style>
