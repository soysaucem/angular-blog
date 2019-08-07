import { Comment } from './comments.model';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

export interface CommentsState extends EntityState<Comment> { }

@Injectable({
  providedIn: 'root'
})
@StoreConfig({
  name: 'comments'
})
export class CommentsStore extends EntityStore<CommentsState> {

  constructor() {
    super();
  }
}
