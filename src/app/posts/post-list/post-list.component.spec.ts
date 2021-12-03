import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { PostService } from '../shared/post.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from "@angular/router/testing";


import { PostListComponent } from './post-list.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { of } from 'rxjs';
import { PostDetailComponent } from '../post-detail/post-detail.component';
import {AsyncPipe, CommonModule} from '@angular/common';
import { UserComponent } from 'src/app/users/user/user.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from 'src/app/users/shared/user.service';
import { PostComponent } from '../post/post.component';
import { PostModel } from '../shared/post.model';
import { Response } from 'src/app/core/model/response';


const DialogMock = {
  open() {
    return {
      afterClosed: () => of({id: 1, title: 'Titulo prueba', body: 'Body prueba'})
    }
  }
}



describe('PostListComponent', () => {
  let component: PostListComponent;
  let fixture: ComponentFixture<PostListComponent>;
  let postService: PostService;
  let postModel: PostModel = {id: 1, title: 'Titulo prueba', body: 'Body prueba', userId: 1};
  let postsModelArray: PostModel[]  = [{id: 1, title: 'Titulo prueba', body: 'Body prueba', userId: 1}, {id: 2, title: 'Titulo prueba', body: 'Body prueba', userId: 1}];

  let activatedRoute: ActivatedRoute;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[
        BrowserAnimationsModule,
        CommonModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes(
          [
            { 
              path: 'details/:id', 
              component: PostDetailComponent
            },
            { 
              path: 'users/details', 
              component: UserComponent
            }
          ]),
        RouterModule,
        MatDialogModule
      ],
      declarations: [ PostListComponent , PostComponent, AsyncPipe],
      providers: [
        UserService,
        PostService,
        {
          provide: ActivatedRoute,
          useValue: {
            data: of(postsModelArray)
          }
        },
        {
          provide: MatDialog,
          useValue: DialogMock
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostListComponent);
    component = fixture.componentInstance;
    postService = fixture.debugElement.injector.get(PostService);
    activatedRoute = fixture.debugElement.injector.get(ActivatedRoute);
    router = TestBed.inject(Router);
    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('[getPosts] get posts from the subscription', fakeAsync(() => {
    component.getPosts();
    tick();
    expect(component.dataSource.data.length).toBe(2);
  }));
  
  it('[navigate] to details', () => {
     const spy = spyOn(router, 'navigate');
      component.postDetails({id: 1});
      expect(spy).toHaveBeenCalledWith(['details', 1], { relativeTo: activatedRoute});
  });

  it('[navigate] to user details', () => {
    const spy = spyOn(router, 'navigate');
    component.userDetail({userId: 1});
    expect(spy).toHaveBeenCalledWith(['/users/details', 1], { relativeTo: activatedRoute});
  });

  it('[editPost] Edit post from dialog modal', fakeAsync(() => {
    const post = {id: 1, title: 'Titulo prueba', body: 'Body prueba'};
    const spyUpdatePost =  spyOn(postService, 'updatePost').and.returnValue(of(postModel));
    component.editPost(post);
    tick();
    expect(spyUpdatePost).toHaveBeenCalled();
  }));

  it('[openModelCreatePost] create post from dialog modal', fakeAsync(() => {
    const post = {id: 1, title: 'Titulo prueba', body: 'Body prueba'};
    const spyUpdatePost =  spyOn(postService, 'setPost').and.returnValue(of(postModel));
    component.openModelCreatePost();
    tick();
    expect(spyUpdatePost).toHaveBeenCalled();
  }));

});
