import { QueryEntity } from '@datorama/akita';
import { PostsStore, PostsState } from './posts.store';
import { Post } from './posts.model';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { GraphQLService } from 'src/app/services/graph-ql.service';
import { listPosts } from 'src/graphql/queries';
import { onCreatePost, onDeletePost, onUpdatePost } from 'src/graphql/subscriptions';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostsQuery extends QueryEntity<PostsState> {

  constructor(
    protected store: PostsStore,
    private graphQLService: GraphQLService
  ) {
    super(store);
  }

  /**
   * check if store has data
   * if it does, simply return this.selectEntity(id)
   * if it doesn't, attempt to retrieve data from the backend
   *
   * ADVANCED: at the end of this step, also **subscribe** to any updates
   *           of that post for some awesome real-time stuff.
   */
  selectPost(id: string): Observable<Post> {
    // If store does not have selected post, fetch data from server
    if (!this.hasEntity(id)) {
      this.getPostsFromServer();
    }

    return this.selectEntity(id);
  }

  selectPosts(input: string): Observable<Post[]> {
    // If store is empty, fetch data from server
    if (this.getCount() === 0) {
      this.getPostsFromServer();
    }

    // // If user doesn't input any term, not return any posts
    // if (input === null) {
    //   return of([]);
    // }

    return this.selectAll().pipe(
      map(posts => posts.filter(post => post.title.includes(input)))
    );
  }

  getPosts(): Observable<Post[]> {
    // If store is empty, fetch data from server
    if (this.getCount() === 0) {
      this.getPostsFromServer();
    }

    return this.selectAll();
  }

  async getPostsFromServer(): Promise<any> {
    return await this.graphQLService.query(listPosts, null)
      .then(
        (response) => this.store.set(response.data.listPosts.items)
      );
  }

  subscribeCreatedPost(): void {
    this.graphQLService.subscribeData(onCreatePost, null).subscribe(
      (response) => {
        if (response !== null) {
          this.store.add(response.value.data.onCreatePost);
        }
      }
    );
  }

  subscribeDeletedPost(): void {
    this.graphQLService.subscribeData(onDeletePost, null).subscribe(
      (response) => {
        if (response !== null) {
          this.store.remove(response.value.data.onDeletePost.id);
        }
      }
    );
  }

  subscribeUpdatedPost(): void {
    this.graphQLService.subscribeData(onUpdatePost, null).subscribe(
      (response) => {
        if (response !== null) {
          const post = response.value.data.onUpdatePost;
          this.store.replace(post.id, post);
        }
      }
    );
  }
}
