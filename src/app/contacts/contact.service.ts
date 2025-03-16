import { Injectable } from '@angular/core';
import { Contact } from './contact.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contacts: Contact[] = [];
  contactListChangedEvent = new Subject<Contact[]>();
  private firebaseUrl = 'https://foard-wdd430-default-rtdb.firebaseio.com/contacts.json'; 

  constructor(private http: HttpClient) {}

  getContacts() {
    this.http.get<Contact[]>(this.firebaseUrl).subscribe(
      (contacts: Contact[]) => {
        this.contacts = contacts || []; // Ensure contacts is always an array
        this.contacts.sort((a, b) => a.name.localeCompare(b.name));
        this.contactListChangedEvent.next([...this.contacts]);
      },
      (error) => console.error('Error fetching contacts:', error)
    );
  }

  getContact(id: string): Contact | undefined {
    return this.contacts.find(contact => contact.id === id);
  }

  addContact(contact: Contact): void {
    if (!contact) return;
    this.contacts.push(contact);
    this.storeContacts();
  }

  updateContact(updatedContact: Contact): void {
    const index = this.contacts.findIndex(contact => contact.id === updatedContact.id);
    if (index !== -1) {
      this.contacts[index] = updatedContact;
      this.storeContacts();
    }
  }

  deleteContact(contact: Contact): void {
    const index = this.contacts.findIndex(c => c.id === contact.id);
    if (index !== -1) {
      this.contacts.splice(index, 1);
      this.storeContacts();
    }
  }

  storeContacts(): void {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.put(this.firebaseUrl, this.contacts, { headers }).subscribe(
      () => this.contactListChangedEvent.next([...this.contacts]),
      (error) => console.error('Error saving contacts:', error)
    );
  }
}
