import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TypeOccasionRoutingModule } from './type-occasion-routing.module';
import { TypeOccasionListComponent } from './type-occasion-list/type-occasion-list.component';
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    TypeOccasionListComponent
  ],
    imports: [
        CommonModule,
        TypeOccasionRoutingModule,
        ReactiveFormsModule
    ]
})
export class TypeOccasionModule { }
