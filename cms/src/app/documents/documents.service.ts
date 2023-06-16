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
  // orginalDocument: Document;

  selectedDocumentEvent = new EventEmitter<Document>();
  documentChangedEvent = new Subject<Document[]>();
  maxDocumentId: number;

  constructor(private http: HttpClient) {
    // this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
  }

  getMaxId(): number {
    let maxId = 0;

    for (let document of this.documents) {
      const currentId = +document.id;
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  storeDocuments() {
    const documentsListClone = JSON.parse(JSON.stringify(this.documents));
    const headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'my-auth-token',
      }),
    };
    this.http
      .put<Document[]>(
        'https://cms-project-511d5-default-rtdb.firebaseio.com/documents.json',
        documentsListClone,
        headers
      )
      .subscribe({
        next: (n) => {
          this.documents = n;
        },
        error: (e) => console.error(e),
        complete: () => {
          this.documentChangedEvent.next(this.documents.slice());
        },
      });
  }

  addDocument(newDocument: Document) {
    if (!newDocument) {
      return;
    }
    this.maxDocumentId++;
    newDocument.id = this.maxDocumentId.toString();
    this.documents.push(newDocument);

    this.storeDocuments();
  }

  getDocuments(): Document[] {
    this.http
      .get<Document[]>(
        'https://cms-project-511d5-default-rtdb.firebaseio.com/documents.json'
      )
      .pipe(
        map((responseData) => {
          const documents: Document[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              documents.push({ ...responseData[key], id: key });
            }
          }
          return documents;
        })
      )
      .subscribe(
        // success method
        (documents: Document[]) => {
          this.documents = documents;
          this.maxDocumentId = this.getMaxId();
          this.documents.sort((a, b) =>
            a.name > b.name ? 1 : b.name > a.name ? -1 : 0
          );
          return this.documentChangedEvent.next(this.documents.slice());
        },
        // error method
        (error: any) => {
          console.log(error);
        }
      );
    return this.documents.slice();
  }

  getDoument(id: string): Document {
    return this.documents.find((document) => document.id === id);
  }

  // getDocuments(): Document[] {
  //   return this.documents
  //   .sort((a, b) => a.name > b.name ? 1 : b.name > a.name ? -1 : 0)
  //   .slice();
  // }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if (!originalDocument || !newDocument) {
      return;
    }
    const pos = this.documents.indexOf(originalDocument);
    if (pos < 0) {
      return;
    }

    newDocument.id = originalDocument.id;
    this.documents[pos] = newDocument;
    this.storeDocuments();
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
    this.storeDocuments();
  }
}
