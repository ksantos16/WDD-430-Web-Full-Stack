import { Component, OnInit } from '@angular/core';
import { Document } from './document.model';
import { DocumentsService } from './documents.service';

@Component({
  selector: 'cms-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit{
  selectedDocument: Document;

  constructor(private documentService: DocumentsService) { }

  ngOnInit() {
    this.documentService.selectedDocumentEvent.subscribe(
      (document: Document) => {
        this.selectedDocument = document;
      }
    );
  }

}
