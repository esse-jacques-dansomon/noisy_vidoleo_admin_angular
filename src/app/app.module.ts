import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './core/navigation/footer/footer.component';
import { HeaderComponent } from './core/navigation/header/header.component';
import { SidebarComponent } from './core/navigation/sidebar/sidebar.component';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import {HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ToastrModule} from "ngx-toastr";
import { SwitcherComponent } from './core/navigation/switcher/switcher.component';
import {AuthInterceptorProvider} from "./core/interceptors/auth.interceptor";
import { LoaderComponent } from './shared/components/loader/loader.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    SidebarComponent,
    AdminLayoutComponent,
    SwitcherComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(),
  ],
  providers: [AuthInterceptorProvider],
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
