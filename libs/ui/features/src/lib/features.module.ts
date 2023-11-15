import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from "@angular/common/http";
import {AboutComponent} from "./about/about.component";

@NgModule({
  imports: [CommonModule, HttpClientModule],
  declarations: [AboutComponent],
  providers: [],
  exports: [
    AboutComponent
  ]
})
export class FeaturesModule {
}
