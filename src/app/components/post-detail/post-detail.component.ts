import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post } from '../../states/post-state/posts.model';
import { ActivatedRoute } from '@angular/router';
import { PostsQuery } from 'src/app/states/post-state/posts.query';
import { map } from 'rxjs/operators';
import { Subscription, Observable } from 'rxjs';
import { PostsQueryService } from 'src/app/states/post-state/posts-query.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit, OnDestroy {

  post: Post[];
  subscription: Subscription;

  // SKELETON CODE
  post$: Observable<Post>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private postsQuery: PostsQuery,
    private postsQueryService: PostsQueryService
  ) { }

  ngOnInit() {
    // Simply get a stream of the specific Post from the query
    const id: string = this.activatedRoute.snapshot.paramMap.get('id');
    this.post$ = this.postsQueryService.selectPost(id);


    this.getSelectedPost(); // TODO REMOVE THIS
  }

  ngOnDestroy() {
    this.subscription.unsubscribe(); // TODO REMOVE THIS AS ASYNC PIPE IS USED
  }

  /**
   * Get post selected by user to show post detail
   */
  async getSelectedPost(): Promise<any> {
    const postId: string = this.activatedRoute.snapshot.paramMap.get('id');

    if (!this.postsQuery.hasEntity(postId)) {
      await this.postsQueryService.getPostById(postId);
    }

    this.subscription = this.postsQuery.posts$.pipe(
      map(response => response.filter(post => post.id === postId))
    ).subscribe(response => this.post = response);
  }
}
