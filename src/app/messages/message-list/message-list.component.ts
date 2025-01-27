import { Component } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'app-message-list',
  standalone: false,
  templateUrl: './message-list.component.html',
})
export class MessageListComponent {
  messages: Message[] = [
    new Message('1', 'Test 1', 'Hello World!', 'John Doe'),
    new Message('2', 'Test 2', 'Angular Rocks!', 'Jane Doe')
  ];

  onAddMessage(message: Message) {
    this.messages.push(message);
  }
}
