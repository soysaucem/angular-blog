import { CommentsStore } from './comments.store';
import { GraphQLService } from 'src/app/services/graph-ql.service';
import { CreateCommentInput, DeleteCommentInput, UpdateCommentInput } from 'src/API';
import { createComment, deleteComment, updateComment } from '../../../graphql/mutations';
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
    this.commentsStore.add({
      id: input.id,
      postId: input.postId,
      email: input.email,
      body: input.body
    });

    return await this.graphQLService.query(createComment, { input });
  }

  async deleteComment(input: DeleteCommentInput): Promise<any> {
    this.commentsStore.remove({ id: input.id });

    return await this.graphQLService.query(deleteComment, { input });
  }

  async updateComment(input: UpdateCommentInput): Promise<any> {
    this.commentsStore.update(input.id, {
      email: input.email,
      body: input.body
    });

    return await this.graphQLService.query(updateComment, { input });
  }
}
