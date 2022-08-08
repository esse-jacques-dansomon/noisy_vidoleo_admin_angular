import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DemandOptionRoutingModule } from './demand-option-routing.module';
import { DemandOptionListComponent } from './demand-option-list/demand-option-list.component';
import {SharedModule} from "../../shared/shared.module";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    DemandOptionListComponent
  ],
  imports: [
    CommonModule,
    DemandOptionRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class DemandOptionModule { }
