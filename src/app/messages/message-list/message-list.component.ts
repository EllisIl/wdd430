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
    // Subscribe to the event instead of assigning the result of getMessages()
    this.messageService.messageChangedEvent.subscribe((messages: Message[]) => {
      this.messages = messages;
    });

    // Ensure messages load initially
    this.messageService.getMessages();
  }

  onAddMessage(message: Message) {
    this.messageService.addMessage(message); // Let the service handle updates
  }
}
