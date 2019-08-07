import { CommentsStore } from './comments.store';
import { GraphQLService } from 'src/app/services/graph-ql.service';
import { CreateCommentInput } from 'src/API';
import { createComment } from '../../../graphql/mutations';
import { Comment } from './comments.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(
    private commentsStore: CommentsStore,
    private graphQLService: GraphQLService
  ) { }

  async addComment(input: CreateCommentInput): Promise<any> {
    this.commentsStore.add(
      {
        id: input.id,
        postId: input.postId,
        email: input.email,
        body: input.body
      });

    return await this.graphQLService.query(createComment, { input });
  }
}
