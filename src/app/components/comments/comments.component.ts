import { Component, OnInit, DoCheck } from '@angular/core';
import { Comment } from '../../states/comment-state/comments.model';
import { ActivatedRoute } from '@angular/router';
import { CommentsQuery } from 'src/app/states/comment-state/comments.query';
import { Observable } from 'rxjs';
import { Button } from 'src/app/services/command/button-command/button';
import { AddCommandService } from 'src/app/services/command/button-command/add-command.service';
import { AddType } from 'src/app/classes/addType';
import { DeleteCommandService } from 'src/app/services/command/button-command/delete-command.service';
import { DeleteType } from 'src/app/classes/deleteType';
import { ToggleCommandService } from 'src/app/services/command/button-command/toggle-command.service';
import { ToggleType } from 'src/app/classes/toggleType';
import { UpdateType } from 'src/app/classes/updateType';
import { UpdateCommandService } from 'src/app/services/command/button-command/update-command.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit, DoCheck {

  comments$: Observable<Comment[]>;
  addCommentButton: Button = new Button();
  deleteCommentButton: Button = new Button();
  toggleMenuButton: Button = new Button();
  toggleEditButton: Button = new Button();
  updateCommentButton: Button = new Button();
  previousPostId: string;

  constructor(
    private commentsQuery: CommentsQuery,
    public activatedRoute: ActivatedRoute,
    private addCommandService: AddCommandService,
    private deleteCommandService: DeleteCommandService,
    private toggleCommandService: ToggleCommandService,
    private updateCommandService: UpdateCommandService
  ) { }

  ngOnInit() {
    const postId = this.activatedRoute.snapshot.paramMap.get('id');
    this.setUpComments(postId);
    this.previousPostId = postId;
    // Real-time subscription to any comment data changes from server
    this.commentsQuery.subscribeCreatedComment();
    this.commentsQuery.subscribeDeletedComment();
    this.commentsQuery.subscribeUpdatedComment();
  }

  // Initialize new comments that is linked to selected post in search box
  ngDoCheck() {
    const postId = this.activatedRoute.snapshot.paramMap.get('id');
    if ( postId !== this.previousPostId) {
      this.setUpComments(postId);
      this.previousPostId = postId;
    }
  }

  setUpComments(postId: string): void {
    this.comments$ = this.commentsQuery.getComments(postId);
    this.addCommentButton.setCommand(this.addCommandService);
    this.addCommentButton.setType(AddType.COMMENT_ADD);
    this.deleteCommentButton.setCommand(this.deleteCommandService);
    this.deleteCommentButton.setType(DeleteType.COMMENT_DELETE);
    this.toggleMenuButton.setCommand(this.toggleCommandService);
    this.toggleMenuButton.setType(ToggleType.COMMENT_MENU);
    this.toggleEditButton.setCommand(this.toggleCommandService);
    this.toggleEditButton.setType(ToggleType.COMMENT_EDIT);
    this.updateCommentButton.setCommand(this.updateCommandService);
    this.updateCommentButton.setType(UpdateType.COMMENT_UPDATE);
  }
}
