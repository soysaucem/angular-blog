import { Injectable } from '@angular/core';
import { PostsService } from 'src/app/states/post-state/posts.service';
import { CommentsService } from 'src/app/states/comment-state/comments.service';
import { DeleteType } from 'src/app/classes/deleteType';
import { DeleteCommentInput, DeletePostInput } from 'src/API';
import { CommentsQuery } from 'src/app/states/comment-state/comments.query';
import { Command } from '../command.model';

@Injectable({
  providedIn: 'root'
})
export class DeleteCommandService implements Command {

  constructor(
    private postsService: PostsService,
    private commentsService: CommentsService,
    private commentsQuery: CommentsQuery
  ) { }

  async execute(type: DeleteType, params: any): Promise<any> {
    switch (type) {
      case DeleteType.POST_DELETE:
        const deletePostInput: DeletePostInput = { id: params.id };
        const comments$ = this.commentsQuery.getComments(params.id);
        // Delete post in DOM.
        params.event.target.parentNode.remove();
        // Delete all comments linked to this post.
        comments$.subscribe(
          (comments) => {
            comments.forEach(async (comment) => {
              await this.commentsService.deleteComment({ id: comment.id });
            });
          }
        );
        await this.postsService.deletePost(deletePostInput);
        break;
      case DeleteType.COMMENT_DELETE:
        const deleteCommentInput: DeleteCommentInput = { id: params.id };
        // Delete comment in DOM.
        params.event.target.parentNode.parentNode.parentNode.parentNode.remove();
        await this.commentsService.deleteComment(deleteCommentInput);
        break;
      default:
        throw new Error('DeleteCommand failed to execute');
    }
  }
}
