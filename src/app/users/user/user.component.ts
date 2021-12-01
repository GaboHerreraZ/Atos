import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit , OnDestroy{

  subscription = new Subscription();

  user$: Observable<any>

  constructor(private activatedRoute: ActivatedRoute,
              private userService: UserService) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    this.user$ = this.activatedRoute.params.pipe(
          mergeMap(params => {
             return this.userService.getUserById(params['id']);
            }
          ));
  }

  ngOnDestroy() {
    if(this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
