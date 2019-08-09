import { listPosts, getPost } from '../../../graphql/queries';
import { GraphQLService } from 'src/app/services/graph-ql.service';
import { PostsStore } from './posts.store';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PostsQueryService {

  constructor(
    private graphQLService: GraphQLService,
    private postsStore: PostsStore
  ) { }

  async getPostsFromServer(): Promise<any> {
    return await this.graphQLService.query(listPosts, null)
      .then(
        (response) => this.postsStore.set(response.data.listPosts.items)
      );
  }

  async getPostByID(id: string): Promise<any> {
    return await this.graphQLService.query(getPost, { id })
      .then(
        (response) => this.postsStore.set(response.data)
      );
  }
}
