import { MOCKMESSAGES } from './MOCKMESSAGES';
import { Message } from './message.model';
import { Injectable, EventEmitter } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, map, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  messages: Message[] = [];
  // messageChangedEvent = new EventEmitter<Message[]>();
  messageChangedEvent = new Subject<Message[]>();
  maxMessageId: number;

  constructor(private http: HttpClient) {
    // this.messages = MOCKMESSAGES;
    this.maxMessageId = this.getMaxId();
  }

  getMaxId(): number {
    let maxId = 0;

    for (let message of this.messages) {
      const currentId = +message.id;
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  storeMessages() {
    const messagesListClone = JSON.parse(JSON.stringify(this.messages));
    const headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'my-auth-token',
      }),
    };
    this.http
      .put<Message[]>(
        'https://cms-project-511d5-default-rtdb.firebaseio.com/messages.json',
        messagesListClone,
        headers
      )
      .subscribe({
        next: (n) => {
          this.messages = n;
        },
        error: (e) => console.error(e),
        complete: () => {
          this.messageChangedEvent.next(this.messages.slice());
        },
      });
  }

  addMessage(message: Message) {
    this.messages.push(message);
    this.storeMessages();
  }

  getMessage(id: string): Message {
    return this.messages.find((message) => message.id == id);
  }

  // getMessages(): Message[] {
  //   return this.messages.slice();
  // }

  getMessages(): Message[] {
    this.http
      .get<Message[]>(
        'https://cms-project-511d5-default-rtdb.firebaseio.com/messages.json'
      )
      .pipe(
        map((responseData) => {
          const messages: Message[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              messages.push({ ...responseData[key], id: key });
            }
          }
          return messages;
        })
      )
      .subscribe(
        // success method
        (messages: Message[]) => {
          this.messages = messages;
          this.maxMessageId = this.getMaxId();
          return this.messageChangedEvent.next(this.messages.slice());
        },
        // error method
        (error: any) => {
          console.log(error);
        }
      );
    return this.messages.slice();
  }
}
