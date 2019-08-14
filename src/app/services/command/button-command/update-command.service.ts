import { Injectable } from '@angular/core';
import { Command } from '../command.model';
import { UpdateType } from 'src/app/classes/updateType';
import { PostsService } from 'src/app/states/post-state/posts.service';
import { CommentsService } from 'src/app/states/comment-state/comments.service';

@Injectable({
  providedIn: 'root'
})
export class UpdateCommandService implements Command {

  constructor(
    private postsService: PostsService,
    private commentsService: CommentsService
  ) { }

  async execute(type: UpdateType, params: any): Promise<any> {
    switch (type) {
      case UpdateType.POST_UPDATE:

        break;
      case UpdateType.COMMENT_UPDATE:
        const commentContentField = params.event.target.parentNode
          .childNodes[1].childNodes[0] as HTMLElement;
        // Hide submit-button after submitted edited comment
        params.event.target.style.display = 'none';
        commentContentField.toggleAttribute('contenteditable');
        await this.commentsService.updateComment({
          id: params.comment.id,
          postId: params.comment.postId,
          email: params.comment.email,
          body: commentContentField.innerText
        });
        break;
      default:
        throw new Error('UpdateCommand failed to execute');
    }
  }
}
