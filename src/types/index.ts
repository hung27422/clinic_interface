export interface Patient {
  id: string;
  name: string;
  age: number;
  address: string;
  phone: string;
}
export interface ViewPatient {
  patientId: Patient["id"];
  reason: string;
  medicalHistory: string;
  diagnosis: string;
  summary: string;
}
