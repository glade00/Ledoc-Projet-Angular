import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Stat } from '../models/stats';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class StatsService {

  constructor(private httpClient: HttpClient) { }
  getStatsDay(): Observable<any> {
    return this.httpClient.get('http://localhost:3000/stats?period=day');
  }
  getStatsWeek(): Observable<any> {
    return this.httpClient.get('http://localhost:3000/stats?period=week');
  }
  getStatsMonth(): Observable<any> {
    return this.httpClient.get('http://localhost:3000/stats?period=month');
  }
}
