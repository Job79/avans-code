import { Route } from '@angular/router';
import {UsersListComponent} from "./users-list/users-list.component";

export const userRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    component: UsersListComponent
  }
];
