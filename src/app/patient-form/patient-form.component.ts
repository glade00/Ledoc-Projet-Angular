import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PatientsService } from '../services/patients.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-patient-form',
  templateUrl: './patient-form.component.html',
  styleUrls: ['./patient-form.component.scss']
})
export class PatientFormComponent implements OnInit {
  isEditMode: '';
  form: FormGroup;
  pdfFilePath = "https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf";


  constructor(private patientsService: PatientsService, private fb: FormBuilder, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.initForm();
    this.isEditMode = this.route.snapshot.data.edit;
    if (this.route.snapshot.data.edit) {
      this.getData();
    }
  }

  initForm() {
    this.form = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: [''],
      description: [''],
      gender: [''],
      height: [''],
      weight: [''],
      lastIncome: [''],
      bloodGroup: [''],
      socialNumber: [''],
      notes: [''],

    });
  }

  onSubmit() {
    if (this.isEditMode) {
      this.edit();
    } else {
      this.add();
    }
  }

  add() {
    this.patientsService.addPatient(this.form.value).subscribe(response => {
      this.router.navigate(['/patients']);
    });
  }

  edit() {
    this.patientsService.updatePatient(this.route.snapshot.paramMap.get('id') || '', this.form.value).subscribe(response => {
      this.router.navigate(['/patients']);
    })
  }

  getData() {
    this.patientsService
      .getPatient(this.route.snapshot.paramMap.get('id') || '')
      .subscribe(response => {
        this.form.patchValue(response);
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
}
