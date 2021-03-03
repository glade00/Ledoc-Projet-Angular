import { Component, OnInit, Input, Inject } from '@angular/core';
import { Patient } from '../models/patients';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PatientsService } from '../services/patients.service';
import { FormGroup, FormBuilder, FormArray, Validators, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { TreatmentsPatient } from '../models/treatments-patient';
import { DocumentsPatient } from '../models/documentspatients';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss']
})
export class PatientComponent implements OnInit {
  @Input() patient!: Patient;

  pdfFilePath = "";
  id: string;
  lastName: string;
  firstName: string;
  bloodGroup: any;
  treatments: TreatmentsPatient[];
  form: any;
  documents: DocumentsPatient[];
  bloodGroups: any;
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

  constructor(private http: HttpClient, private fb: FormBuilder, private patientsService: PatientsService, private route: ActivatedRoute, private router: Router, private dialog: MatDialog) { }

  //bloodGroup
  getBloodgroups() {
    this.patientsService.getBloodgroups().subscribe(response => {
      this.bloodGroups = response;
    });
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
  ngOnInit(): void {
    this.getData();
    this.getBloodgroups();
    this.getPeriods();
    this.getRepeats();
    this.getDrugs();
  }

  getData() {
    this.patientsService.getPatient(this.route.snapshot.paramMap.get('id') || '').subscribe(response => {
      this.patient = response;
    });
  }

  fileName = '';
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.fileName = file.name;
      var donneedocs: [{ name?: string, extension?: string, uploadAt?: Date }] = [{
        name: file.name,
        extension: 'http://localhost:4200/files/' + file.name,
        uploadAt: new Date
      }];
      var concatDoc = this.patient.documents!.concat(donneedocs);
      var patientLoad = {
        id: this.id,
        bloodGroup: this.patient.bloodGroup,
        lastName: this.patient.lastName,
        firstName: this.patient.firstName,
        documents: concatDoc
      };

      this.patientsService.updatePatient(this.route.snapshot.paramMap.get('id') || '', patientLoad).subscribe(response => {
        window.location.reload()

      });
    }
  }

  delete() {
    this.patientsService.deletePatient(this.route.snapshot.paramMap.get('id') || '').subscribe(response => {
      this.router.navigate(['/patients']);
    })
  }

  openDialog() {
    this.dialog.open(DialogElementsExampleDialog, {
      data: {
        id: this.route.snapshot.paramMap.get('id'),
        lastName: this.patient.lastName,
        firstName: this.patient.firstName,
        bloodGroup: this.patient.bloodGroup,
        treatments: this.patient.treatments
      }
    });
  }
}


@Component({
  selector: 'dialog-elements-example-dialog',
  templateUrl: 'dialog-elements-example-dialog.html',
  styleUrls: ['./patient.component.scss']

})
export class DialogElementsExampleDialog {

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
  constructor(@Inject(MAT_DIALOG_DATA) public data: PatientComponent, private fb: FormBuilder,
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
    this.form.value.drug = parseInt(this.form.value.drug);
    this.form.value.duration = parseInt(this.form.value.duration);
    this.form.value.repeat = parseInt(this.form.value.repeat);

    var patientLoad = {
      id: this.data.id,
      bloodGroup: this.data.bloodGroup,
      lastName: this.data.lastName,
      firstName: this.data.firstName,
      treatments: this.data.treatments.concat(this.form.value),
    };

    this.patientsService.updatePatient(this.route.snapshot.paramMap.get(this.data.id) || this.data.id, patientLoad).subscribe(response => {
      window.location.reload()
    });
  }


}
