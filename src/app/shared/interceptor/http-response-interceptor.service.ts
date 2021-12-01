import { 
  HttpInterceptor, 
  HttpHandler, 
  HttpRequest, 
  HttpResponse } from '@angular/common/http';
import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import { AlertService } from '../service/alert.service';

export class HttpResponseInterceptor implements HttpInterceptor {
  

    constructor( private alertService: AlertService) {}
    
  
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
      return next.handle(request)
        .pipe(
          map((event) => {
              if(event instanceof HttpResponse){
                if(event.status === 200 && event.body.message != null) {
                  this.alertService.success(event.body.message);
                }

                if(event.status !== 200) {
                   this.alertService.error(event.body.message);
                }
              }  
              return event;
        }));
    }
}