import { Component, OnInit } from '@angular/core';
import { Post } from '../../states/post-state/posts.model';
import { PostsQuery } from 'src/app/states/post-state/posts.query';
import { PostsQueryService } from 'src/app/states/post-state/posts-query.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  posts: Post[];

  constructor(
    private postQueryService: PostsQueryService,
    private postsQuery: PostsQuery
  ) { }

  ngOnInit() {
    this.getPosts();
  }

  /**
   * Get list of post items
   */
  async getPosts(): Promise<any> {
    await this.postQueryService.getPostsFromServer();
    this.postsQuery.posts$.subscribe(posts => this.posts = posts);
  }
}
