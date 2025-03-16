import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-contact-list',
  standalone: false,
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  contacts: Contact[] = [];
  term: string = '';

  @Output() contactSelected = new EventEmitter<Contact>();

  constructor(private contactService: ContactService) {}

  ngOnInit() {
    this.contactService.contactListChangedEvent.subscribe((contacts: Contact[]) => {
      this.contacts = contacts;
    });

    this.contactService.getContacts(); // Fetch contacts on init
  }

  onSelected(contact: Contact): void {
    this.contactSelected.emit(contact);
  }

  search(value: string): void {
    this.term = value;
  }

  onDrop(event: CdkDragDrop<Contact[]>): void {
    const draggedContact = event.item.data;
    this.contactService.deleteContact(draggedContact.id);
  }
}
