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

      documents: this.fb.array([])


    });
  }


  get documents(): FormArray {
    return this.form.get('documents') as FormArray;
  }
  newDocument(): FormGroup {
    return this.fb.group({
      name: '',
      extension: '',
      uploadAt: ''
    })
  }

  addDocument() {
    this.documents.push(this.newDocument());
  }


  removeDocument(index: number) {
    this.documents.removeAt(index);
  }


  onSubmit() {
    if (this.isEditMode) {
      this.edit();
    } else {
      parseInt(this.bloodGroup.value)

      this.form.value.concat()
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
        response.documents.forEach((document: any, index: number) => {
          this.addDocument();
          this.documents.at(index).patchValue(document);
        })
      });
  };


  openDialog() {
    this.dialog.open(DialogElementsFormDialog);
  }

}

@Component({
  selector: 'dialog-elements-example-dialog',
  templateUrl: 'dialog-elements-example-dialog.html',
  styleUrls: ['./patient-form.component.scss']

})
export class DialogElementsFormDialog {

  form: FormGroup;
  isEdit = false;
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
  treatments: any;
  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private patientsService: PatientsService) { }


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
  ngOnInit(): void {
    this.initForm();
    this.getDrugs();
    this.getPeriods();
    this.getRepeats();


    this.isEdit = this.route.snapshot.data.edit;
    if (this.isEdit) {
    }
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

  initForm() {
    this.form = this.fb.group({
      drug: ['', Validators.required],
      repeat: ['', Validators.required],
      duration: ['', Validators.required],

    })
  }




  submit() {
    console.log('submitted', this.form.value);


  }


}
