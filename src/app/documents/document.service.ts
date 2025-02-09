import { Injectable, Output, EventEmitter } from '@angular/core';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  @Output() selectedDocumentEvent = new EventEmitter<Document>;

  documents: Document[] = [];

  constructor() { 
    this.documents = MOCKDOCUMENTS;
  }
  getDocuments(): Document[] {
    return this.documents;
  }
  getDocument(id: string): Document {
    return this.documents.find(doc => doc.id === id);
  }
}
