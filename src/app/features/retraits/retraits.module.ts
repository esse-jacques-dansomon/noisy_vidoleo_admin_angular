import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RetraitsRoutingModule } from './retraits-routing.module';
import { RetraitListComponent } from './retrait-list/retrait-list.component';
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    RetraitListComponent
  ],
  imports: [
    CommonModule,
    RetraitsRoutingModule,
    FormsModule
  ]
})
export class RetraitsModule { }
