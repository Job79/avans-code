import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {HttpClientModule} from "@angular/common/http";
import {AboutComponent} from "./about/about.component";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";

@NgModule({
  imports: [CommonModule, HttpClientModule, FaIconComponent, NgOptimizedImage],
  declarations: [AboutComponent],
  providers: [],
  exports: [
    AboutComponent
  ]
})
export class FeaturesModule {
}
