import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { Response } from 'src/app/core/model/response';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private URL_USER: string;


  constructor(private http: HttpClient,
              private activatedRoute: ActivatedRoute) { 
    this.URL_USER = `${environment.post.endPoint}/user`;
  }

  resolve() {
    this.getUsers();
  }


  getUsers(): Observable<Response<any>> {
    return this.http.get<Response<any>>( this.URL_USER).pipe(
      map((result: Response<any>) => {
        return result.data;
      })
    );
  }


  getUserById(id: number) {
    const url = `${this.URL_USER}/${id}`;
    return this.http.get<Response<any>>(url).pipe(
      map(result => result.data)
    );
  }




}
