import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



import { NavbarComponent } from './navbar/navbar/navbar.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home/home.component';
import { MaterialModule } from './shared/modules/material.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorsIntegratorModule } from './shared/interceptor/inteceptor-integrator.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoadingComponent } from './loading/loading.component';
import { LoadingService } from './loading/loading.service';


const HTTP_CUSTOM_INTERCEPTORS = [
  {provide: HTTP_INTERCEPTORS, deps: []}
]



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    InterceptorsIntegratorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
