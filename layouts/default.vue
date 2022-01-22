<template>
  <v-app dark>
    <v-app-bar color="#11B980" height="48px" fixed app flat> </v-app-bar>
    <v-main>
      <Nuxt />
      <Snackbar />
    </v-main>
  </v-app>
</template>

<script lang="ts">
//!default
import { Vue, Component } from "nuxt-property-decorator";

//*store
import { getModule } from "vuex-module-decorators";
import GeneralModule from "~/store/index";

//*components
import Snackbar from "~/components/common/Snackbar.vue";

//*model

@Component({
  components: {
    Snackbar,
  },
})
export default class Default extends Vue {
  [x: string]: any;
  private generalModule = getModule(GeneralModule, this.$store);

  //* requests
  private async categories() {
    try {
      await this.$axios
        .$get(`/genre/movie/list`, {
          params: {
            api_key: this.generalModule.Token,
          },
        })
        .then((response) => {
          this.generalModule.setCategory(response.genres);
        });
    } catch (e: any) {
      this.generalModule.toggleSnackbar(true);
      this.generalModule.setSnackbarColor("error");
      this.generalModule.setSnackbarText(e.response.data.status_message);
    }
  }

  //*lifecycle
  private created() {
    this.categories();
  }
}
</script>
