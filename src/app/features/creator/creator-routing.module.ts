import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CreatorListComponent} from "./creator-list/creator-list.component";

const routes: Routes = [
  {
    path: '',
    component: CreatorListComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreatorRoutingModule { }
