<template>
  <v-card
    class="movie-card rounded-6 border-card"
    width="295px"
    height="195px"
    color="#f1f1f1"
    flat
    @click="changePage(movieDetail)"
  >
    <div class="d-flex flex-row">
      <img
        class="image-card"
        style="border-radius: 6px 0 0 6px"
        width="128px"
        height="194px"
        :src="
          movieDetail && movieDetail.poster_path
            ? 'https://www.themoviedb.org/t/p/original/' +
              movieDetail.poster_path
            : ''
        "
        alt="movie-banner"
      />

      <div class="d-flex flex-column justify-space-between pt-4 mx-3">
        <div class="movie-name">
          {{ movieDetail && movieDetail.title ? movieDetail.title : "-" }}
        </div>
        <div class="d-flex flex-column">
          <div class="movie-date font-12 pb-3">
            <v-icon class="pr-1" color="black" small>mdi-calendar-blank</v-icon>
            {{
              movieDetail && movieDetail.release_date
                ? movieDetail.release_date
                : "-"
            }}
          </div>
          <div class="movie-category font-12 pr-2">drama</div>

          <div class="movie-rating font-12 pb-2">
            <v-rating
              readonly
              length="5"
              half-increments
              size="16"
              :value="movieDetail.vote_average / 2"
            ></v-rating>
          </div>
        </div>
      </div>
    </div>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "nuxt-property-decorator";

//functionality

@Component({
  components: {},
  filters: {},
})
export default class movieCard extends Vue {
  @Prop() movieDetail!: any;

  //*functions
  private changePage(i: any) {
    this.$router.push({
      name: "movie-id",
      params: { id: i.id ? i.id.toString() : "" },
    });
  }
}
</script>

<style lang="scss">
.movie-card {
  .image-card {
    padding: 2px;
  }
  .movie-name {
    font-weight: 700;
  }
  .movie-category {
    color: #505050;
  }
}
</style>
