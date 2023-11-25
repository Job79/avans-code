import { Component } from '@angular/core';
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {CommonModule} from "@angular/common";

@Component({
  standalone: true,
  imports: [CommonModule, FaIconComponent],
  selector: 'avans-code-about',
  templateUrl: './about.component.html',
})
export class AboutComponent { }
