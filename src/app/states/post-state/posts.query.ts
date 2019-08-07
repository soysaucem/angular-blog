import { QueryEntity } from '@datorama/akita';
import { PostsStore, PostsState } from './posts.store';
import { Post } from './posts.model';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PostsQuery extends QueryEntity<PostsState> {

  posts$: Observable<Post[]> = this.selectAll();

  constructor(protected store: PostsStore) {
    super(store);
  }
}
