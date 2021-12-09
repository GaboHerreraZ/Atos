import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsRoutingModule } from './posts-routing.module';
import { PostComponent } from './post/post.component';
import { PostListComponent } from './post-list/post-list.component';
import { MaterialModule } from '../shared/modules/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { PostDetailComponent } from './post-detail/post-detail.component';


@NgModule({
  declarations: [
    PostComponent,
    PostListComponent, 
    PostDetailComponent
  ],
  imports: [
    CommonModule,
    PostsRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  exports: [],
  providers: []
})
export class PostsModule { }
