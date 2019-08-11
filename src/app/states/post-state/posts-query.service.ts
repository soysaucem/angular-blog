import { listPosts, getPost } from '../../../graphql/queries';
import { GraphQLService } from 'src/app/services/graph-ql.service';
import { PostsStore } from './posts.store';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from './posts.model';

@Injectable({
  providedIn: 'root'
})
export class PostsQueryService { // SHOULD BE MERGED WITH PostQuery

  constructor(
    private graphQLService: GraphQLService,
    private postsStore: PostsStore
  ) { }

  /**
   * check if store has data
   * if it does, simply return this.selectEntity(id)
   * if it doesn't, attempt to retrieve data from the backend
   *
   * ADVANCED: at the end of this step, also **subscribe** to any updates
   *           of that post for some awesome real-time stuff.
   */
  selectPost(id: string): Observable<Post> {
    return;
  }

  async getPostsFromServer(): Promise<any> {
    return await this.graphQLService.query(listPosts, null)
      .then(
        (response) => this.postsStore.set(response.data.listPosts.items)
      );
  }

  async getPostById(id: string): Promise<any> {
    return await this.graphQLService.query(getPost, { id })
      .then(
        (response) => this.postsStore.set(response.data)
      );
  }
}
