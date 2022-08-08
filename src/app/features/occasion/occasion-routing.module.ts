import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {OccasionListComponent} from "./occasion-list/occasion-list.component";

const routes: Routes = [
  {
    path: '',
    component : OccasionListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OccasionRoutingModule { }
