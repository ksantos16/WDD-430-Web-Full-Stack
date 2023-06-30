import { Injectable, EventEmitter } from '@angular/core';
import { Subject, map } from 'rxjs';
import { Document } from './document.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

@Injectable({
  providedIn: 'root',
})
export class DocumentsService {
  private documents: Document[] = [];

  selectedDocumentEvent = new EventEmitter<Document>();
  documentChangedEvent = new Subject<Document[]>();

  constructor(private http: HttpClient) {}

  sendAndSort() {
    this.documents.sort((a, b) =>
      a.name > b.name ? 1 : b.name > a.name ? -1 : 0
    );
    this.documentChangedEvent.next(this.documents.slice());
  }

  addDocument(documents: Document) {
    if (!documents) {
      return;
    }

    // make sure id of the new Document is empty
    documents.id = '';

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // add to database
    this.http
      .post<{ message: string; document: Document }>(
        'http://localhost:3000/documents',
        documents,
        { headers: headers }
      )
      .subscribe((responseData) => {
        // add new document to documents
        this.documents.push(responseData.document);
        this.sendAndSort();
      });
  }

  getDocuments() {
    this.http
      .get<{ message: string; documents: Document[] }>(
        'http://localhost:3000/documents'
      )
      .subscribe(
        (responseData) => {
          this.documents = responseData.documents;
          this.sendAndSort();
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  getDoument(id: string): Document {
    for (const document of this.documents) {
      if (document.id === id) {
        return document;
      }
      return null;
    }
  }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if (!originalDocument || !newDocument) {
      return;
    }

    const pos = this.documents.findIndex((d) => d.id === originalDocument.id);
    if (pos < 0) {
      return;
    }

    // set the id of the new Document to the id of the old Document
    newDocument.id = originalDocument.id;
    // newDocument._id = originalDocument._id;

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // update database
    this.http
      .put(
        'http://localhost:3000/documents/' + originalDocument.id,
        newDocument,
        { headers: headers }
      )
      .subscribe((response: Response) => {
        this.documents[pos] = newDocument;
        this.sendAndSort();
      });
  }

  deleteDocument(document: Document) {
    if (!document) {
      return;
    }

    const pos = this.documents.findIndex((d) => d.id === document.id);

    if (pos < 0) {
      return;
    }

    // delete from database
    this.http
      .delete('http://localhost:3000/documents/' + document.id)
      .subscribe((response: Response) => {
        this.documents.splice(pos, 1);
        this.sendAndSort();
      });
  }
}
