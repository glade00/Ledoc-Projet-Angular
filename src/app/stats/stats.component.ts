import { Component, OnInit } from '@angular/core';
import { Stat } from '../models/stats';
import { StatsService } from '../services/stats.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {

  stats: Stat[] = [];

  constructor(private statsService: StatsService) { }

  ngOnInit(): void {
    this.getStatsDay();
    this.getStatsMonth();
    this.getStatsWeek();
  }
  getStatsWeek() {
    this.statsService.getStatsWeek().subscribe(response => {
      this.stats = response;
    });
  }
  getStatsMonth() {
    this.statsService.getStatsMonth().subscribe(response => {
      this.stats = response;
    });
  }
  getStatsDay() {
    this.statsService.getStatsDay().subscribe(response => {
      this.stats = response;
    });
  }

}
