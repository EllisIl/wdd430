import { Component, OnInit } from '@angular/core';
import { Contact } from './contact.model';
import { ContactService } from './contact.service';

@Component({
  selector: 'app-contacts',
  standalone: false,
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  selectedContact!: Contact;

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.contactService.contactListChangedEvent.subscribe((contacts: Contact[]) => {
      if (contacts.length > 0) {
        this.selectedContact = contacts[0]; // Select the first contact by default
      }
    });

    this.contactService.getContacts();
  }
}
