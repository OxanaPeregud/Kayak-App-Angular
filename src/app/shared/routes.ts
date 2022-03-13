import {Routes} from "@angular/router";
import {HomeComponent} from "../home/home.component";
import {RaftingInfoComponent} from "../rafting-info/rafting-info.component";

export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'rafting-info/:id',
    component: RaftingInfoComponent
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];
