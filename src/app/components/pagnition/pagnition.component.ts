import { Component, OnInit, Input, Output } from '@angular/core';
import { EventEmitter } from 'events';

@Component({
  selector: 'app-pagnition',
  templateUrl: './pagnition.component.html',
  styleUrls: ['./pagnition.component.scss']
})
export class PagnitionComponent implements OnInit {
  @Input() maxPages: number;
  @Input() itemPerPage: number;

  @Output() pageChange = new EventEmitter();
  
  constructor() { }

  ngOnInit() {
  }

  generatePages(): void {

  }

}
