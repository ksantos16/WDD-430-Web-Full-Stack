import { MOCKMESSAGES } from './MOCKMESSAGES';
import { Message } from './message.model';
import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  messages: Message[] = [];
  messageChangedEvent = new EventEmitter<Message[]>

  constructor() {
    this.messages = MOCKMESSAGES;
  }

  addMessage(message: Message) {
    this.messages.push(message);
    this.messageChangedEvent.emit(this.messages.slice());
  }

  getMessage(id: string): Message {
    return this.messages.find((message) => message.id == id);
  }

  getMessages(): Message[] {
    return this.messages.slice();
  }
}
