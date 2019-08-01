import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../models/post';
import { PostDataService } from '../services/post-data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {
  post: Post;

  constructor(private postDataService: PostDataService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    // Khoi: I like how you put the code in a separate function with a
    //       descriptive function name. Very clean.
    this.getSelectedPost();
  }

  getSelectedPost(): void {
    // Get id of selected post by ActivatedRoute and convert it to number
    // Khoi: I think a better way to convert is to use Number(...) constructor
    //       E.g. `console.log(Number('1') + 1)` will print `2`
    const postId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.postDataService.getPostById(postId)
      .subscribe(post => this.post = post);
  }
}
