import { Injectable } from '@angular/core';
import { Message } from './message.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages: Message[] = [];
  messageChangedEvent = new Subject<Message[]>();
  maxMessageId: number = 0;
  private firebaseUrl = 'https://foard-wdd430-default-rtdb.firebaseio.com/messages.json'; // Replace with your Firebase URL

  constructor(private http: HttpClient) {
    this.getMessages();
  }

  getMessages(): void {
    this.http.get<Message[]>(this.firebaseUrl).subscribe(
      (messages: Message[]) => {
        this.messages = messages ? messages : [];
        this.maxMessageId = this.getMaxId();
        this.messages.sort((a, b) => +a.id - +b.id); // Sort messages by ID
        this.messageChangedEvent.next([...this.messages]);
      },
      (error) => console.error('Error fetching messages:', error)
    );
  }

  getMaxId(): number {
    return this.messages.length > 0 
      ? Math.max(...this.messages.map(message => +message.id)) 
      : 0;
  }

  addMessage(message: Message): void {
    if (!message) return;
    
    message.id = (this.maxMessageId + 1).toString();
    this.messages.push(message);
    this.storeMessages();
  }

  private storeMessages(): void {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.put(this.firebaseUrl, this.messages, { headers }).subscribe(
      () => this.messageChangedEvent.next([...this.messages]),
      (error) => console.error('Error saving messages:', error)
    );
  }
}
