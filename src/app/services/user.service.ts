import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  connect(data: any): Observable<any> {
    return this.httpClient.post('http://localhost:3000/auth/login', data);
  }

}