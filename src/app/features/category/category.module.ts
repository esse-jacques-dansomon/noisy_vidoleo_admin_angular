import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from './category-routing.module';
import { CategoryListComponent } from './category-list/category-list.component';
import {SharedModule} from "../../shared/shared.module";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    CategoryListComponent
  ],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class CategoryModule { }
