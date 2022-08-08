import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SubCategoryListComponent} from "./sub-category-list/sub-category-list.component";

const routes: Routes = [
  {
    path: '',
    component: SubCategoryListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubCategoryRoutingModule { }
