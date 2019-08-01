import { Component, OnInit, OnChanges } from '@angular/core';
import { PostDataService } from '../services/post-data.service';
import { Post } from '../models/post';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {

  constructor(private postDataService: PostDataService) { }

  ngOnInit() {
  }

  add(title: string, body: string): void {
    if (!body || !title) { return; }

    const newPost: Post = {
      id: this.generatePostId(),
      title,
      body
    };
    this.postDataService.addPost(newPost);
  }

  generatePostId(): number {
    return this.postDataService.getPosts().size > 0 ?
      Math.max(...this.postDataService.getPosts().keys()) + 1 : 1;
  }
}
