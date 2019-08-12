import { Component, OnInit } from '@angular/core';
import { Post } from '../../states/post-state/posts.model';
import { PostsQuery } from 'src/app/states/post-state/posts.query';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss'],
})
export class PostDetailComponent implements OnInit {

  // SKELETON CODE
  post$: Observable<Post>;

  constructor(
    private postsQuery: PostsQuery,
  ) { }

  ngOnInit() {
    // Simply get a stream of the specific Post from the query
    this.post$ = this.postsQuery.selectPost();
  }
}
