import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UserComponent } from './user/user.component';
import { UserService } from './shared/user.service';
import { MaterialModule } from '../shared/modules/material.module';


@NgModule({
  declarations: [
    UserComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    MaterialModule

  ],
  providers: [UserService]
})
export class UsersModule { }
