import { QueryEntity } from '@datorama/akita';
import { CommentsStore, CommentsState } from './comments.store';
import { Comment } from './comments.model';
import { Observable, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { CommentsQueryService } from './comments-query.service';
import { ModelCommentFilterInput } from 'src/API';

@Injectable({
  providedIn: 'root'
})
export class CommentsQuery extends QueryEntity<CommentsState> {

  comments$: Observable<Comment[]> = this.selectAll();

  constructor(protected store: CommentsStore) {
    super(store);
  }
}
