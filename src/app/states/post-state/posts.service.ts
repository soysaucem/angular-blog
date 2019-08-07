import { PostsStore } from './posts.store';
import { GraphQLService } from 'src/app/services/graph-ql.service';
import { CreatePostInput } from 'src/API';
import { createPost } from '../../../graphql/mutations';
import { Post } from './posts.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(
    private postsStore: PostsStore,
    private graphQLService: GraphQLService
  ) { }

  async addPost(input: CreatePostInput): Promise<any> {

    this.postsStore.add({ id: input.id, title: input.title, body: input.body });

    return await this.graphQLService.query(createPost, { input });
  }
}
