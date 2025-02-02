import { Component, EventEmitter, Output } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'app-document-list',
  standalone: false,
  templateUrl: './document-list.component.html',
})
export class DocumentListComponent {
  @Output() selectedDocumentEvent = new EventEmitter<Document>(); // Event emitter

  documents: Document[] = [
    new Document('1', 'Project Plan', 'Project planning document', 'https://example.com/plan'),
    new Document('2', 'Design Specs', 'Detailed design specifications', 'https://example.com/design'),
    new Document('3', 'API Documentation', 'API reference guide', 'https://example.com/api'),
    new Document('4', 'User Manual', 'Guide for end users', 'https://example.com/manual'),
    new Document('5', 'Meeting Notes', 'Notes from project meetings', 'https://example.com/notes'),
  ];

  onSelectedDocument(document: Document) {
    this.selectedDocumentEvent.emit(document); // Emit selected document
  }
}
