import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ListComponent} from "./list/list.component";
import {provideRouter, RouterLink} from "@angular/router";
import {recommendationsRoutes} from "./recommendations.routes";
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterLink,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [ListComponent],
  providers: [
    provideRouter(recommendationsRoutes)
  ],
  exports: []
})
export class RecommendationsModule {
}
