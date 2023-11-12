import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from "@angular/common/http";
import {UsersListComponent} from "./users-list/users-list.component";
import {provideRouter} from "@angular/router";
import {userRoutes} from "./users.routes";

@NgModule({
  imports: [CommonModule, HttpClientModule],
  declarations: [UsersListComponent],
  providers: [provideRouter(userRoutes)],
  exports: [
    UsersListComponent
  ]
})
export class UsersModule {
}
