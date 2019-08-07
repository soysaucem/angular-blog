import { Component, OnInit } from '@angular/core';
import { Post } from '../../states/post-state/posts.model';
import { ActivatedRoute } from '@angular/router';
import { PostsQuery } from 'src/app/states/post-state/posts.query';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {

  post: Post[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private postsQuery: PostsQuery) { }

  ngOnInit() {
    this.getSelectedPost();
  }

  /**
   * Get post selected by user to show post detail
   */
  getSelectedPost(): void {
    const postID: string = this.activatedRoute.snapshot.paramMap.get('id');
    this.postsQuery.posts$.pipe(
      map(response => response.filter(post => post.id === postID))
    ).subscribe(response => this.post = response);
  }
}
