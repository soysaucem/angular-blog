import { Component, OnInit } from '@angular/core';
import { Comment } from '../../states/comment-state/comments.model';
import { ActivatedRoute } from '@angular/router';
import { CommentsQuery } from 'src/app/states/comment-state/comments.query';
import { CommentsQueryService } from 'src/app/states/comment-state/comments-query.service';
import { CommentsService } from 'src/app/states/comment-state/comments.service';
import { ModelCommentFilterInput, CreateCommentInput } from 'src/API';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  comments: Comment[];
  private postId = this.activatedRoute.snapshot.paramMap.get('id');

  constructor(
    private commentsQuery: CommentsQuery,
    private commentsQueryService: CommentsQueryService,
    private commentsService: CommentsService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getPostComments();
  }

  async getPostComments(): Promise<any> {
    const commentFilter: ModelCommentFilterInput = {
      postId: {
        eq: this.postId
      }
    };

    await this.commentsQueryService.getCommentsFromServer(commentFilter);
    this.commentsQuery.comments$.subscribe(
      (comments) => {
        this.comments = comments.filter(comment => comment.postId === this.postId);
      }
    );
  }

  onAddComment(email: string, body: string): void {
    if (!body || !email) { return; }

    const newComment: CreateCommentInput = {
      postId: this.postId,
      id: null,
      email,
      body
    };

    this.commentsService.addComment(newComment);
  }
}
