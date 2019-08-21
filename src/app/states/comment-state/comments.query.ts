import { QueryEntity } from '@datorama/akita';
import { CommentsStore, CommentsState } from './comments.store';
import { Comment } from './comments.model';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { GraphQLService } from 'src/app/services/graph-ql.service';
import { ModelCommentFilterInput } from 'src/API';
import { listComments } from 'src/graphql/queries';
import { map } from 'rxjs/operators';
import { onCreateComment, onDeleteComment, onUpdateComment } from 'src/graphql/subscriptions';

@Injectable({
  providedIn: 'root'
})
export class CommentsQuery extends QueryEntity<CommentsState> {

  constructor(
    protected store: CommentsStore,
    private graphQLService: GraphQLService,
  ) {
    super(store);
  }

  getComments(postId: string): Observable<Comment[]> {
    const commentFilter: ModelCommentFilterInput = {
      postId: {
        eq: postId
      }
    };

    this.getCommentsFromServer(commentFilter);

    // Real-time subscription to any comment data changes from server
    this.subscribeCreatedComment();
    this.subscribeDeletedComment();
    this.subscribeUpdatedComment();

    return this.selectAll().pipe(
      map(comments => comments.filter(comment => comment.postId === postId))
    );
  }

  async getCommentsFromServer(commentFilter: ModelCommentFilterInput): Promise<any> {
    return await this.graphQLService.query(listComments, { commentFilter })
      .then(
        (response) => this.store.add(response.data.listComments.items)
      );
  }

  subscribeCreatedComment(): void {
    this.graphQLService.subscribeData(onCreateComment, null).subscribe(
      (response) => {
        if (response !== null) {
          this.store.add(response.value.data.onCreateComment);
        }
      }
    );
  }

  subscribeDeletedComment(): void {
    this.graphQLService.subscribeData(onDeleteComment, null).subscribe(
      (response) => {
        if (response !== null) {
          this.store.remove(response.value.data.onDeleteComment.id);
        }
      }
    );
  }

  subscribeUpdatedComment(): void {
    this.graphQLService.subscribeData(onUpdateComment, null).subscribe(
      (response) => {
        if (response !== null) {
          const comment = response.value.data.onUpdateComment;
          this.store.replace(comment.id, comment);
        }
      }
    );
  }
}
