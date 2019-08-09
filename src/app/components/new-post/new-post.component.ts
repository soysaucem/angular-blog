import { Component, OnInit } from '@angular/core';
import { Post } from '../../states/post-state/posts.model';
import { CreatePostInput } from 'src/API';
import { PostsService } from 'src/app/states/post-state/posts.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {

  constructor(private postsService: PostsService) { }

  ngOnInit() {
  }

  async onAddPost(title: string, body: string) {
    if (!body || !title) { return; }

    const newPost: CreatePostInput = {
      id: null,
      title,
      body
    };

    return await this.postsService.addPost(newPost);
  }
}
