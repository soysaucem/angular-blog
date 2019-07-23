import { Component, OnInit } from '@angular/core';
import { Post } from '../post';
import { POSTS } from '../mock-posts';
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
    this.postDataService.getPosts().subscribe(posts => this.posts = posts);
  }
}
