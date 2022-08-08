import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProfileComponent} from "./profile/profile.component";
import {StatistiqueComponent} from "./statistique/statistique.component";

const routes: Routes = [
  {
    path: '',
    component : ProfileComponent,
  },
  {
    path : 'statistiques',
    component : StatistiqueComponent
  }
  ]

;

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
