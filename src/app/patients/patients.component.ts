import { Component, OnInit } from '@angular/core';
import { Patient } from '../models/patients';
import { PatientsService } from '../services/patients.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss']
})
export class PatientsComponent implements OnInit {

  patients: Patient[] = [];
  displayedColumns: string[] = ['firstName', 'lastName', 'lastIncome', 'motif', 'voir'];
  dataSource: Patient[] = [];
  dataSource2: any;
  constructor(private patientsService: PatientsService) { }

  ngOnInit(): void {
    this.getPatients();
  }
  getPatients() {
    this.patientsService.getPatients().subscribe(response => {
      this.dataSource = response;
      this.dataSource2 = new MatTableDataSource(this.dataSource);

    });
  }

  applyFilter(event: Event) {
    console.log
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource2.filter = filterValue.trim().toLowerCase();
  }
}


