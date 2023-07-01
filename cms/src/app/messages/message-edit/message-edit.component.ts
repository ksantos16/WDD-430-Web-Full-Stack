import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter,
} from '@angular/core';
import { Message } from '../message.model';
import { MessagesService } from '../messages.service';
import { Contact } from 'src/app/contacts/contact.model';
import { ContactService } from 'src/app/contacts/contacts.service';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css'],
})
export class MessageEditComponent implements OnInit {
  @ViewChild('subject') subject: ElementRef;
  @ViewChild('msgText') msgText: ElementRef;
  @Output() addMessageEvent = new EventEmitter<Message>();
  currentSender: Contact;
  message: Message;

  constructor(
    private messageService: MessagesService,
    private contactService: ContactService
  ) {}

  ngOnInit() {
    this.contactService.getContact('101').subscribe((response) => {
      this.currentSender = response.contact;
    });
  }

  onSendMessage() {
    const subjectValue = this.subject.nativeElement.value;
    const msgTextValue = this.msgText.nativeElement.value;

    this.message = new Message(
      '',
      subjectValue,
      msgTextValue,
      this.currentSender
    );

    console.log(this.message);
    this.messageService.addMessage(this.message);
    this.onClear();
  }

  onClear() {
    this.subject.nativeElement.value = '';
    this.msgText.nativeElement.value = '';
  }
}
