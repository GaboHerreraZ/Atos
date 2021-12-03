import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Response } from 'src/app/core/model/response';
import { environment } from 'src/environments/environment';
import { PostCommentModel } from './post.comment.model';
import { PostModel } from './post.model';

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

  public getPosts(): Observable<PostModel[]> {
    return this.http.get<Response<PostModel[]>>(this.URL_POST).pipe(
      map((result: Response<PostModel[]>)=>   result.data)
    );
  }

  public setPost(post: any): Observable<PostModel> {
    const obj = { post };
    return this.http.post<Response<PostModel>>(this.URL_POST, obj).pipe(
      map((result: Response<PostModel>)=> result.data)
    );
  }

  public updatePost(post: any, id: number): Observable<PostModel> {
    const obj = { post };
    const url = `${this.URL_POST}/${id}`;
    return this.http.put<Response<PostModel>>(url, obj).pipe(
      map((result: Response<PostModel>)=> result.data)
    );
  }


  public getCommentsByPost(id: string): Observable<PostCommentModel[]> {
    const url = `${this.URL_POST}/${id}/comments`;
    return this.http.get<Response<PostCommentModel[]>>(url).pipe(
      map((result: Response<PostCommentModel[]>)=> result.data)
    );
  }

}
