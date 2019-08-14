import { Component, OnInit } from '@angular/core';
import { Post } from '../../states/post-state/posts.model';
import { PostsQuery } from 'src/app/states/post-state/posts.query';
import { Observable } from 'rxjs';
import { Button } from 'src/app/services/command/button-command/button';
import { DeleteCommandService } from 'src/app/services/command/button-command/delete-command.service';
import { DeleteType } from 'src/app/classes/deleteType';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  posts$: Observable<Post[]>;
  deletePostButton: Button = new Button();

  constructor(
    private postsQuery: PostsQuery,
    private deleteCommandService: DeleteCommandService
  ) { }

  ngOnInit() {
    this.posts$ = this.postsQuery.getPosts();
    this.deletePostButton.setCommand(this.deleteCommandService);
    this.deletePostButton.setType(DeleteType.POST_DELETE);
  }
}
