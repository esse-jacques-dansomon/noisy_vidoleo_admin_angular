import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DemandeListComponent} from "./demande-list/demande-list.component";

const routes: Routes = [
  {
    path: '',
    component : DemandeListComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DemandesRoutingModule { }
