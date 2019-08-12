import { Component, OnInit } from '@angular/core';
import { Post } from '../../states/post-state/posts.model';
import { PostsQuery } from 'src/app/states/post-state/posts.query';
import { DeletePostInput } from 'src/API';
import { PostsService } from 'src/app/states/post-state/posts.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  posts$: Observable<Post[]>;

  constructor(
    private postsQuery: PostsQuery,
    private postsService: PostsService
  ) { }

  ngOnInit() {
    this.posts$ = this.postsQuery.getPosts();
  }

  async onDeletePost(id: string, event: any) {
    const input: DeletePostInput = { id };

    event.target.parentNode.remove();

    return await this.postsService.deletePost(input);
  }
}
