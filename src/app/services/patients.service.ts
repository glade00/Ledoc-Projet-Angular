import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Patient } from '../models/patients';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientsService {


  constructor(private httpClient: HttpClient) { }

  getDrugs(): Observable<any> {
    return this.httpClient.get('http://localhost:3000/dictionaries/drugs');
  }
  getPeriods(): Observable<any> {
    return this.httpClient.get('http://localhost:3000/dictionaries/periods');
  }
  getRepeats(): Observable<any> {
    return this.httpClient.get('http://localhost:3000/dictionaries/repeats');
  }
  getBloodgroups(): Observable<any> {
    return this.httpClient.get('http://localhost:3000/dictionaries/bloodgroups');
  }
  getPatients(): Observable<any> {
    return this.httpClient.get('http://localhost:3000/patients');
  }

  getPatient(id: string): Observable<any> {
    return this.httpClient.get('http://localhost:3000/patients/' + id);
  }

  addPatient(data: Patient) {
    return this.httpClient.post('http://localhost:3000/patients', data);
  }

  updatePatient(id: string, patient: Patient): Observable<any> {
    return this.httpClient.put('http://localhost:3000/patients/' + id, patient);
  }

  deletePatient(id: string): Observable<any> {
    return this.httpClient.delete('http://localhost:3000/patients/' + id);
  }
}