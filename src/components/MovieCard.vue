<template>
  <div class="card" v-b-hover="handleHover" @click="navigateToMovie">
    <div class="card--header h-100" v-if="!isHovered">
      <img :src="'https://image.tmdb.org/t/p/w500/'+value.imagePath" />
    </div>
    <div class="card--hover p-4" v-if="isHovered">
      <h2>{{ value.name }}</h2>
      <p>{{ value.description }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Model, Prop, Vue } from 'vue-property-decorator';
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
    @Prop() isHovered!: boolean
    handleHover(hovered: boolean) {
      this.isHovered = hovered
    }
}
</script>

<style scoped>
  .card{
    display: flex;
    flex-direction: column;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    flex: 1;
    max-width: 290px;
    width: 100%;
    height: 450px;
    max-height: 450px;
    margin: 0;
    overflow: hidden;
    background: #fff;
    cursor: pointer;
    transform-origin: center;
    transition: transform 200ms ease-in;
  }
  .card:hover{
    transform: scale(1.01);
  }
  p{
    display: -webkit-box;
    overflow : hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 11;
    -webkit-box-orient: vertical;
  }
  .card--header img{
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
  .card--hover h2{
    font-size: 24px;
    color: var(--gray);
    line-height: 1;
  }
</style>
