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
  id = +this.activatedRoute.snapshot.paramMap.get('id');
  constructor(private postDataService: PostDataService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.getPostComments();
  }

  getPostComments(): void {
    this.postDataService.getPostComments(this.id)
    .subscribe(comments => this.comments = comments);
  }

  addPostComment(email: string, body: string): void {
    if (!body || !email) { return; }
    const comment = {
      postId: this.id,
      id: this.generateCommentId(),
      name: 'naqweqme',
      email,
      body
    };
    this.postDataService.addNewComment(comment)
    .subscribe(comment => this.comments.push(comment));
  }

  generateCommentId(): number {
    return this.comments.length + 1;
  }
}
