import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiUrl:string='https://eu-west-2.aws.data.mongodb-api.com/app/data-cwegyzw/endpoint/data/v1/';
  apiKey = 'IVdfvkEkqEQ074NGPmYvqeRisEUPQPWusjhR9SAejephnur8ms8E53DzNhPBSGjV';

  constructor(private http:HttpClient) {

   }


   getBooks(): Observable<any[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Request-Headers': '*',
      'api-key': this.apiKey,
      'Accept':'application/json'
    });

    const body = {
      'dataSource': 'Cluster93482',
      'database': 'school',
      'collection': 'students',
      'filter': {}
    };

    return this.http.post<any[]>(this.apiUrl+'action/findOne', body, { headers });
  }
  
}
