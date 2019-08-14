import { Injectable } from '@angular/core';
import { Command } from '../command.model';
import { ToggleType } from 'src/app/classes/toggleType';

@Injectable({
  providedIn: 'root'
})
export class ToggleCommandService implements Command {

  constructor() { }

  execute(type: ToggleType, params: any) {
    switch (type) {
      case ToggleType.COMMENT_MENU:
        if (params.event.target.nextSibling.style.display === 'none') {
          params.event.target.nextSibling.style.display = 'block';
        } else {
          params.event.target.nextSibling.style.display = 'none';
        }
        break;
      case ToggleType.COMMENT_EDIT:
        const commentContent = params.event.target.parentNode.parentNode.parentNode
        .parentNode.childNodes[1].childNodes[0] as HTMLElement;
        const liCommentElement = params.event.target.parentNode.parentNode.parentNode.parentNode;
        // Toggle contenteditable mode of a comment
        commentContent.setAttribute('contenteditable', 'true');
        // Focus on comment content area after triggered edit mode
        liCommentElement.childNodes[1].childNodes[0].focus();
        // Show submit button to post new comment content
        liCommentElement.childNodes[2].style.display = 'block';
        // Hide comment menu after selected edit comment
        params.event.target.parentNode.style.display = 'none';
        break;
      default:
        throw new Error('ToggleCommand failed to execute');
    }
  }
}
