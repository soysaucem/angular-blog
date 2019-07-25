import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../models/post';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Comment} from '../models/comment';

@Injectable({
  providedIn: 'root'
})
export class PostDataService {
  postDataUrl = 'https://jsonplaceholder.typicode.com/posts';
  httpOptions = {
    headers: new HttpHeaders ({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.postDataUrl);
  }

  getPostByID(id: number): Observable<Post> {
    return this.http.get<Post>(`${this.postDataUrl}/${id}`);
  }

  getPostComments(id: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`https://jsonplaceholder.typicode.com/comments?postId=${id}`);
  }

  addNewPost(post: Post): Observable<Post> {
    return this.http.post<Post>(this.postDataUrl, post, this.httpOptions);
  }


}
