import { Component, OnInit } from '@angular/core';
import { switchMap, debounceTime, tap, map } from 'rxjs/operators';
import { Post } from '../models/post';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit {
  post: Post;
  constructor() { }

  ngOnInit() {
  }

  searchPost() {

  }
}
