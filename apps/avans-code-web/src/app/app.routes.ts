import { Route } from '@angular/router';
import {AboutComponent} from "./about/about.component";

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
  },
  {
    path: 'assignments',
    loadChildren: () => import('@avans-code/ui/assignments').then(m => m.AssignmentsModule)
  }
];
