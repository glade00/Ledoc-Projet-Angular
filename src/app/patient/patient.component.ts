import { Component, OnInit, Input } from '@angular/core';
import { Patient } from '../models/patients';
import { ActivatedRoute, Router } from '@angular/router';

import { PatientsService } from '../services/patients.service';
@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss']
})
export class PatientComponent implements OnInit {
  @Input() patient!: Patient;
  pdfFilePath = "https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf";
  dialog: any;

  constructor(private patientsService: PatientsService, private route: ActivatedRoute, private router: Router, ) { }


  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.patientsService.getPatient(this.route.snapshot.paramMap.get('id') || '').subscribe(response => {
      this.patient = response;
    });
  }
  onFileSelected() {
    let $img: any = document.querySelector('#file');

    if (typeof (FileReader) !== 'undefined') {
      let reader = new FileReader();

      reader.onload = (e: any) => {
        this.pdfFilePath = e.target.result;
      };

      reader.readAsArrayBuffer($img.files[0]);
    }
  }

  delete() {
    this.patientsService.deletePatient(this.route.snapshot.paramMap.get('id') || '').subscribe(response => {
      this.router.navigate(['/patients']);
    })
  }

}
