import { Component, Input, OnInit } from '@angular/core';
import { ContactService } from '../../contacts/contact.service';
import { Message } from '../message.model';
import { Contact } from '../../contacts/contact.model';

@Component({
  selector: 'app-message-item',
  standalone: false,
  templateUrl: './message-item.component.html',
})
export class MessageItemComponent implements OnInit{
  @Input() message: Message;

  messageSender: string;

  constructor(private contactService: ContactService) {}
  
  ngOnInit() {
     const contact: Contact = this.contactService.getContact(this.message.sender);
     this.messageSender = contact.name;
  }
}