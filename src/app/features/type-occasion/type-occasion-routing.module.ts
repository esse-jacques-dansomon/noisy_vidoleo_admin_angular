import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TypeOccasionListComponent} from "./type-occasion-list/type-occasion-list.component";

const routes: Routes = [
  {
    path : '',
    component : TypeOccasionListComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TypeOccasionRoutingModule { }
