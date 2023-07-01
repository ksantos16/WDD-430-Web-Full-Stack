import { Message } from './message.model';
import { Injectable, EventEmitter } from '@angular/core';

import { Observable, map, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  messages: Message[] = [];
  messageChangedEvent = new Subject<Message[]>();

  constructor(private http: HttpClient) {}

  send() {
    this.messageChangedEvent.next(this.messages.slice());
  }

  addMessage(message: Message) {
    if (!message) {
      return;
    }

    message.id = '';

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // add to database
    this.http
      .post<{ message: string; messages: Message }>(
        'http://localhost:3000/messages',
        this.messages,
        { headers: headers }
      )
      .subscribe((responseData) => {
        // add new message to messages
        // this.messages.push(responseData.messages);
        // this.send();
        console.log(responseData);
        this.messages = this.getMessages();
      });
  }

  getMessage(id: string): Message {
    return this.messages.find((message) => message.id == id);
  }

  getMessages() {
    this.http
      .get<{ message: string; messages: Message[] }>(
        'http://localhost:3000/messages'
      )
      .subscribe(
        (responseData) => {
          this.messages = responseData.messages;
          this.send();
        },
        (error: any) => {
          console.log(error);
        }
      );
    return this.messages;
  }
}
