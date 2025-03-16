import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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
    this.contacts = this.contactService.getContacts();

    this.contactService.selectedContactEvent.subscribe((contacts: Contact[]) => {
      this.contacts = contacts;
    });
  }

  onSelected(contact: Contact): void {
    this.contactSelected.emit(contact);
  }

  search(value: string): void {
    this.term = value;
  }

  onDrop(event: CdkDragDrop<Contact[]>): void {
    const draggedContact = event.item.data;

    // You could handle additional logic here, like removing the contact
    // from this list and adding it to the new list (groupContacts)
    this.contactService.removeContact(draggedContact.id);  // If you want to remove from the original list
  }
}
