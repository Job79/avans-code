import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {HttpClientModule} from "@angular/common/http";
import {ListComponent} from "./list/list.component";
import {provideRouter, RouterLink} from "@angular/router";
import {userRoutes} from "./users.routes";
import {CardComponent} from "@avans-code/ui/common";
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {DetailsComponent} from "./details/details.component";
import {EditComponent} from "./edit/edit.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    CardComponent,
    FontAwesomeModule,
    RouterLink,
    ReactiveFormsModule,
    FormsModule,
    NgOptimizedImage
  ],
  declarations: [ListComponent, DetailsComponent, EditComponent],
  providers: [provideRouter(userRoutes)],
  exports: []
})
export class UsersModule {
}
