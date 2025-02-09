import { Component, OnInit } from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-message-list',
  standalone: false,
  templateUrl: './message-list.component.html',
})
export class MessageListComponent implements OnInit {
  messages: Message[] = [];

  constructor(private messageService: MessageService) {}

  ngOnInit() {
    // Initialize messages from the service
    this.messages = this.messageService.getMessages();

    // Subscribe to message changes and update the list
    this.messageService.messageChangedEvent
      .subscribe((messages: Message[]) => {
        this.messages = messages; // Replace the entire array
      });
  }

  onAddMessage(message: Message) {
    this.messageService.addMessage(message); // Let the service handle updates
  }
}
