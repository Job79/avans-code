import {Component} from '@angular/core';
import { RouterModule } from '@angular/router';
import {LayoutModule} from "@avans-code/ui/layout";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faTriangleExclamation} from "@fortawesome/free-solid-svg-icons";
import {AsyncPipe, NgIf} from "@angular/common";
import {ErrorService} from "./error/error.service";

@Component({
  standalone: true,
  imports: [RouterModule, LayoutModule, FaIconComponent, AsyncPipe, NgIf],
  selector: 'avans-code-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  icon = {
    faTriangleExclamation: faTriangleExclamation
  }
  message$ = this.errorService.message$;

  constructor(private errorService: ErrorService) {
  }
}
