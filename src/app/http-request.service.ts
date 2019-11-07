import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";

@Injectable()
export class HttpRequestService {
  constructor(private http:HttpClient) { }
  getRequest(type:String,requestUrl:String,data?:any,queryParams?:any):Observable<any>{
    switch(type){
      case "GET":
       return this.http.get<any>(`${requestUrl}?${data}`)
       default:
         return null
    }
  }
}
