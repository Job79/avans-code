import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ListComponent} from "./list/list.component";
import {provideRouter, RouterLink} from "@angular/router";
import {assignmentRoutes} from "./assignments.routes";
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DetailsComponent} from "./details/details.component";
import {EditComponent} from "./edit/edit.component";

@NgModule({
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterLink,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [ListComponent, DetailsComponent, EditComponent],
  providers: [provideRouter(assignmentRoutes)],
  exports: []
})
export class AssignmentsModule {
}
