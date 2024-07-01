import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'http://localhost:8000';

  constructor(private http: HttpClient) { }

  getDocuments(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/api/documents`);
  }

  createDocument(document: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/api/documents`, document);
  }

  updateDocument(updatedDocument: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/api/documents/${updatedDocument._id}`, updatedDocument);
  }

  deleteDocument(documentId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/api/documents/${documentId}`);
  }

  async export(): Promise<any> {
    try {
      const response = await this.http.get(`${this.apiUrl}/api/download`, { responseType: 'blob' })
        .toPromise();
      const blob = new Blob([response!], { type: 'application/json' });
      const url_1 = window.URL.createObjectURL(blob);
      window.open(url_1); // Open download link in a new tab
    } catch (error) {
      console.error('Error downloading database:', error);
      throw error;
    }
  }
}