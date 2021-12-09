import { 
  HttpInterceptor, 
  HttpHandler, 
  HttpRequest, 
  HttpResponse } from '@angular/common/http';
import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import { LoadingService } from 'src/app/loading/loading/loading.service';
import { AlertService } from '../service/alert.service';

export class HttpResponseInterceptor implements HttpInterceptor {
  

    constructor( private alertService: AlertService,
                 private loadingService: LoadingService) {}
    
  
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
      this.loadingService.startLoading();
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
              //To simulate a delay from server
              setTimeout(() => {
                this.loadingService.stopLoading();
              }, 200);
              return event;
        }));
    }
}