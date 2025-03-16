import { Component, Input, OnInit } from '@angular/core';
import { ContactService } from '../../contacts/contact.service';
import { Message } from '../message.model';
import { Contact } from '../../contacts/contact.model';

@Component({
  selector: 'app-message-item',
  standalone: false,
  templateUrl: './message-item.component.html',
})
export class MessageItemComponent implements OnInit {
  @Input() message: Message;
  messageSender: string;

  constructor(private contactService: ContactService) {}

  ngOnInit() {
    this.contactService.getContacts(); // Trigger the data fetch
    this.contactService.contactListChangedEvent.subscribe(() => {
      const contact: Contact = this.contactService.getContact(this.message.sender);
      if (contact) {
        this.messageSender = contact.name;
      } else {
        console.warn('Contact not found for sender:', this.message.sender);
        this.messageSender = 'Unknown';
      }
    });
  }
}
