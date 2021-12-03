import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpErrorResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpResponseInterceptor } from './http-response-interceptor.service';
import { AlertService } from '../service/alert.service';
import { HttpErrorInterceptor } from './http-error-interceptor.service';
import { LoadingService } from 'src/app/loading/loading.service';

//Interceptors

export const HTTP_CUSTOM_INTERCEPTORS = [
  { provide: HTTP_INTERCEPTORS, useClass: HttpResponseInterceptor, multi: true , deps: [AlertService, LoadingService]},
  { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true , deps: [AlertService, LoadingService]}
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [
  	HttpClientModule
  ],
  providers: [
  	HTTP_CUSTOM_INTERCEPTORS
  ]
})
export class InterceptorsIntegratorModule { }
