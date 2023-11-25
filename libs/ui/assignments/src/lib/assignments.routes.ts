import { Route } from '@angular/router';
import {ListComponent} from "./list/list.component";
import {DetailsComponent} from "./details/details.component";
import {EditComponent} from "./edit/edit.component";

export const assignmentRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    component: ListComponent
  },
  {
    path: 'create',
    pathMatch: 'full',
    component: EditComponent
  },
  {
    path: ':id/edit',
    pathMatch: 'full',
    component: EditComponent
  },
  {
    path: ':id',
    pathMatch: 'full',
    component: DetailsComponent
  }
];
