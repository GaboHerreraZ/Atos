import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Response } from 'src/app/core/model/response';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private URL_POST: string;

  constructor(private http: HttpClient) {
      this.URL_POST = `${environment.post.endPoint}/post`;
  }

  resolve() {
      return this.getPosts();
  }

  public getPosts(): Observable<Response<any>> {
    return this.http.get<Response<any>>(this.URL_POST).pipe(
      map((result: Response<any>)=> result.data)
    );
  }

  public setPost(post: any) {
    const obj = { post };
    return this.http.post<Response<any>>(this.URL_POST, obj).pipe(
      map((result: Response<any>)=> result.data)
    );
  }

  public updatePost(post: any, id: number) {
    const obj = { post };
    const url = `${this.URL_POST}/${id}`;
    return this.http.put<Response<any>>(url, obj).pipe(
      map((result: Response<any>)=> result.data)
    );
  }


  public getCommentsByPost(id: string) {
    const url = `${this.URL_POST}/${id}/comments`;
    return this.http.get<Response<any>>(url).pipe(
      map((result: Response<any>)=> result.data)
    );
  }

}
