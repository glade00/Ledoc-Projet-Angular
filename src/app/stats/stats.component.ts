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
  param = {
    week: 'week',
    month: 'month',
    day: 'day'
  };
  constructor(private statsService: StatsService) { }

  ngOnInit(): void {
    this.getStatsDay();
    this.getStatsMonth();
    this.getStatsWeek();
  }
  getStatsWeek() {
    this.statsService.getStats(this.param.week).subscribe(response => {
      this.stats = response;
    });
  }
  getStatsMonth() {
    this.statsService.getStats(this.param.month).subscribe(response => {
      this.stats = response;
    });
  }
  getStatsDay() {
    this.statsService.getStats(this.param.day).subscribe(response => {
      this.stats = response;
    });
  }


}
