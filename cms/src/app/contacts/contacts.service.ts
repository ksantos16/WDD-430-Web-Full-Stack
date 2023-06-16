import { Injectable, EventEmitter } from '@angular/core';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';
import { Subject, map } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private contacts: Contact[] = [];

  contactSelectedEvent = new EventEmitter<Contact>();
  contactChangedEvent = new Subject<Contact[]>();
  maxContactId: number;

  constructor(private http: HttpClient) {
    // this.contacts = MOCKCONTACTS;
    this.maxContactId = this.getMaxId();
  }

  //  getContacts(): Contact[] {
  //   return this.contacts
  //   .sort((a, b) => a.name > b.name ? 1 : b.name > a.name ? -1 : 0)
  //   .slice();
  //  }

  getMaxId(): number {
    let maxId = 0;

    for (let contact of this.contacts) {
      const currentId = +contact.id;
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  storeContacts() {
    const contactsListClone = JSON.parse(JSON.stringify(this.contacts));
    const headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'my-auth-token',
      }),
    };
    this.http
      .put<Contact[]>(
        'https://cms-project-511d5-default-rtdb.firebaseio.com/contacts.json',
        contactsListClone,
        headers
      )
      .subscribe({
        next: (n) => {
          this.contacts = n;
        },
        error: (e) => console.error(e),
        complete: () => {
          this.contactChangedEvent.next(this.contacts.slice());
        },
      });
  }

  addContact(newContact: Contact) {
    if (!newContact) {
      return;
    }
    this.maxContactId++;
    newContact.id = this.maxContactId.toString();
    this.contacts.push(newContact);

    this.storeContacts();
  }

  getContacts(): Contact[] {
    this.http
      .get<Contact[]>(
        'https://cms-project-511d5-default-rtdb.firebaseio.com/contacts.json'
      )
      .pipe(
        map((responseData: any) => {
          const contacts: Contact[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              contacts.push({ ...responseData[key], id: key });
            }
          }
          return contacts;
        })
      )
      .subscribe(
        // success method
        (contacts: Contact[]) => {
          this.contacts = contacts;
          this.maxContactId = this.getMaxId();
          this.contacts.sort((a, b) =>
            a.name > b.name ? 1 : b.name > a.name ? -1 : 0
          );
          return this.contactChangedEvent.next(this.contacts.slice());
        },
        // error method
        (error: any) => {
          console.log(error);
        }
      );
    return this.contacts.slice();
  }

  getContact(id: string): Contact {
    return this.contacts.find((contact) => contact.id === id);
  }

  updateContact(originalContact: Contact, newContact: Contact) {
    if (!originalContact || !newContact) {
      return;
    }
    const pos = this.contacts.indexOf(originalContact);
    if (pos < 0) {
      return;
    }

    newContact.id = originalContact.id;
    this.contacts[pos] = newContact;
    this.storeContacts();
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
    this.storeContacts();
  }
}
