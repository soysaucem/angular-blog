import { listComments } from '../../../graphql/queries';
import { GraphQLService } from 'src/app/services/graph-ql.service';
import { CommentsStore } from './comments.store';
import { Injectable } from '@angular/core';
import { ModelCommentFilterInput } from 'src/API';

@Injectable({
  providedIn: 'root'
})
export class CommentsQueryService {

  constructor(
    private graphQLService: GraphQLService,
    private commentsStore: CommentsStore
  ) { }

  async getCommentsFromServer(filter: ModelCommentFilterInput): Promise<any> {
    return await this.graphQLService.query(listComments, { filter })
      .then(
        (response) => this.commentsStore.set(response.data.listComments.items)
      );
  }
}
