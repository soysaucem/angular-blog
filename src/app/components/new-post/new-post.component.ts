import { Component, OnInit } from '@angular/core';
import { Button } from 'src/app/services/command/button-command/button';
import { AddCommandService } from 'src/app/services/command/button-command/add-command.service';
import { AddType } from 'src/app/classes/addType';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent implements OnInit {

  addPostButton: Button = new Button();

  constructor(private addCommandService: AddCommandService) { }

  ngOnInit() {
    this.addPostButton.setCommand(this.addCommandService);
    this.addPostButton.setType(AddType.POST_ADD);
  }
}
