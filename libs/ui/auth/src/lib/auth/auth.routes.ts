import { Route } from '@angular/router';
import {LoginComponent} from "./login/login.component";

export const authRoutes: Route[] = [
  {
    path: 'login',
    pathMatch: 'full',
    component: LoginComponent
  }
];
