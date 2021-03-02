import { Component, OnInit, Input, Inject } from '@angular/core';
import { Patient } from '../models/patients';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PatientsService } from '../services/patients.service';
import { FormGroup, FormBuilder, FormArray, Validators, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
  treatments: any;



  constructor(private patientsService: PatientsService, private route: ActivatedRoute, private router: Router, private dialog: MatDialog) { }


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
    console.log('submitted', this.form.value);
    console.log(this.data.id)
    var patientLoad = {
      id: this.data.id,
      bloodGroup: this.data.bloodGroup,
      lastName: this.data.lastName,
      firstName: this.data.firstName,
      treatments: this.data.treatments.concat(this.form.value),
    };
    this.patientsService.updatePatient(this.route.snapshot.paramMap.get(this.data.id) || this.data.id, patientLoad).subscribe(response => {

    });
  }


}
