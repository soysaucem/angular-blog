import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Comment } from '../../states/comment-state/comments.model';
import { ActivatedRoute } from '@angular/router';
import { CommentsQuery } from 'src/app/states/comment-state/comments.query';
import { CommentsService } from 'src/app/states/comment-state/comments.service';
import { CreateCommentInput, DeleteCommentInput } from 'src/API';
import { guid } from '@datorama/akita';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {

  comments$: Observable<Comment[]>;
  private postId = this.activatedRoute.snapshot.paramMap.get('id');

  constructor(
    private commentsQuery: CommentsQuery,
    private commentsService: CommentsService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.comments$ = this.commentsQuery.getComments();
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
