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

  addMessage(newMessage: Message) {
    if (!newMessage) {
      return;
    }

    newMessage.id = '';
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http
      .post<{ message: string; newMessage: Message }>(
        'http://localhost:3000/messages',
        newMessage,
        { headers: headers }
      )
      .subscribe({
        next: (n) => {
          // this.messages.push(n.newMessage);
          console.log(n);
          this.messages = this.getMessages();
        },
        error: (e) => console.error(Error, 'an error occurred' + e),
        complete: () => {
          this.messageChangedEvent.next([...this.messages]);
        },
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
          this.messageChangedEvent.next([...this.messages]);
        },
        (error: any) => {
          console.log(error);
        }
      );
    return this.messages;
  }
}
