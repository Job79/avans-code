import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {provideRouter, RouterLink} from "@angular/router";
import {authRoutes} from "./auth.routes";
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {LoginComponent} from "./login/login.component";

@NgModule({
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterLink,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [LoginComponent],
  providers: [provideRouter(authRoutes)],
  exports: []
})
export class AuthModule {
}
