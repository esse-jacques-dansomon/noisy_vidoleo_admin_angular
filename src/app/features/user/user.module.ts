import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserListComponent } from './user-list/user-list.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { UserFormComponent } from './user-form/user-form.component';
import {LoaderComponent} from "../../shared/components/loader/loader.component";
import {SharedModule} from "../../shared/shared.module";


@NgModule({
  declarations: [
    UserListComponent,
    UserFormComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ]
})
export class UserModule { }
