import { Component, OnInit } from '@angular/core';
import { switchMap, debounceTime, tap, map } from 'rxjs/operators';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit {
  constructor() { }

  ngOnInit() {
  }

  searchPost() {

  }
}
