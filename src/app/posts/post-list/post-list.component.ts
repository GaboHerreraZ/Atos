import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { of, Subscription } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { PostComponent } from '../post/post.component';
import { PostService } from '../shared/post.service';
import { PostTable } from './post-table';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, AfterViewInit , OnDestroy{

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<any>;

  displayedColumns = ['id', 'title', 'body', 'userName', 'Acciones'];
  columnsTable =  PostTable;
  subscription =  new Subscription();

  constructor(private activatedRoute: ActivatedRoute,
              private postService: PostService,
              private router: Router,
              public dialog: MatDialog) { }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  ngOnInit(): void {
    this.getPosts();
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getPosts(): void {
   this.subscription.add(this.activatedRoute.data.subscribe((result)=>{
      this.dataSource = new MatTableDataSource(result.data);
    }));
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


  userDetail(row: any): void{
      this.router.navigate(['/users/details', row.userId], {relativeTo: this.activatedRoute});
  }

  postDetails(row: any) {
    this.router.navigate(['details', row.id], {relativeTo: this.activatedRoute});
  }

  editPost(row: any) {
    const dialogRef =  this.dialog.open(PostComponent, {
      data: row,
      disableClose: true
    });

    this.subscription.add(dialogRef.afterClosed().pipe(
      mergeMap(result => {
        if(result) {
          return this.postService.updatePost(result, row.id);
        }
        return of(null);
      })
    ).subscribe((result) => {
          if(result) {
            this.replace(result.id);
            this.dataSource.data.push(result);
            const obj =  Object.assign([], this.dataSource.data);
            this.dataSource.data = obj;
          }
    }));
  }


  openModelCreatePost() {

    const dialogRef =  this.dialog.open(PostComponent, {
      disableClose: true
    });

    this.subscription.add(dialogRef.afterClosed().pipe(
      mergeMap(result => {
        if(result) {
          return this.postService.setPost(result)
        }
        return of(false);
      })
    ).subscribe((result) => {
          if(result) {
            this.dataSource.data.push(result);
            const obj =  Object.assign([], this.dataSource.data);
            this.dataSource.data = obj;
          }
    }));
  }

  
  replace(id: number): void {
    const index =  this.dataSource.data.findIndex(p => p.id === id);
    this.dataSource.data.splice(index, 1);
  }

}
