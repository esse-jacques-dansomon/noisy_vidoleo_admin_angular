import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubCategoryRoutingModule } from './sub-category-routing.module';
import { SubCategoryListComponent } from './sub-category-list/sub-category-list.component';
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    SubCategoryListComponent
  ],
    imports: [
        CommonModule,
        SubCategoryRoutingModule,
        FormsModule
    ]
})
export class SubCategoryModule { }
