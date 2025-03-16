import { Pipe, PipeTransform } from '@angular/core';
import { Contact } from './contact.model';

@Pipe({
  name: 'contactsFilter',
  standalone: false,  // Setting this to false allows the pipe to be used in standalone components
  pure: false,  // Setting this to false ensures the pipe updates when the input changes
})
export class ContactsFilterPipe implements PipeTransform {
  transform(contacts: Contact[], term: string): Contact[] {
    if (!contacts || !term) {
      return contacts;
    }
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(term.toLowerCase())
    );
  }
}
