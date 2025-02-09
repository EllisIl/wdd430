import { Injectable, EventEmitter, Output } from '@angular/core';
import { MOCKMESSAGES } from './MOCKMESSAGES';
import { Message } from './message.model';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  @Output() messageChangedEvent = new EventEmitter<Message[]>(); // Emits an array

  messages: Message[] = [];

  constructor() { 
    this.messages = MOCKMESSAGES;
  }

  getMessages(): Message[] {
    return this.messages.slice(); // Returns a copy of the array
  }

  addMessage(message: Message): void {
    this.messages.push(message);
    this.messageChangedEvent.emit(this.messages.slice()); // Emits a copy of the updated array
  }
}
