import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { StatistiqueComponent } from './statistique/statistique.component';
import {SharedModule} from "../../shared/shared.module";


@NgModule({
  declarations: [
    ProfileComponent,
    StatistiqueComponent
  ],
    imports: [
        CommonModule,
        DashboardRoutingModule,
        SharedModule
    ]
})
export class DashboardModule { }
