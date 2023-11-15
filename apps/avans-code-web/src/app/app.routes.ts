import { Route } from '@angular/router';
import {AboutComponent} from "@avans-code/ui/features";

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'users'
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'users',
    loadChildren: () => import('@avans-code/ui/users').then(m => m.UsersModule)
  }
];
