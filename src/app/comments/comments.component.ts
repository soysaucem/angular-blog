import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PostDataService } from '../services/post-data.service';
import { Comment } from '../models/comment';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  comments: Comment[];
  postId = +this.activatedRoute.snapshot.paramMap.get('id');
  constructor(private postDataService: PostDataService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.getPostComments();
  }

  getPostComments(): void {
    this.postDataService.getPostComments(this.postId)
    .subscribe(comments => this.comments = comments);
  }

  addPostComment(email: string, body: string): void {
    if (!body || !email) { return; }
    const newComment: Comment = {
      postId: this.postId,
      id: this.generateCommentId(),
      email,
      body
    };
    const emailInputField = document.getElementById('user-email') as HTMLInputElement;
    const commentInputField = document.getElementById('user-comment') as HTMLInputElement;

    emailInputField.value = '';
    commentInputField.value = '';
    this.postDataService.addNewComment(newComment)
    .subscribe(comment => this.comments.push(comment));
  }

  generateCommentId(): number {
    return this.comments.length > 0 ?   Math.max(...this.comments.map(comment => comment.id)) + 1 : 1;
  }
}
