import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreatorRoutingModule } from './creator-routing.module';
import { CreatorListComponent } from './creator-list/creator-list.component';
import {FormsModule} from "@angular/forms";
import {SharedModule} from "../../shared/shared.module";


@NgModule({
  declarations: [
    CreatorListComponent
  ],
    imports: [
        CommonModule,
        CreatorRoutingModule,
        FormsModule,
        SharedModule
    ]
})
export class CreatorModule { }
