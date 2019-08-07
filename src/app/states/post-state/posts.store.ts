import { Post } from './posts.model';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

export interface PostsState extends EntityState<Post> { }

@Injectable({
  providedIn: 'root'
})
@StoreConfig({
  name: 'posts'
})
export class PostsStore extends EntityStore<PostsState> {

  constructor() {
    super();
  }
}
