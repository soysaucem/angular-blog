import { Component, OnInit } from '@angular/core';
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
  postId = Number(this.activatedRoute.snapshot.paramMap.get('id'));

  constructor(private postDataService: PostDataService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.getPostComments();
  }

  getPostComments(): void {
    this.postDataService.getPostComments(this.postId,
      this.postDataService.getComments())
      .forEach(
        (value) => {
          if(this.comments === undefined) {
            this.comments = [value];
          } else {
            this.comments.push(value);
          }
        }
      );
  }

  addPostComment(email: string, body: string): void {
    if (!body || !email) { return; }

    const newComment: Comment = {
      postId: this.postId,
      id: this.generateCommentId(),
      email,
      body
    };
    this.postDataService.addComment(newComment);
    this.comments.push(newComment);
  }

  generateCommentId(): number {
    return this.postDataService.getComments().size > 0 ?
      Math.max(...this.postDataService.getComments().keys()) + 1 : 1;
  }
}
