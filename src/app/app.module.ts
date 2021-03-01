import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PatientsComponent } from './patients/patients.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule } from '@angular/material/dialog';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

import { PatientItemComponent } from './shared/patient-item/patient-item.component';
import { PatientComponent } from './patient/patient.component';

import { PatientsService } from './services/patients.service';
import { VisitesService } from './services/visites.service';

import { FormsModule, ReactiveFormsModule, FormArray } from '@angular/forms';
import { PatientFormComponent } from './patient-form/patient-form.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PdfViewerModule } from 'ng2-pdf-viewer';

import { MatTableModule } from '@angular/material/table';
import { StatsComponent } from './stats/stats.component';

import { MeetsComponent } from './meets/meets.component';
import { MeetItemComponent } from './shared/meet-item/meet-item.component';
import { MeetFormComponent } from './meet-form/meet-form.component';
import { MeetComponent } from './meet/meet.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    PatientsComponent,
    PatientItemComponent,
    PatientComponent,
    PatientFormComponent,
    StatsComponent,
    MeetsComponent,
    MeetItemComponent,
    MeetFormComponent,
    MeetComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatListModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTabsModule,
    MatTableModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    PdfViewerModule
  ],
  providers: [
    PatientsService,
    VisitesService,
  ],
  bootstrap: [AppComponent]

})
export class AppModule { }
