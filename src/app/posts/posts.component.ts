import { Component, OnInit } from '@angular/core';
import { Post } from '../models/post';
import { PostDataService } from '../services/post-data.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts: Post[];

  constructor(private postDataService: PostDataService) { }

  ngOnInit() {
    this.getPosts();
  }

  getPosts(): void {
    this.postDataService.getPosts()
      .forEach(
        (value) => {
          if(this.posts === undefined) {
            value.subscribe(post => this.posts = [post]);
          } else {
            value.subscribe(post => this.posts.push(post));
          }
        }
      );
  }
}
