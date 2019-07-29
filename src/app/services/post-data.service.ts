import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../models/post';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Comment } from '../models/comment';

@Injectable({
  providedIn: 'root'
})
export class PostDataService {
  readonly postDataUrl = 'https://jsonplaceholder.typicode.com/posts';
  readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  /**
   * Khoi: Generally, this service at the moment is very basic. It just makes
   *       the HTTP call and return the observable. This means that actual
   *       interactions such as adding new posts and comments will not persist
   *       when you navigate from a pose > home > (another) post. Now that I've
   *       seen that you can make http calls, let's move on to try adding more
   *       functionalities to this service.
   *
   *       Instead of actually calling the server, try defining some mock data
   *       in a `.ts` file, load it when getPosts is first called and store it in
   *       a class property and return that class property in getPosts() instead.
   *
   *       With a class property storing the post, you will then be able to add
   *       or delete posts dynamically by just mutating the class property (or
   *       better, keep that property immutable via ImmutableJS and assigning
   *       a new array every time). Essentially, I want to see that when I first
   *       load the app, I will see only 2 posts (instead of so many like now).
   *       When I click the 'plus' button, type in the details and press 'Post',
   *       I'm expecting to see the new post created in the Home page (at the
   *       moment I can't see that).
   *
   *       Give this a go and let me know when you've made the adjustments.
   */

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.postDataUrl);
  }

  getPostByID(id: number): Observable<Post> {
    /**
     * Khoi:  Given what I said above, you might want to store the post in a
     *        Map<number, Post>(), with the id as the key to retrieve the post.
     *
     *        If you're returning a fixed post every time, then this methods
     *        should return a Promise<Post> instead. If you are up for some
     *        cool Observable stuff, I recommend to use:
     *        `Map<number, BehaviorSubject<Post>>` to store and retrieve post
     *        observables. This is actually a data structure I use very often
     *        at Modulr Tech for real-time technologies. Give it a go!
     */
    return this.http.get<Post>(`${this.postDataUrl}/${id}`);
  }

  /**
   * Khoi:  Use the principles I mentioned previously to try and improve the
   *        other methods as well.
   */

  getPostComments(id: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`https://jsonplaceholder.typicode.com/comments?postId=${id}`);
  }

  addNewPost(post: Post): Observable<Post> {
    return this.http.post<Post>(this.postDataUrl, post, this.httpOptions);
  }

  addNewComment(comment: Comment): Observable<Comment> {
    return this.http.post<Comment>(`https://jsonplaceholder.typicode.com/comments?postId=${comment.postId}`, comment, this.httpOptions);
  }
}
