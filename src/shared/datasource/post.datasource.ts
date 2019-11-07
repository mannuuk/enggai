import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { Observable } from "rxjs";
import { BehaviorSubject } from "rxjs";
import { catchError, finalize } from "rxjs/operators";
import { of } from "rxjs/";
import { Posts } from "./../models/posts";
import { PostService } from "./post.service";

export class PostDataSource implements DataSource<Posts> {
  private postData = new BehaviorSubject<Posts[]>([]);

  private loadingPosts = new BehaviorSubject<boolean>(false);

  public countInfo = new BehaviorSubject<number>(0);

  public loading$ = this.loadingPosts.asObservable();

  public totalCount$ = this.countInfo.asObservable();
  constructor(private postService: PostService) { }

  loadPosts(search,pageIndex=0) {
    const filterInfo = {
      search
    };
    this.loadingPosts.next(true);
    this.postService.posts(filterInfo,pageIndex)
      .pipe(
        catchError(err => of([err])),
        finalize(() => this.loadingPosts.next(false))
      ).subscribe((data: any) => {
        console.log(data);
        this.postData.next(data["hits"]);
        this.countInfo.next(data["nbHits"]);
        // if (data["status"] && data["res"]["usr_lst"]) {

        // }
      });
  }

  connect(collectionViewer: CollectionViewer): Observable<Posts[]> {
    return this.postData.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.postData.complete();
    this.loadingPosts.complete();
    this.countInfo.complete();
  }
}
