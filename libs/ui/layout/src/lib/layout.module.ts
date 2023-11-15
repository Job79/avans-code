import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from "@angular/common/http";
import {NavbarComponent} from "./navbar/navbar.component";
import {RouterLink} from "@angular/router";

@NgModule({
  imports: [CommonModule, HttpClientModule, RouterLink],
  declarations: [NavbarComponent],
  providers: [],
  exports: [
    NavbarComponent
  ]
})
export class LayoutModule {
}
