import { Injectable } from "@angular/core";
import { Posts } from "./../models/posts";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { HttpRequestService } from "./../../app/http-request.service";

@Injectable()
export class PostService {
public api="https://hn.algolia.com/api/v1/search_by_date"
public data="tags=story";

  constructor(private http: HttpClient,
    private httpService: HttpRequestService) { }
    posts(filterInfo:any,page:Number=0):Observable<Posts[]>{
      console.log(page)
      if(page){
        this.data+=`&page=${page}`
      }
      return this.httpService.getRequest("GET",this.api,this.data).pipe(
        map((res: any) => res),
        catchError((err, caught) => {
          if (err.status === 401) {
          }
          return Observable.throw(err.statusText);
        })
      );
    }
}
