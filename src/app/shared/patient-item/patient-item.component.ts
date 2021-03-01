import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-patient-item',
  templateUrl: './patient-item.component.html',
  styleUrls: ['./patient-item.component.scss']
})
export class PatientItemComponent implements OnInit {
  @Input() patient = {
    id: '',
    firstName: '',
    lastName: '',
  };

  constructor() { }

  ngOnInit(): void {
  }

}
