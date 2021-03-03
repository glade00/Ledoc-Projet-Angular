import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PatientsComponent } from './patients/patients.component';
import { PatientComponent } from './patient/patient.component';
import { PatientFormComponent } from './patient-form/patient-form.component';
import { MeetsComponent } from './meets/meets.component';
import { MeetFormComponent } from './meet-form/meet-form.component';
import { MeetComponent } from './meet/meet.component';
import { LoginComponent } from './login/login.component';
import { AuthenticationGuard } from './guards/authentication.guard';


const routes: Routes = [

  {
    path: 'dashboard',
    children: [
      {
        path: '',
        canActivate: [AuthenticationGuard],
        component: DashboardComponent
      },
      {
        path: 'tous_meets',
        canActivate: [AuthenticationGuard],
        component: MeetsComponent
      },
      {
        path: 'nouveau_patient',
        canActivate: [AuthenticationGuard],
        component: PatientFormComponent
      },

    ]
  },
  {
    path: 'patients',
    children: [
      {
        path: '',
        canActivate: [AuthenticationGuard],
        component: PatientsComponent
      },
      {
        path: 'nouveau',
        canActivate: [AuthenticationGuard],
        component: PatientFormComponent
      },
      {
        path: ':id',
        canActivate: [AuthenticationGuard],
        component: PatientComponent
      },
      {
        path: ':id/edit',
        component: PatientFormComponent,
        canActivate: [AuthenticationGuard],
        data: {
          edit: true
        }
      },
    ]
  },
  {
    path: 'connexion',
    component: LoginComponent
  },

  {
    path: 'meets',
    children: [
      {
        path: 'meets',
        canActivate: [AuthenticationGuard],
        component: MeetsComponent
      },
      {
        path: 'nouveau',
        canActivate: [AuthenticationGuard],
        component: MeetFormComponent
      },
      {
        path: ':id',
        canActivate: [AuthenticationGuard],
        component: MeetComponent
      },
      {
        path: ':id/edit',
        canActivate: [AuthenticationGuard],
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
