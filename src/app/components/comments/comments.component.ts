import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Comment } from '../../states/comment-state/comments.model';
import { ActivatedRoute } from '@angular/router';
import { CommentsQuery } from 'src/app/states/comment-state/comments.query';
import { CommentsQueryService } from 'src/app/states/comment-state/comments-query.service';
import { CommentsService } from 'src/app/states/comment-state/comments.service';
import { ModelCommentFilterInput, CreateCommentInput, DeleteCommentInput } from 'src/API';
import { guid } from '@datorama/akita';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  encapsulation: ViewEncapsulation.None,
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

  /**
   * Get comments of current post
   */
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
      id: guid(),
      postId: this.postId,
      email,
      body
    };

    this.commentsService.addComment(newComment);
  }

  toggleCommentMenu(event: any): void {
    if (event.target.nextSibling.style.display === 'none') {
      event.target.nextSibling.style.display = 'block';
    } else {
      event.target.nextSibling.style.display = 'none';
    }
  }

  async onDeleteComment(id: string, event: any): Promise<any> {
    const input: DeleteCommentInput = { id };

    event.target.parentNode.parentNode.parentNode.parentNode.remove();

    return await this.commentsService.deleteComment(input);
  }

  toggleEditComment(event: any): void {
    const commentContent = event.target.parentNode.parentNode.parentNode
      .parentNode.childNodes[1].childNodes[0] as HTMLElement;
    const liCommentElement = event.target.parentNode.parentNode.parentNode.parentNode;

    // Toggle contenteditable mode of a comment
    commentContent.setAttribute('contenteditable', 'true');

    // Focus on comment content area after triggered edit mode
    liCommentElement.childNodes[1].childNodes[0].focus();

    // Show submit button to post new comment content
    liCommentElement.childNodes[2].style.display = 'block';

    // Hide comment menu after selected edit comment
    event.target.parentNode.style.display = 'none';
  }

  async onUpdateComment(comment: Comment, event: any): Promise<any> {
    const commentContentField = event.target.parentNode.childNodes[1].childNodes[0] as HTMLElement;

    // Hide submit-button after submitted edited comment
    event.target.style.display = 'none';

    commentContentField.toggleAttribute('contenteditable');

    return await this.commentsService.updateComment({
      id: comment.id,
      postId: comment.postId,
      email: comment.email,
      body: commentContentField.innerText
    });
  }
}
