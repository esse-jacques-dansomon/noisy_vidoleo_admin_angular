import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubCategoryRoutingModule } from './sub-category-routing.module';
import { SubCategoryListComponent } from './sub-category-list/sub-category-list.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../../shared/shared.module";


@NgModule({
  declarations: [
    SubCategoryListComponent
  ],
  imports: [
    CommonModule,
    SubCategoryRoutingModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class SubCategoryModule { }
