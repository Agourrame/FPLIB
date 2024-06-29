import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'http://localhost:8000'; // Replace with your server URL

  constructor(private http: HttpClient) { }

  getDocuments() {
    return this.http.get(`${this.apiUrl}/api/documents`);
  }

}
