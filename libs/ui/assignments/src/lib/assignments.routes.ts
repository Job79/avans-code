import { Route } from '@angular/router';
import {ListComponent} from "./list/list.component";
import {DetailsComponent} from "./details/details.component";
import {EditComponent} from "./edit/edit.component";
import {IsLoggedIn} from "@avans-code/ui/auth";

export const assignmentRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    component: ListComponent,
  },
  {
    path: 'create',
    pathMatch: 'full',
    component: EditComponent,
    canActivate: [IsLoggedIn]
  },
  {
    path: ':id/edit',
    pathMatch: 'full',
    component: EditComponent,
    canActivate: [IsLoggedIn]
  },
  {
    path: ':id',
    pathMatch: 'full',
    component: DetailsComponent
  }
];
