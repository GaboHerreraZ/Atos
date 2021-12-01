import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AlertService } from '../service/alert.service';

export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(private alertService: AlertService) {}


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.alertService.error('Ha ocurrido un error inesperado, por favor contacte al administrador');
          return throwError(error.error);
        })
      );
  }
}