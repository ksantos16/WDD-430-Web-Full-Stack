import { HttpClient, HttpHeaders, HttpParams, HttpEventType } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, map, catchError, throwError, tap } from 'rxjs';

import { Post } from './post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  error = new Subject<string>();

  constructor(private http: HttpClient) { }

  createAndStorePost(title: string, content: string) {
    const postData: Post = {title: title, content: content}
    this.http
    .post<{ name: string }>(
      'https://ng-comp-guide-489cb-default-rtdb.firebaseio.com/posts.json',
      postData,
      {
        observe: 'response'
      }
    )
    .subscribe(responseData => {
      console.log(responseData);
    }, error => {
      this.error.next(error.message);
    });
  }

  fetchPost () {
    let searchParams = new HttpParams();
    searchParams = searchParams.append('print', 'pretty');

    return this.http
    .get<{ [key: string]: Post }>(
      'https://ng-comp-guide-489cb-default-rtdb.firebaseio.com/posts.json',
      {
        headers: new HttpHeaders({ 'Custom-Header': 'Hello' }),
        params: searchParams,
        responseType: 'json',
      }
      )
    .pipe(
      map(responseData => {
        const postsArray: Post[] = [];
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            postsArray.push({ ...responseData[key], id: key });
          }
        }
        return postsArray;
      }),
      catchError(errorRes => {
        return throwError(errorRes);
      })
    );
  }

  deletePost () {
    return this.http.delete(
      'https://ng-comp-guide-489cb-default-rtdb.firebaseio.com/posts.json',
      {
        observe: 'events',
        responseType: 'text'
      }
      ).pipe(tap(event => {
        console.log(event);
        if(event.type === HttpEventType.Response) {
          console.log(event.body);
        }
      })
      );
  }


}
