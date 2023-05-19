import { Injectable, EventEmitter } from '@angular/core';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Document } from './document.model';

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {
  private documents: Document[] = [];

  selectedDocumentEvent = new EventEmitter<Document>();

  constructor() {
    this.documents = MOCKDOCUMENTS;
  }

  getDoument(id: string): Document {
    return this.documents.find((document) => document.id === id);
  }

   getDocuments(): Document[] {
    return this.documents
    .sort((a, b) => a.name > b.name ? 1 : b.name > a.name ? -1 : 0)
    .slice();
   }
}
