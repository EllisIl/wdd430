import { Component, OnInit } from '@angular/core';
import { Document } from './document.model';
import { DocumentService } from './document.service';

@Component({
  selector: 'app-documents',
  standalone: false,
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {
  selectedDocument: Document | null = null;

  constructor(private documentService: DocumentService) {}

  ngOnInit(): void {
    this.documentService.documentListChangedEvent.subscribe((documents: Document[]) => {
      this.selectedDocument = documents.length ? documents[0] : null;
    });
  }
}
