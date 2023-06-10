import {Injectable, EventEmitter} from '@angular/core';
import {Contact} from './contact.model';
import {MOCKCONTACTS} from './MOCKCONTACTS';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
   private contacts: Contact [] = [];

   contactSelectedEvent = new EventEmitter<Contact>();
   contactChangedEvent = new Subject<Contact[]>();
   maxContactId: number;



   constructor() {
      this.contacts = MOCKCONTACTS;
      this.maxContactId = this.getMaxId();
   }

   getContact(id: string): Contact {
    return this.contacts.find((contact) => contact.id === id);
  }

   getContacts(): Contact[] {
    return this.contacts
    .sort((a, b) => a.name > b.name ? 1 : b.name > a.name ? -1 : 0)
    .slice();
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
    this.contactChangedEvent.next(this.contacts.slice());
  }

  getMaxId(): number{
    let maxId = 0

    for(let contact of this.contacts){
      const currentId = +contact.id;
      if(currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  addContact(newContact: Contact) {
    if(!newContact){
      return;
    }
    this.maxContactId++;
    newContact.id=this.maxContactId.toString();
    this.contacts.push(newContact);

    const contactsListClone = this.contacts.slice()
    this.contactChangedEvent.next(contactsListClone);
  }

  updateContact(originalContact: Contact, newContact: Contact){
    if(!originalContact || !newContact){
      return;
    }
    const pos = this.contacts.indexOf(originalContact);
    if(pos < 0 ){
      return;
    }

    newContact.id = originalContact.id;
    this.contacts[pos] = newContact;
    const contactsListClone = this.contacts.slice()
    this.contactChangedEvent.next(contactsListClone);
  }



}
