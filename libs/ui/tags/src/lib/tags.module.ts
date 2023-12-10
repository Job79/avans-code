import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ListComponent} from "./list/list.component";
import {provideRouter, RouterLink} from "@angular/router";
import {userRoutes} from "./tags.routes";
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {DetailsComponent} from "./details/details.component";
import {EditComponent} from "./edit/edit.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterLink,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [ListComponent, DetailsComponent, EditComponent],
  providers: [provideRouter(userRoutes)],
  exports: []
})
export class TagsModule {
}
