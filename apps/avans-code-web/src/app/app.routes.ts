import { Route } from '@angular/router';
import {AboutComponent} from "./about/about.component";
import {AuthModule} from "@avans-code/ui/auth";

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'assignments'
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
  },
  {
    path: 'tags',
    loadChildren: () => import('@avans-code/ui/tags').then(m => m.TagsModule)
  },
  {
    path: 'recommendations',
    loadChildren: () => import('@avans-code/ui/recommendations').then(m => m.RecommendationsModule)
  },
  {
    path: 'auth',
    loadChildren: () => AuthModule
  }
];
