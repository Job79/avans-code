import { Route } from '@angular/router';
import {ListComponent} from "./list/list.component";
import {DetailsComponent} from "./details/details.component";
import {EditComponent} from "./edit/edit.component";
import {IsAdmin, IsLoggedIn} from "@avans-code/ui/auth";

export const userRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    component: ListComponent,
    canActivate: [IsLoggedIn, IsAdmin]
  },
  {
    path: 'create',
    pathMatch: 'full',
    component: EditComponent,
    canActivate: [IsLoggedIn, IsAdmin]
  },
  {
    path: ':id/edit',
    pathMatch: 'full',
    component: EditComponent,
    canActivate: [IsLoggedIn, IsAdmin]
  },
  {
    path: ':id',
    pathMatch: 'full',
    component: DetailsComponent,
    canActivate: [IsLoggedIn, IsAdmin]
  }
];
