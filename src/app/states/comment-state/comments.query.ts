import { QueryEntity } from '@datorama/akita';
import { CommentsStore, CommentsState } from './comments.store';
import { Comment } from './comments.model';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { GraphQLService } from 'src/app/services/graph-ql.service';
import { ModelCommentFilterInput } from 'src/API';
import { listComments } from 'src/graphql/queries';
import { map } from 'rxjs/operators';

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
}
