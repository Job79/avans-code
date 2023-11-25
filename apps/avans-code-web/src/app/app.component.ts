import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import {LayoutModule} from "@avans-code/ui/layout";

@Component({
  standalone: true,
  imports: [RouterModule, LayoutModule],
  selector: 'avans-code-root',
  templateUrl: './app.component.html',
})

export class AppComponent {
}
