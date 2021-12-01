import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { mergeMap, tap } from 'rxjs/operators';
import { PostService } from '../shared/post.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {

  step = 0;
  comments$: Observable<any>;

  constructor(private postService: PostService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getCommentsByPost();
  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }


  getCommentsByPost() {
    this.comments$ =   this.activatedRoute.params.pipe(
      mergeMap(params => {
        return this.postService.getCommentsByPost(params['id']);
      })
    );
  }
}
