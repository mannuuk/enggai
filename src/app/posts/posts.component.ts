// import angular core
import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { MatSort, MatPaginator } from "@angular/material";
import { tap } from "rxjs/operators";
// import service
import { fromEvent, merge } from 'rxjs/';
import { HttpRequestService } from "./../http-request.service";
import { PostDataSource } from "./../../shared/datasource/post.datasource";
import { PostService } from "./../../shared/datasource/post.service";
import { Posts } from "./../../shared/models/posts"
@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})

export class PostsComponent implements OnInit {

  posts: Posts[];
  dataSource: PostDataSource;
  sortData: any = {};
  search: string;
  limitPage: Array<number> = [20, 50, 100, 200];
  displayedColumns: string[] = ["title", "created_at", "author"];
  @ViewChild('input',{static:true}) input: ElementRef;
  @ViewChild(MatPaginator,{static: true}) paginator: MatPaginator;
  @ViewChild(MatSort,{static:true}) sort: MatSort;
  constructor(
    public httpRequestService: HttpRequestService,
    public postService: PostService
  ) { }

  ngOnInit() {
    this.getPost();
  }

  // api for listing of users
  getPost(): void {
    this.dataSource = new PostDataSource(this.postService);
    console.log('ddd');
    this.loadPostPage();
  }
  //tslint:disable-next-line:use-life-cycle-interface

  
  ngAfterViewInit() {
    console.log('lllllllllllllllllllllllllllllllllllllll');
    
    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        tap(() => {
          this.paginator.pageIndex = 0;
          this.loadPostPage();
        })
      )
      .subscribe();
      merge( this.paginator.page)
      .pipe(
        tap(() => this.loadPostPage())
      )
      .subscribe();
  }
  
  loadPostPage() { 
    console.log(this.paginator);
    
    this.dataSource.loadPosts(this.search,this.paginator.pageIndex + 1);
  }
  // tslint:disable-next-line:adjacent-overload-signatures
  applyFilters(): void {
    this.loadPostPage();
  }

}                                         
