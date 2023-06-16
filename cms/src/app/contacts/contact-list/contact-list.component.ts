import { ContactService } from './../contacts.service';
import { Component, OnDestroy, OnInit} from '@angular/core';
import { Contact } from '../contact.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit, OnDestroy{

  contacts: Contact[] = [];
  term: string;

  private contactListChangedEvent: Subscription;

  constructor(private contactService: ContactService) { }

  ngOnInit() {
    this.contacts = this.contactService.getContacts();

   this.contactListChangedEvent = this.contactService.contactChangedEvent.subscribe(
      (contacts: Contact[]) => {
        this.contacts = contacts;
      }
    );
  }

  search(value: string) {
    this.term = value;
  }

  ngOnDestroy(): void {
    this.contactListChangedEvent.unsubscribe();
  }




}
