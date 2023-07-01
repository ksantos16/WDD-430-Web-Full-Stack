import { Injectable, EventEmitter } from '@angular/core';
import { Subject, map } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Contact } from './contact.model';
import { response } from 'express';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private contacts: Contact[] = [];

  contactSelectedEvent = new EventEmitter<Contact[]>();
  contactChangedEvent = new Subject<Contact[]>();

  constructor(private http: HttpClient) {}

  sendAndSort() {
    this.contacts.sort((a, b) =>
      a.name > b.name ? 1 : b.name > a.name ? -1 : 0
    );
    this.contactChangedEvent.next(this.contacts.slice());
  }

  addContact(contacts: Contact) {
    if (!contacts) {
      return;
    }
    contacts.id = '';

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http
      .post<{ message: string; contact: Contact }>(
        'http://localhost:3000/contacts',
        contacts,
        { headers: headers }
      )
      .subscribe((responseData) => {
        this.contacts.push(responseData.contact);
        this.sendAndSort();
      });
  }

  getContacts() {
    this.http
      .get<{ message: string; contacts: Contact[] }>(
        'http://localhost:3000/contacts/'
      )
      .subscribe(
        (responseData) => {
          this.contacts = responseData.contacts;
          this.sendAndSort();
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  getContact(id: string) {
    return this.http.get<{ message: string; contact: Contact }>(
      'http://localhost:3000/contacts/' + id
    );
  }

  updateContact(originalContact: Contact, newContact: Contact) {
    if (!originalContact || !newContact) {
      return;
    }
    const pos = this.contacts.findIndex((c) => c.id === originalContact.id);
    if (pos < 0) {
      return;
    }

    newContact.id = originalContact.id;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http
      .put('http://localhost:3000/contacts' + originalContact.id, newContact, {
        headers: headers,
      })
      .subscribe((response: Response) => {
        this.contacts[pos] = newContact;
        this.sendAndSort();
      });
  }

  deleteContact(contact: Contact) {
    if (!contact) {
      return;
    }
    const pos = this.contacts.findIndex((c) => c.id === contact.id);

    if (pos < 0) {
      return;
    }

    this.http
      .delete('http://localhost:3000/contacts/' + contact.id)
      .subscribe((response: Response) => {
        this.contacts.splice(pos, 1);
        this.sendAndSort();
      });
  }
}
