import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../post';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostDataService {
  postDataUrl = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient) { }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.postDataUrl);
  }
}
