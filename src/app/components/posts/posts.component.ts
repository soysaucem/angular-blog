import { Component, OnInit } from '@angular/core';
import { Post } from '../../states/post-state/posts.model';
import { PostsQuery } from 'src/app/states/post-state/posts.query';
import { DeletePostInput, DeleteCommentInput } from 'src/API';
import { PostsService } from 'src/app/states/post-state/posts.service';
import { Observable } from 'rxjs';
import { CommentsQuery } from 'src/app/states/comment-state/comments.query';
import { CommentsService } from 'src/app/states/comment-state/comments.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  posts$: Observable<Post[]>;

  constructor(
    private postsQuery: PostsQuery,
    private postsService: PostsService,
    private commentsQuery: CommentsQuery,
    private commentsService: CommentsService
  ) { }

  ngOnInit() {
    this.posts$ = this.postsQuery.getPosts();
  }

  async onDeletePost(id: string, event: any) {
    const input: DeletePostInput = { id };

    event.target.parentNode.remove();
    this.deletePostComments(id);

    return await this.postsService.deletePost(input);
  }

  deletePostComments(postId: string): void {
    const comments$ = this.commentsQuery.getComments(postId);
    comments$.subscribe(
      (comments) => {
        comments.forEach(async (comment) => {
          await this.commentsService.deleteComment({ id: comment.id });
        });
      }
    );
  }
}
