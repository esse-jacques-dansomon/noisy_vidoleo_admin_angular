import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RetraitListComponent} from "./retrait-list/retrait-list.component";

const routes: Routes = [
  {
    path: '',
    component : RetraitListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RetraitsRoutingModule { }
