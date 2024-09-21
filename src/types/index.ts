export interface Patient {
  id: string;
  name: string;
  age?: number;
  dob: string;
  address: string;
  phoneNumber: string;
}
export interface PatientSecond {
  id: string;
  patientName: string;
  age?: number;
  dob: string;
  address: string;
  phoneNumber: string;
}
export interface PatientData {
  patient: Patient[];
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
}
