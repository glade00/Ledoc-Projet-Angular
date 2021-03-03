import { Component, OnInit } from '@angular/core';
import { PatientsService } from '../services/patients.service';
import { MeetsService } from '../services/meets.service';
import { StatsService } from '../services/stats.service';
import { Patient } from '../models/patients';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  dataSource = [];
  meets = [];
  patients: Patient[] = [];

  stats_day = {
    meeting: '',
    emergencies: '',
    videoMeeting: '',
    availablesAssits: '',
    orders: '',
    missingCalls: '',
  };
  stats_week = {
    meeting: '',
    emergencies: '',
    videoMeeting: '',
    availablesAssits: '',
    orders: '',
    missingCalls: ''
  };
  stats_month = {
    meeting: '',
    emergencies: '',
    videoMeeting: '',
    availablesAssits: '',
    orders: '',
    missingCalls: ''
  };
  displayedColumns: string[] = ['firstName', 'lastName', 'lastIncome', 'motif'];
  stats: {
    meeting: '',
    emergencies: '',
    videoMeeting: '',
    availablesAssits: '',
    orders: '',
    missingCalls: ''
  };
  param = {
    week: 'week',
    month: 'month',
    day: 'day'
  };
  constructor(private statsService: StatsService, private patientsService: PatientsService, private meetsService: MeetsService) { }

  ngOnInit(): void {
    this.getPatients();
    this.getMeets();
    this.getStatsDay();
    this.getStatsMonth();
    this.getStatsWeek();

  }
  getPatients() {
    this.patientsService.getPatients().subscribe(response => {
      this.dataSource = response;
    });
  }
  getMeets() {
    this.meetsService.getMeets().subscribe(response => {
      this.meets = response;
    });
  }

  getStatsWeek() {
    this.statsService.getStats(this.param.week).subscribe(response => {
      this.stats_week = response;
    });
  }
  getStatsMonth() {
    this.statsService.getStats(this.param.month).subscribe(response => {
      this.stats_month = response;
    });
  }
  getStatsDay() {
    this.statsService.getStats(this.param.day).subscribe(response => {
      this.stats_day = response;
    });
  }
}
