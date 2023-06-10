import { Component, OnInit } from '@angular/core';
import { Document } from '../document.model';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DocumentsService } from '../documents.service';


@Component({
  selector: 'cms-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css']
})
export class DocumentEditComponent implements OnInit{

  orginalDocument: Document;
  document: Document;
  editMode: boolean = false;
  id: string;

  constructor (private documentService: DocumentsService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(){
    this.route.params
    .subscribe(
      (params: Params) => {
        this.id = params['id'];
        if(!this.id) {
          this.editMode = false;
          return
        }
        this.documentService.getDoument(this.id)
        .subscribe(documentData => {
          this.orginalDocument = documentData.document;

          if(!this.orginalDocument) {
            return
          }
          this.editMode = true;
          this.document = JSON.parse(JSON.stringify(this.orginalDocument));

        });
      });
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newDocument = new Document(value.id, value.string, value.description, value.url, value.children)
    if (this.editMode = true) {
      this.documentService.updateDocument(this.orginalDocument, newDocument);
    } else {
      this.documentService.addDocument(newDocument);
    }
    this.router.navigate(['/document']);
  }

  onCancel() {
    this.router.navigate(['/document']);
  }

}
