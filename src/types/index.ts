export interface Patient {
  id: string;
  name: string;
  age?: number;
  dob: string;
  address: string;
  phoneNumber: string;
  checkStatus: string;
}
export interface PatientData {
  patient: Patient[];
  pagination: PaginationData;
}
export interface ViewPatient {
  patientId: Patient["id"];
  reason: string;
  medicalHistory: string;
  diagnosis: string;
  summary: string;
}
export interface Medication {
  id: string;
  name: string;
  company: string;
  price: number;
  quantity: number;
  status: string;
  type: string;
}
export interface MedicationData {
  medicines: Medication[];
  pagination: PaginationData;
}
export interface FollowUp {
  patientId: string;
  checkUp: string;
  history: string;
  diagnosis: string;
  createdAt: string;
  modifiedAt: string;
  id: string;
}
export interface FollowUpData {
  followUps: FollowUp[];
}
export interface PaginationData {
  totalItems: number;
  totalItemsPerPage: number;
  currentPage: number;
  totalPages: number;
}
