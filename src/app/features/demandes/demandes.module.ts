import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DemandesRoutingModule } from './demandes-routing.module';
import { DemandeListComponent } from './demande-list/demande-list.component';
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    DemandeListComponent
  ],
    imports: [
        CommonModule,
        DemandesRoutingModule,
        FormsModule
    ]
})
export class DemandesModule { }
