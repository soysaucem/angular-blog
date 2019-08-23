import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { switchMap, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { Post } from 'src/app/states/post-state/posts.model';
import { PostsQuery } from 'src/app/states/post-state/posts.query';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})
export class SearchBoxComponent implements OnInit {

  @Input() showSearchBox: boolean;
  @Output() showSearchBoxChange = new EventEmitter();
  posts$: Observable<Post[]>;
  private searchInput = new BehaviorSubject<string>(null);

  constructor(private postsQuery: PostsQuery) { }

  ngOnInit() {
    this.searchPosts();
  }

  closeSearchBox(): void {
    this.showSearchBox = !this.showSearchBox;
    this.showSearchBoxChange.emit(this.showSearchBox);
  }

  setSearchInput(input: string): void {
    this.searchInput.next(input);
  }

  searchPosts(): void {
    this.posts$ = this.searchInput.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(input => this.postsQuery.selectPosts(input))
    );
  }
}
