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
  @Input() post: Post;

  constructor(private postDataService: PostDataService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.getSelectedPost();
  }

  getSelectedPost(): void {
    // Get id of selected post by ActivatedRoute and convert it to number
    const id = +this.activatedRoute.snapshot.paramMap.get('id');

    this.postDataService.getPostByID(id).subscribe(post => this.post = post);
  }
}
