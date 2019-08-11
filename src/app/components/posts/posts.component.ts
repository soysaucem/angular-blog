import { Component, OnInit } from '@angular/core';
import { Post } from '../../states/post-state/posts.model';
import { PostsQuery } from 'src/app/states/post-state/posts.query';
import { PostsQueryService } from 'src/app/states/post-state/posts-query.service';
import { DeletePostInput } from 'src/API';
import { PostsService } from 'src/app/states/post-state/posts.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  posts: Post[];

  constructor(
    private postQueryService: PostsQueryService,
    private postsQuery: PostsQuery,
    private postsService: PostsService
  ) { }

  ngOnInit() {
    this.getPosts();
  }

  async getPosts(): Promise<any> {
    await this.postQueryService.getPostsFromServer();
    this.postsQuery.posts$.subscribe(posts => this.posts = posts);
  }

  async onDeletePost(id: string, event: any) {
    const input: DeletePostInput = { id };

    event.target.parentNode.remove();

    return await this.postsService.deletePost(input);
  }
}
