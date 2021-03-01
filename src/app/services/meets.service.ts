import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Meet } from '../models/meets';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MeetsService {

  constructor(private httpClient: HttpClient) { }
  getMeets(): Observable<any> {
    return this.httpClient.get('http://localhost:3000/meets');
  }
  getMeet(id: string): Observable<any> {
    return this.httpClient.get('http://localhost:3000/meets/' + id);
  }

  addMeet(data: Meet) {
    return this.httpClient.post('http://localhost:3000/meet', data);
  }

  updateMeet(id: string, meet: Meet): Observable<any> {
    return this.httpClient.put('http://localhost:3000/meets/' + id, meet);
  }

  deleteMeet(id: string): Observable<any> {
    return this.httpClient.delete('http://localhost:3000/meets/' + id);
  }
}
