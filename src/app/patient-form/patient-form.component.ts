import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { PatientsService } from '../services/patients.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-patient-form',
  templateUrl: './patient-form.component.html',
  styleUrls: ['./patient-form.component.scss']
})
export class PatientFormComponent implements OnInit {
  isEditMode: '';
  form: FormGroup;
  pdfFilePath = "https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf";

  bloodGroups: [{
    id: number,
    label: ''
  }];
  drugs: [{
    id: '',
    label: ''
  }];
  repeats: [{
    id: '',
    label: ''
  }];
  periods: [{
    id: '',
    label: ''
  }];
  constructor(private dialog: MatDialog, private patientsService: PatientsService, private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private http: HttpClient) { }
  fileName = '';
  onFileSelected(event: any) {

    const file: File = event.target.files[0];

    if (file) {

      this.fileName = file.name;

      const formData = new FormData();

      formData.append("thumbnail", file);

      const upload$ = this.http.post("http://localhost:3000/patients", formData);

      upload$.subscribe();
    }
  }
  getBloodgroups() {
    this.patientsService.getBloodgroups().subscribe(response => {
      this.bloodGroups = response;
    });
  }

  get bloodGroup(): FormControl {
    return this.form.get('bloodGroup') as FormControl;
  }

  ngOnInit(): void {
    this.initForm();
    this.getBloodgroups();
    this.getDrugs();
    this.getPeriods();
    this.getRepeats();

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
      lastSubject: [''],
      socialNumber: [''],
      notes: [''],
      treatments: this.fb.array([])
    });
  }

  onSubmit() {
    if (this.isEditMode) {
      this.form.value.bloodGroup = parseInt(this.form.value.bloodGroup);
      this.edit();
    } else {
      this.form.value.bloodGroup = parseInt(this.form.value.bloodGroup);
      this.add();
    }
  }

  add() {
    this.form.value.treatments.map(obj => {
      obj.drug = parseInt(obj.drug);
      obj.duration = parseInt(obj.duration);
      obj.repeat = parseInt(obj.repeat);

    });
    this.form.value.bloodGroup = parseInt(this.form.value.bloodGroup);
    this.patientsService.addPatient(this.form.value).subscribe(response => {
      this.router.navigate(['/patients']);

    });

  }

  edit() {
    this.form.value.treatments.map(obj => {
      obj.drug = parseInt(obj.drug);
      obj.duration = parseInt(obj.duration);
      obj.repeat = parseInt(obj.repeat);

    });
    this.patientsService.updatePatient(this.route.snapshot.paramMap.get('id') || '', this.form.value).subscribe(response => {
      this.router.navigate(['/patients']);
    })
  }

  getData() {
    this.patientsService
      .getPatient(this.route.snapshot.paramMap.get('id') || '')
      .subscribe(response => {
        this.form.patchValue(response);
        response.treatments.forEach((treatment: any, index: number) => {
          this.addTreatment();
          this.treatments.at(index).patchValue(treatment);
        })
      });
  };
  get treatments(): FormArray {
    return this.form.get('treatments') as FormArray;
  }

  newTreatment(): FormGroup {
    return this.fb.group({
      drug: '',
      repeat: '',
      duration: ''
    })
  }

  addTreatment() {
    this.treatments.push(this.newTreatment());
  }


  removeTreatment(index) {
    this.treatments.removeAt(index);
  }

  getDrugs() {
    this.patientsService.getDrugs().subscribe(response => {
      this.drugs = response;
    });
  }
  getPeriods() {
    this.patientsService.getPeriods().subscribe(response => {
      this.periods = response;
    });
  }
  getRepeats() {
    this.patientsService.getRepeats().subscribe(response => {
      this.repeats = response;
    });
  }
  get drug(): FormControl {
    return this.form.get('drug') as FormControl;
  }
  get repeat(): FormControl {
    return this.form.get('repeat') as FormControl;
  }
  get duration(): FormControl {
    return this.form.get('duration') as FormControl;
  }
}

