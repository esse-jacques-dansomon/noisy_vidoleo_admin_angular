import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DemandOptionListComponent} from "./demand-option-list/demand-option-list.component";

const routes: Routes = [
  {
    path: '',
    component: DemandOptionListComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DemandOptionRoutingModule { }
