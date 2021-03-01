import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PatientsComponent } from './patients/patients.component';
import { PatientComponent } from './patient/patient.component';
import { PatientFormComponent } from './patient-form/patient-form.component';
import { MeetsComponent } from './meets/meets.component';
import { MeetFormComponent } from './meet-form/meet-form.component';
import { MeetComponent } from './meet/meet.component';


const routes: Routes = [

  {
    path: 'dashboard',
    children: [
      {
        path: '',
        component: DashboardComponent
      },
      {
        path: 'tous_meets',
        component: MeetsComponent
      },

    ]
  },
  {
    path: 'patients',
    children: [
      {
        path: '',
        component: PatientsComponent
      },
      {
        path: 'nouveau',
        component: PatientFormComponent
      },
      {
        path: ':id',
        component: PatientComponent
      },
      {
        path: ':id/edit',
        component: PatientFormComponent,
        data: {
          edit: true
        }
      },
    ]
  },

  {
    path: 'meets',
    children: [
      {
        path: 'meets',
        component: MeetsComponent
      },
      {
        path: 'nouveau',
        component: MeetFormComponent
      },
      {
        path: ':id',
        component: MeetComponent
      },
      {
        path: ':id/edit',
        component: MeetFormComponent,
        data: {
          edit: true
        }
      },

    ]
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
