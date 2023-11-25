import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from "@angular/common/http";
import {NavbarComponent} from "./navbar/navbar.component";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";

@NgModule({
  imports: [CommonModule, HttpClientModule, RouterLink, FontAwesomeModule, RouterLinkActive],
  declarations: [NavbarComponent],
  providers: [],
  exports: [
    NavbarComponent
  ]
})
export class LayoutModule {
}
