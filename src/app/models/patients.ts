import { DocumentsPatient } from './documentspatients';
import { TreatmentsPatient } from './treatments-patient';

export interface Patient {
  id: String;
  firstName: String;
  lastName: String;
  gender?: String;
  height?: String;
  weight?: Number;
  lastIncome?: String;
  bloodGroup?: Number;
  socialNumber?: String;
  notes?: String;
  date?: String;
  lastSubject?: String;
  documents?: [DocumentsPatient];
  treatments?: [TreatmentsPatient];
}