import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Response } from 'src/app/core/model/response';
import { environment } from 'src/environments/environment';
import { PostCommentModel } from './post.comment.model';
import { PostModel } from './post.model';
import { PostService } from './post.service';

describe('PostService', () => {
  let service: PostService;
  let httpMock : HttpTestingController;
  let posts: PostModel[] = [{id:1, title:'title', body: 'post', userId: 1}];
  let postModel: PostModel = {id:1, title:'title', body: 'post', userId: 1};
  let commentModel: PostCommentModel[] = [{id: 1, postId: 1, name: 'Nombre comment', body: 'Bdody comment', email: 'prueba@gmail.com'}];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PostService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    });
  });


  beforeEach(()=> {
    service = TestBed.inject(PostService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterAll( () => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('[GetPosts] Get post from api', () => {
    service.getPosts().subscribe((res: PostModel[]) => {
      expect(res).toEqual(posts);
    });
      const req = httpMock.expectOne( `${environment.post.endPoint}/post`);
      expect(req.request.method).toBe('GET');
      const response: Response<PostModel[]> = {
        code: 200,
        data: posts,
        message: 'ok'
      }
      req.flush(response);
  });


  it('[setPosts] set new post to api', () => {
    service.setPost(postModel).subscribe((res: PostModel) => {
      expect(res).toEqual(postModel);
    });
      const req = httpMock.expectOne( `${environment.post.endPoint}/post`);
      expect(req.request.method).toBe('POST');
      const response: Response<PostModel> = {
        code: 200,
        data: postModel,
        message: 'ok'
      }
      req.flush(response);
  });


  it('[updatePost] update  post to api', () => {
    service.updatePost(postModel, 1).subscribe((res: PostModel) => {
      expect(res).toEqual(postModel);
    });
      const req = httpMock.expectOne( `${environment.post.endPoint}/post/${1}`);
      expect(req.request.method).toBe('PUT');
      const response: Response<PostModel> = {
        code: 200,
        data: postModel,
        message: 'ok'
      }
      req.flush(response);
  });


  it('[getCommentsByPost] get comment post from api', () => {
    service.getCommentsByPost("1").subscribe((res: PostCommentModel[]) => {
      expect(res).toEqual(commentModel);
    });
      const req = httpMock.expectOne( `${environment.post.endPoint}/post/${1}/comments`);
      expect(req.request.method).toBe('GET');
      const response: Response<PostCommentModel[]> = {
        code: 200,
        data: commentModel,
        message: 'ok'
      }
      req.flush(response);
  });



});
