import { Component, OnInit } from '@angular/core';
import { ContactService } from '../contact.service';
import { Contact } from '../contact.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { NgForm } from '@angular/forms'; 

@Component({
  selector: 'app-contact-edit',
  standalone: false,
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {
  originalContact: Contact;
  contact: Contact;
  groupContacts: Contact[] = [];
  editMode: boolean = false;
  id: string;

  constructor(
    private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      if (!this.id) {
        this.editMode = false;
        return;
      }

      this.originalContact = this.contactService.getContact(this.id);
      if (!this.originalContact) return;

      this.editMode = true;
      this.contact = { ...this.originalContact };

      if (this.contact.group) {
        this.groupContacts = [...this.contact.group];
      }
    });
  }

  onSubmit(form: NgForm): void {
    if (form.invalid) {
      return;
    }
  
    this.contact.group = this.groupContacts; // Ensure group contacts are saved
  
    if (this.editMode) {
      this.contactService.updateContact(this.contact);
    } else {
      this.contactService.addContact(this.contact);
    }
  
    this.router.navigate(['/contacts']);
  }

  onRemoveItem(index: number): void {
    if (index >= 0 && index < this.groupContacts.length) {
      this.groupContacts.splice(index, 1);
      this.groupContacts = [...this.groupContacts]; // Trigger change detection
    }
  }
  
  

  onCancel(): void {
    this.router.navigate(['/contacts']);
  }

  // Handling the drop event to add dragged contact to the group
  onDrop(event: CdkDragDrop<Contact[]>): void {
    const draggedContact = event.item.data;
    if (this.isInvalidContact(draggedContact)) return;
    this.groupContacts.push(draggedContact);
  }
  isDraggingOver = false;

onDragEnter(): void {
  this.isDraggingOver = true;
}

onDragExit(): void {
  this.isDraggingOver = false;
}

  isInvalidContact(newContact: Contact): boolean {
    if (!newContact) return true;
    if (this.contact && newContact.id === this.contact.id) return true;

    for (let i = 0; i < this.groupContacts.length; i++) {
      if (newContact.id === this.groupContacts[i].id) {
        return true;
      }
    }
    return false;
  }
}
