import { Component, OnInit } from '@angular/core';
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

  addNewPost(post: Post): void {
    this.postDataService.addNewPost(post).subscribe();
  }
}
