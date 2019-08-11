import { PostsStore } from './posts.store';
import { GraphQLService } from 'src/app/services/graph-ql.service';
import { CreatePostInput, DeletePostInput, UpdatePostInput } from 'src/API';
import { createPost, deletePost, updatePost } from '../../../graphql/mutations';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(
    private postsStore: PostsStore,
    private graphQLService: GraphQLService,
    private router: Router
  ) { }

  async addPost(input: CreatePostInput): Promise<any> {
    this.postsStore.add({
      id: input.id,
      title: input.title,
      body: input.body
    });

    return await this.graphQLService.query(createPost, { input })
      .then(
        () => this.router.navigateByUrl('/home')
      );
  }

  async deletePost(input: DeletePostInput): Promise<any> {
    this.postsStore.remove(input.id);

    return await this.graphQLService.query(deletePost, { input });
  }

  async updatePost(input: UpdatePostInput): Promise<any> {
    this.postsStore.update(input.id, {
      title: input.title,
      body: input.body
    });

    return await this.graphQLService.query(updatePost, { input });
  }
}
