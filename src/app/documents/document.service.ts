import { Injectable, Output, EventEmitter } from '@angular/core';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  @Output() selectedDocumentEvent = new EventEmitter<Document[]>();

  documents: Document[] = [];

  constructor() { 
    this.documents = MOCKDOCUMENTS;
  }

  getDocuments(): Document[] {
    return this.documents.slice();
  }

  getDocument(id: string): Document | undefined {
    return this.documents.find(doc => doc.id === id);
  }

  addDocument(newDocument: Document): void {
    if (!newDocument) return;
    this.documents.push(newDocument);
    this.selectedDocumentEvent.emit(this.documents.slice());
  }

  updateDocument(originalDocument: Document, updatedDocument: Document): void {
    if (!originalDocument || !updatedDocument) return;

    const index = this.documents.findIndex(doc => doc.id === originalDocument.id);
    if (index !== -1) {
      this.documents[index] = updatedDocument;
      this.selectedDocumentEvent.emit(this.documents.slice());
    }
  }

  deleteDocument(document: Document) {
    if (!document) return;
    
    const pos = this.documents.indexOf(document);
    if (pos < 0) return;
    
    this.documents.splice(pos, 1);
    this.selectedDocumentEvent.emit(this.documents.slice());
  }
}
