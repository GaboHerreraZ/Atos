import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/users/shared/user.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit , AfterViewInit{

  form: FormGroup;
  users$: Observable<any>;


  constructor(private fb: FormBuilder,
              private userService: UserService,
              @Inject(MAT_DIALOG_DATA) public data: any) { }



  ngOnInit(): void {
    this.form =  this.fb.group({
      id: [],
      title: ['', Validators.required],
      body: ['', Validators.required],
      userId: ['', Validators.required]
    });

    this.setUser();
  }

  ngAfterViewInit() {
    this.getUsers();
  }

  getUsers() {
   this.users$ = this.userService.getUsers();
  }

  setUser() {
    if(this.data) {
      this.form.patchValue(this.data);
    }
  }

}
