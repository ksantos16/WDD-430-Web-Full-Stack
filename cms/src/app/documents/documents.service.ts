import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { Document } from './document.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {

  private documents: Document[] = [];
  // orginalDocument: Document;

  selectedDocumentEvent = new EventEmitter<Document>();
  documentChangedEvent = new Subject<Document[]>();
  maxDocumentId: number;

  constructor(private http: HttpClient) {
    this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
  }

  getDocuments() {
   this.http.get<Document[]>('https://cms-project-511d5-default-rtdb.firebaseio.com/documents.json')
    .subscribe(
      // success method
      (documents: Document[]) => {
        this.documents = documents
        this.maxDocumentId = this.getMaxId()
        this.documents.sort((a, b) => a.name > b.name ? 1 : b.name > a.name ? -1 : 0)
        return this.documentChangedEvent.next(this.documents.slice())
    },
    // error method
    (error: any) => {
      console.log(error);
    })
  }


  getDoument(id: string): Document {
    return this.documents.find((document) => document.id === id);
  }

  // getDocuments(): Document[] {
  //   return this.documents
  //   .sort((a, b) => a.name > b.name ? 1 : b.name > a.name ? -1 : 0)
  //   .slice();
  // }

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
        maxId = currentId;
      }
    }
    return maxId;
  }

  addDocument(newDocument: Document) {
    if(!newDocument){
      return;
    }
    this.maxDocumentId++;
    newDocument.id=this.maxDocumentId.toString();
    this.documents.push(newDocument);

    const documentsListClone = this.documents.slice()
    this.documentChangedEvent.next(documentsListClone);
  }

  updateDocument(originalDocument: Document, newDocument: Document){
    if(!originalDocument || !newDocument){
      return;
    }
    const pos = this.documents.indexOf(originalDocument);
    if(pos < 0 ){
      return;
    }

    newDocument.id = originalDocument.id;
    this.documents[pos] = newDocument;
    const documentsListClone = this.documents.slice();
    this.documentChangedEvent.next(documentsListClone);
  }

  storeDocuments() {
    const list = this.documents = JSON.parse(JSON.stringify(this.documents));
    const header = { 'content-type': 'application/json'}
    this.http.put('https://cms-project-511d5-default-rtdb.firebaseio.com/documents.json',
    { 'headers': header })
    .subscribe(() => {
      const documentsListClone = this.documents.slice();
     return this.documentChangedEvent.next(documentsListClone);

    });
  }


}



