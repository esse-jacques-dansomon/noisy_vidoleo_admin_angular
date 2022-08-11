import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BecameCreatorRoutingModule } from './became-creator-routing.module';
import { BecameCreatorListComponent } from './became-creator-list/became-creator-list.component';
import {FormsModule} from "@angular/forms";
import {SharedModule} from "../../shared/shared.module";


@NgModule({
  declarations: [
    BecameCreatorListComponent
  ],
    imports: [
        CommonModule,
        BecameCreatorRoutingModule,
        FormsModule,
        SharedModule
    ]
})
export class BecameCreatorModule { }
