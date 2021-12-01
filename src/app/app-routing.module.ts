import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home/home.component';
import { PostService } from './posts/shared/post.service';
import { UserService } from './users/shared/user.service';

const routes: Routes = [
    {
        path: 'posts',
        loadChildren: ()=> import('../app/posts/posts.module').then(m => m.PostsModule),
        resolve: {
            data: PostService
        }
    },
    {
        path: 'users',
        loadChildren: () => import('../app/users/users.module').then(m => m.UsersModule),
        resolve: {
            data: UserService
        }
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: '**',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,  { useHash: true  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
