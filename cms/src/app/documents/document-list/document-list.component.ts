import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit{
  @Output() selectedDocumentEvent = new EventEmitter<Document>();

  documents: Document[] = [
    new Document(
      '1',
      'Document 1',
      'Document 1 Description',
      'link 1',
      null),
    new Document(
      '2',
      'Document 2',
      'Document 2 Description',
      'link 2',
      null),
    new Document(
      '3',
      'Document 3',
      'Document 3 Description',
      'link 3',
      null),
    new Document(
      '4',
      'Document 4',
      'Document 4 Description',
      'link 4',
      null),
  ];

  constructor() { }

  ngOnInit(){
  }

  onSelectedDocument(document: Document) {
    this.selectedDocumentEvent.emit(document);
  }

}
