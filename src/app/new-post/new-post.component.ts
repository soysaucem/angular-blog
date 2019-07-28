import { Component, OnInit, OnChanges } from '@angular/core';
import { PostDataService } from '../services/post-data.service';
import { Post } from '../models/post';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {
  postsData: Post[];

  constructor(private postDataService: PostDataService) { }

  ngOnInit() {
    this.postDataService.getPosts().subscribe((posts) => this.postsData = posts);
  }

  // ngOnChanges() {
  //   this.postDataService.getPosts().subscribe((posts) => this.postsData = posts);
  // }

  add(title: string, body: string): void {
    const newPost: Post = {
      id: this.generatePostId(),
      title,
      body
    };

    const titleInputField = document.getElementById('post-title') as HTMLInputElement;
    const contentInputField = document.getElementById('post-content') as HTMLInputElement;
    titleInputField.value = '';
    contentInputField.value = '';
    this.postDataService.addNewPost(newPost).subscribe();
  }

  generatePostId(): number {
    return this.postsData.length > 0 ? Math.max(...this.postsData.map(post => post.id)) + 1 : 1;
  }
}
