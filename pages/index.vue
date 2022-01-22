<template>
  <div class="movie-list full-width full-height">
    <v-row>
      <v-col cols="6" offset="3">
        <v-card
          class="rounded-6 mt-12 border-card"
          height="85px"
          width="100%"
          color="#c4c4c4"
          flat
        >
          <div class="d-flex flex-row align-center full-width full-height">
            <div
              style="padding-left: 6vmin"
              class="search-field d-flex flex-row"
            >
              <div class="pt-2 pr-7">Search by release date:</div>
              <div><v-text-field hide-details dense flat solo /></div>
            </div>
            <v-spacer />
            <v-btn
              style="margin-right: 7vmin; border-radius: 100px"
              color="#549DF2"
              depressed
              dark
              >search</v-btn
            >
          </div>
        </v-card>

        <div class="movie">
          <v-row>
            <v-col cols="4" v-for="(item, index) in movieItem" :key="index">
              <movie-card :movieDetail="movieItem[index]" />
            </v-col>
          </v-row>
        </div>

        <div class="d-flex flex-row full-width justify-center">
          <v-btn :disabled="prevousValidation" text @click="previousPage"
            >previous page</v-btn
          >
          <v-divider class="mx-8" vertical />
          <v-btn text @click="nextPage">next page</v-btn>
        </div>
        <div class="text-center mt-4" style="color: #989898">
          showing result {{ currentPage }} - {{ pageCount }}
        </div>
      </v-col>
    </v-row>
    <Snackbar />
  </div>
</template>

<script lang="ts">
//!default
import { Component, Vue } from "nuxt-property-decorator";

//*store
import { getModule } from "vuex-module-decorators";
import GeneralModule from "~/store/index";

//*components
import movieCard from "~/components/common/MovieCard.vue";
import Snackbar from "~/components/common/Snackbar.vue";

//*models
import { movieModel } from "~/models/APi/movie.model";

@Component({
  components: {
    movieCard,
    Snackbar,
  },
})
export default class Default extends Vue {
  [x: string]: any;
  private generalModule = getModule(GeneralModule, this.$store);

  //*variables
  private movieItem: movieModel[] = [];
  private pageCount: number = 1;
  private currentPage: number = 1;
  private prevousPageButton: boolean = true;
  private nextPageButton: boolean = false;

  //* requests
  private async movieList() {
    try {
      await this.$axios
        .$get(`/discover/movie`, {
          params: {
            api_key: this.generalModule.Token,
            page: this.currentPage,
          },
        })
        .then((response) => {
          this.movieItem = response.results;
          this.pageCount = response.total_pages;
        });
    } catch (e: any) {
      this.generalModule.toggleSnackbar(true);
      this.generalModule.setSnackbarColor("error");
      this.generalModule.setSnackbarText(e.response.data.status_message);
    }
  }

  //*functions
  //pagination
  private nextPage() {
    this.currentPage = this.currentPage + 1;
    this.movieList();
  }
  private previousPage() {
    this.currentPage = this.currentPage - 1;
    this.movieList();
  }

  private get prevousValidation() {
    return this.currentPage <= 1;
  }

  //*lifecycle
  private mounted() {
    this.movieList();
    console.log(this.generalModule.categoryList);
  }
}
</script>

<style lang="scss">
.movie-list {
  .movie {
    margin: 119px 0 161px 0;
  }
}
</style>
