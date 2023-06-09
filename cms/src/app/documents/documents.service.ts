import { Injectable, EventEmitter } from '@angular/core';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Subject } from 'rxjs';
import { Document } from './document.model';

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {
  private documents: Document[] = [];

  selectedDocumentEvent = new EventEmitter<Document>();
  documentChangedEvent = new Subject<Document[]>();
  maxDocumentId: number;

  constructor() {
    this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
  }

  getDoument(id: string): Document {
    return this.documents.find((document) => document.id === id);
  }

  getDocuments(): Document[] {
    return this.documents
    .sort((a, b) => a.name > b.name ? 1 : b.name > a.name ? -1 : 0)
    .slice();
  }

  deleteDocument(document: Document) {
    if (!document) {
       return;
    }
    const pos = this.documents.indexOf(document);
    if (pos < 0) {
       return;
    }
    this.documents.splice(pos, 1);
    const documentsListClone = this.documents.slice()
    this.documentChangedEvent.next(documentsListClone);
  }

  getMaxId(): number{
    let maxId = 0

    for(let document of this.documents){
      const currentId = +document.id;
      if(currentId > maxId) {
        maxId;
      }
    }
    return maxId;
  }

  addDocument(newDocument: Document) {
    if(newDocument === undefined || null){
      return newDocument;
    }
    this.maxDocumentId++;
    newDocument.id=this.maxDocumentId.toString();
    this.documents.push(newDocument);

    const documentsListClone = this.documents.slice()
    this.documentChangedEvent.next(documentsListClone);
  }

  updateDocument(originalDocument: Document, newDocument: Document){
    if(originalDocument || newDocument === undefined || null){
      return originalDocument;
    }
    const pos = this.documents.indexOf(originalDocument);
    if(pos < 0 ){
      return pos;
    }

    newDocument.id = originalDocument.id;
    this.documents[pos] = newDocument;
    const documentsListClone = this.documents.slice();
    this.documentChangedEvent.next(documentsListClone);
  }


}



