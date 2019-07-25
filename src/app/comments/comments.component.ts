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

  constructor(private postDataService: PostDataService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.getPostComments();
  }

  getPostComments(): void {
    const id = +this.activatedRoute.snapshot.paramMap.get('id');
    this.postDataService.getPostComments(id).subscribe(comments => this.comments = comments);
    console.log(this.comments);
  }
}
