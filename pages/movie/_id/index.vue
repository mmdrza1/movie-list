<template>
  <div class="movie-id full-width full-height">
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
            <div class="ml-9">
              <v-btn
                @click="changePage"
                style="border-radius: 100px"
                color="#549DF2"
                depressed
                dark
                ><v-icon>mdi-arrow-left</v-icon>back</v-btn
              >
            </div>
            <div class="d-flex flex-column ml-16">
              <div class="font-18 Weight-700">
                {{ movieItem && movieItem.title ? movieItem.title : "-" }}
              </div>
              <div class="font-18">
                {{ movieItem && movieItem.tagline ? movieItem.tagline : "-" }}
              </div>
            </div>
          </div>
        </v-card>

        <div class="movie-detail d-flex flex-row">
          <img
            class="image-card rounded-12"
            width="330px"
            height="495px"
            :src="
              movieItem && movieItem.poster_path
                ? 'https://www.themoviedb.org/t/p/original/' +
                  movieItem.poster_path
                : ''
            "
            alt="movie-banner"
          />
          <div class="d-flex flex-column full-width ml-16 pt-5">
            <div class="full-width d-flex flex-row justify-space-between">
              <div class="Weight-700">Budget</div>
              <div>
                ${{
                  movieItem && movieItem.budget
                    ? movieItem.budget
                    : "0" | separateNum
                }}
              </div>
            </div>
            <div class="full-width d-flex flex-row justify-space-between mt-5">
              <div class="Weight-700">Revenue</div>
              <div>
                ${{
                  movieItem && movieItem.revenue
                    ? movieItem.revenue
                    : "0" | separateNum
                }}
              </div>
            </div>
            <div class="d-flex flex-row justify-space-between mt-5">
              <div class="Weight-700">Release Date</div>
              <div>
                {{
                  movieItem && movieItem.release_date
                    ? movieItem.release_date
                    : "-"
                }}
              </div>
            </div>
            <div class="d-flex flex-row justify-space-between mt-5">
              <div class="Weight-700">Runtime</div>
              <div>
                {{
                  movieItem && movieItem.runtime
                    ? movieItem.runtime
                    : "-" | convertMinsToHrsMins
                }}
              </div>
            </div>
            <div class="d-flex flex-row justify-space-between mt-5">
              <div class="Weight-700">Score</div>
              <div>
                {{
                  movieItem && movieItem.vote_average
                    ? movieItem.vote_average
                    : "0"
                }}({{
                  movieItem && movieItem.vote_count
                    ? movieItem.vote_count + " " + "votes"
                    : "0"
                }})
              </div>
            </div>
            <div class="d-flex flex-row justify-space-between mt-5">
              <div class="Weight-700">Genres</div>
              <div class="d-flex flex-row">
                <div
                  class="pr-1"
                  v-for="(item, index) in genresMovie"
                  :key="index"
                >
                  {{ item.name }}
                </div>
              </div>
            </div>
            <div class="d-flex flex-row justify-space-between mt-5">
              <div class="Weight-700">IMDB Link</div>
              <div>
                <a
                  :href="'https://www.imdb.com/title/' + movieItem.imdb_id"
                  target="_blank"
                  >link</a
                >
              </div>
            </div>
            <div class="d-flex flex-row justify-space-between mt-5">
              <div class="Weight-700">Homepage Link</div>
              <div><a :href="movieItem.homepage" target="_blank">link</a></div>
            </div>
          </div>
        </div>

        <div class="full-width mt-13">
          {{ movieItem.overview }}
        </div>

        <div class="d-flex flex-column" style="margin-top:80px">
          <div class="font-18 Weight-700 pl-3">Credit:</div>
          <div class="d-flex flex-row">
            <div v-if="movieCredit.length < 15">
              <div v-for="(item, index) in movieCredit" :key="index">
                {{ item.name }}
              </div>
            </div>

            <div class="d-flex flex-row" v-else>
              <div
                v-for="(item, index) in movieCredit.slice(0, 9)"
                :key="index"
                class="font-14 pl-2"
              >
                {{ item.name }}
              </div>
            </div>
          </div>
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

//*functionality
import { separateNum, convertMinsToHrsMins } from "~/helpers/functionality";

@Component({
  components: {
    movieCard,
    Snackbar,
  },
  filters: {
    separateNum,
    convertMinsToHrsMins,
  },
})
export default class Default extends Vue {
  [x: string]: any;
  private generalModule = getModule(GeneralModule, this.$store);

  //*variables
  private movieItem: movieModel[] = [];
  private movieCredit = [];
  private genresMovie = [];

  //* requests
  private async movieDetail() {
    try {
      await this.$axios
        .$get(`/movie/${this.$route.params.id}`, {
          params: {
            api_key: this.generalModule.Token,
          },
        })
        .then((response) => {
          this.movieItem = response;
          this.genresMovie = response.genres;
        });
    } catch (e: any) {
      this.generalModule.toggleSnackbar(true);
      this.generalModule.setSnackbarColor("error");
      this.generalModule.setSnackbarText(e.response.data.status_message);
    }
  }

  private async movieCredits() {
    try {
      await this.$axios
        .$get(`/movie/${this.$route.params.id}/credits`, {
          params: {
            api_key: this.generalModule.Token,
          },
        })
        .then((response) => {
          this.movieCredit = response.cast;
        });
    } catch (e: any) {
      this.generalModule.toggleSnackbar(true);
      this.generalModule.setSnackbarColor("error");
      this.generalModule.setSnackbarText(e.response.data.status_message);
    }
  }

  //*functions
  private changePage() {
    this.$router.push({
      name: "index",
    });
  }

  //*lifecycle
  private mounted() {
    this.movieDetail();
    this.movieCredits();
  }
}
</script>

<style lang="scss">
.movie-id {
  .movie-detail {
    margin-top: 78px;
  }
}
</style>
