import { Injectable } from '@angular/core';
import { Document } from './document.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  documentListChangedEvent = new Subject<Document[]>();
  documents: Document[] = [];
  maxDocumentId: number;

  constructor(private http: HttpClient) {}

  getDocuments() {
    return this.http.get<Document[]>('https://foard-wdd430-default-rtdb.firebaseio.com/documents.json')
      .subscribe(
        (documents: Document[]) => {
          this.documents = documents;
          this.maxDocumentId = this.getMaxId();
          this.documents.sort((a, b) => a.name.localeCompare(b.name));
          this.documentListChangedEvent.next(this.documents.slice());
        },
        (error) => console.error(error)
      );
  }

  getDocument(id: string): Document | undefined {
    return this.documents.find(doc => doc.id === id);
  }

  addDocument(newDocument: Document): void {
    if (!newDocument) return;
    this.documents.push(newDocument);
    this.storeDocuments();
  }

  updateDocument(originalDocument: Document, updatedDocument: Document): void {
    if (!originalDocument || !updatedDocument) return;
    const index = this.documents.findIndex(doc => doc.id === originalDocument.id);
    if (index !== -1) {
      this.documents[index] = updatedDocument;
      this.storeDocuments();
    }
  }

  deleteDocument(document: Document) {
    if (!document) return;
    const pos = this.documents.indexOf(document);
    if (pos < 0) return;
    this.documents.splice(pos, 1);
    this.storeDocuments();
  }

  storeDocuments() {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.put('https://your-firebase-url/documents.json', JSON.stringify(this.documents), { headers })
      .subscribe(() => this.documentListChangedEvent.next(this.documents.slice()));
  }

  private getMaxId(): number {
    return this.documents.length > 0 
      ? Math.max(...this.documents.map(doc => parseInt(doc.id))) 
      : 0;
  }
}
