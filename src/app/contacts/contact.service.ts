import { Injectable, EventEmitter } from '@angular/core';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  selectedContactEvent = new EventEmitter<Contact[]>;

  contacts: Contact[] = [];

  constructor() { 
    this.contacts = MOCKCONTACTS;
  }
  getContacts(): Contact[] {
    return this.contacts.slice();
  }
  getContact(contact: string): Contact {
    return this.contacts.find(c => c.id === contact);
  }

  deleteContact(contact: Contact) {
    if (!contact) {
      return;
    }
    const pos = this.contacts.indexOf(contact);
    if (pos < 0) {
      return;
    }
    this.contacts.splice(pos, 1);
    this.selectedContactEvent.emit(this.contacts.slice());
  }
}
