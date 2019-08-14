import { Injectable } from '@angular/core';
import { Command } from '../command.model';
import { PostsService } from 'src/app/states/post-state/posts.service';
import { CommentsService } from 'src/app/states/comment-state/comments.service';
import { guid } from '@datorama/akita';
import { CreatePostInput, CreateCommentInput } from 'src/API';
import { AddType } from 'src/app/classes/addType';

@Injectable({
  providedIn: 'root'
})
export class AddCommandService implements Command {

  constructor(
    private postsService: PostsService,
    private commentsService: CommentsService
  ) { }

  async execute(type: AddType, params: any): Promise<any> {
    switch (type) {
      case AddType.POST_ADD:
        const newPost: CreatePostInput = {
          id: guid(),
          title: params.title,
          body: params.body
        };
        await this.postsService.addPost(newPost);
        break;
      case AddType.COMMENT_ADD:
        const newComment: CreateCommentInput = {
          id: guid(),
          postId: params.postId,
          email: params.email,
          body: params.body
        };
        await this.commentsService.addComment(newComment);
        break;
      default:
        throw new Error('AddCommand failed to execute');
    }
  }
}
