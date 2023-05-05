import { Component, OnInit } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit{

  messages: Message[] = [
    new Message('1', 'Subject 1', 'Message 1', 'Kira'),
    new Message('1', 'Subject 2', 'Message 2', 'Kira'),
    new Message('1', 'Subject 3', 'Message 3', 'Kira')
  ];

  constructor() { }

  ngOnInit() {
  }

  onAddMessage(message: Message) {
    this.messages.push(message);
  }
}
