import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './components/loader/loader.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import {RouterModule} from "@angular/router";
import { LoaderSubmitComponent } from './components/loader-submit/loader-submit.component';
import { PaginationComponent } from './components/pagination/pagination.component';



@NgModule({
  declarations: [
    LoaderComponent,
    BreadcrumbComponent,
    LoaderSubmitComponent,
    PaginationComponent
  ],
  exports: [
    BreadcrumbComponent,
    LoaderSubmitComponent
  ],
  imports: [
    CommonModule,
  ]
})
export class SharedModule { }
