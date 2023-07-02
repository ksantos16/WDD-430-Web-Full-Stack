import { ActivatedRoute, Router, Params } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contacts.service';

@Component({
  selector: 'cms-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css'],
})
export class ContactDetailComponent implements OnInit {
  contact: Contact;
  id: string;

  constructor(
    private contactService: ContactService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.contactService.getContact(this.id).subscribe((contactData) => {
        this.contact = contactData.contact;
      });
    });
  }

  onDelete() {
    this.contactService.deleteContact(this.contact);
    console.log(this.contact);
    this.router.navigate(['contacts']);
  }
}
