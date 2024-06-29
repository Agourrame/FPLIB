import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'http://localhost:8000'; // Replace with your server URL

  constructor(private http: HttpClient) { }

  getDocuments(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/api/documents`);
  }

  // Create a new document
  createDocument(document: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/api/documents`, document);
  }

  // Update an existing document
  updateDocument(documentId: string, updatedDocument: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/api/documents/${documentId}`, updatedDocument);
  }

  // Delete a document
  deleteDocument(documentId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/api/documents/${documentId}`);
  }
}
