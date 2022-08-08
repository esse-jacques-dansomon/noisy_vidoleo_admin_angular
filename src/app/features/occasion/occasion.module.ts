import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OccasionRoutingModule } from './occasion-routing.module';
import { OccasionListComponent } from './occasion-list/occasion-list.component';
import {SharedModule} from "../../shared/shared.module";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    OccasionListComponent
  ],
  imports: [
    CommonModule,
    OccasionRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class OccasionModule { }
