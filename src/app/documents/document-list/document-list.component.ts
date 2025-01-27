import { Component } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'app-document-list',
  standalone: false,
  
  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.css'
})
export class DocumentListComponent {
  documents: Document[] = [
    new Document('1', 'Document 1', 'Description 1', 'https://example.com/doc1'),
    new Document('2', 'Document 2', 'Description 2', 'https://example.com/doc2'),
    new Document('3', 'Document 3', 'Description 3', 'https://example.com/doc3'),
  ];
}
