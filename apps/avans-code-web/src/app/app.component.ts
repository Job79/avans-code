import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import {LayoutModule} from "@avans-code/ui/layout";
import {FeaturesModule} from "@avans-code/ui/features";

@Component({
  standalone: true,
  imports: [RouterModule, LayoutModule, FeaturesModule],
  selector: 'avans-code-root',
  templateUrl: './app.component.html',
  styleUrls: [],
})

export class AppComponent {
}
