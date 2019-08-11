import { QueryEntity } from '@datorama/akita';
import { CommentsStore, CommentsState } from './comments.store';
import { Comment } from './comments.model';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { GraphQLService } from 'src/app/services/graph-ql.service';
import { ModelCommentFilterInput } from 'src/API';
import { listComments } from 'src/graphql/queries';
import { RouterQuery } from '@datorama/akita-ng-router-store';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CommentsQuery extends QueryEntity<CommentsState> {

  constructor(
    protected store: CommentsStore,
    private graphQLService: GraphQLService,
    private routerQuery: RouterQuery
  ) {
    super(store);
  }

  getComments(): Observable<Comment[]> {
    const id: string = this.routerQuery.getParams('id');
    const commentFilter: ModelCommentFilterInput = {
      postId: {
        eq: id
      }
    };

    this.getCommentsFromServer(commentFilter);

    return this.selectAll().pipe(
      map(comments => comments.filter(comment => comment.postId === id))
    );
  }

  async getCommentsFromServer(commentFilter: ModelCommentFilterInput): Promise<any> {
    return await this.graphQLService.query(listComments, { commentFilter })
      .then(
        (response) => this.store.add(response.data.listComments.items)
      );
  }
}
