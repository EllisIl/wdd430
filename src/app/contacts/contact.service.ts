// src/app/contacts/contact.service.ts

import { Injectable } from '@angular/core';
import { Contact } from './contact.model';
import { Subject } from 'rxjs';
import { MOCKCONTACTS } from './MOCKCONTACTS';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contacts: Contact[] = [];
  selectedContactEvent = new Subject<Contact[]>();

  constructor() {
    this.contacts = [...MOCKCONTACTS];
  }

  getContacts(): Contact[] {
    return [...this.contacts];
  }

  getContact(id: string): Contact | undefined {
    return this.contacts.find(contact => contact.id === id);
  }

  addContact(contact: Contact): void {
    this.contacts.push(contact);
    this.selectedContactEvent.next(this.contacts);
  }

  updateContact(updatedContact: Contact): void {
    const index = this.contacts.findIndex(contact => contact.id === updatedContact.id);
    if (index >= 0) {
      this.contacts[index] = updatedContact;
      this.selectedContactEvent.next(this.contacts);
    }
  }

  // Add the deleteContact method
  deleteContact(contact: Contact): void {
    const index = this.contacts.findIndex(c => c.id === contact.id);
    if (index !== -1) {
      this.contacts.splice(index, 1);
      this.selectedContactEvent.next(this.contacts);
    }
  }
  updateContacts(updatedContacts: Contact[]): void {
    this.contacts = [...updatedContacts];
    this.selectedContactEvent.next(this.contacts);
  }
  removeContact(contactId: string): void {
    const index = this.contacts.findIndex(contact => contact.id === contactId);
    if (index !== -1) {
      this.contacts.splice(index, 1);
    }
  }
}
