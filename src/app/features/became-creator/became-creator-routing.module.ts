import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BecameCreatorListComponent} from "./became-creator-list/became-creator-list.component";

const routes: Routes = [
  {
    path: '',
    component : BecameCreatorListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BecameCreatorRoutingModule { }
