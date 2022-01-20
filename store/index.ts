import { Module, VuexModule, Mutation } from "vuex-module-decorators";
import { categoryModel } from "~/models/APi/category.model";

@Module({ namespaced: false, name: "general", stateFactory: false })
export default class GeneralModule extends VuexModule {
  public snackbar: boolean = false;
  public text: string = "";
  public color: string = "";
  public category: categoryModel[] = [];
  public token: string = "f62f750b70a8ef11dad44670cfb6aa57";

  @Mutation
  public toggleSnackbar(status: boolean) {
    this.snackbar = status;
  }
  @Mutation
  public setSnackbarColor(color: string) {
    this.color = color;
  }
  @Mutation
  public setSnackbarText(text: string) {
    this.text = text;
  }
  @Mutation
  public setCategory(category: any) {
    this.category = category;
  }

  //*getters
  public get Token() {
    return this.token;
  }
  public get snackbarStatus() {
    return this.snackbar;
  }
  public get snackbarColor() {
    return this.color;
  }
  public get snackbarText() {
    return this.text;
  }
  public get categoryList() {
    return this.category;
  }
}
