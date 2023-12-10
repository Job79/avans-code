import { Route } from '@angular/router';
import {ListComponent} from "./list/list.component";
import {IsLoggedIn} from "@avans-code/ui/auth";

export const recommendationsRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    component: ListComponent,
    canActivate: [IsLoggedIn]
  }
];
