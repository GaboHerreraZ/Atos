import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Response } from 'src/app/core/model/response';
import { environment } from 'src/environments/environment';
import { UserModel } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private URL_USER: string;


  constructor(private http: HttpClient) { 
    this.URL_USER = `${environment.post.endPoint}/user`;
  }

  resolve() {
    this.getUsers();
  }


  getUsers(): Observable<UserModel[]> {
    return this.http.get<Response<UserModel[]>>( this.URL_USER).pipe(
      map((result: Response<UserModel[]>) => {
        return result.data;
      })
    );
  }


  getUserById(id: number): Observable<UserModel> {
    const url = `${this.URL_USER}/${id}`;
    return this.http.get<Response<UserModel>>(url).pipe(
      map((result: Response<UserModel>) => result.data)
    );
  }




}
