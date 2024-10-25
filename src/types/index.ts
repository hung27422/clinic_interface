export interface Patient {
  id: string;
  name: string;
  age?: number;
  dob: string;
  address: string;
  phoneNumber: string;
  status?: string;
}

export interface PatientData {
  patients: Patient[];
  pagination: PaginationData;
}
export interface PatientDataTemp {
  patients: Patient[];
  pagination: PaginationData;
}
export interface PatientDataObj {
  patient: Patient;
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
  stock: number;
  price: number;
  type: string;
  company: string;
  status?: string;
  createdAt?: string;
}
export interface MedicationData {
  medicines: Medication[];
  pagination: PaginationData;
}
export interface FollowUp {
  id?: string;
  reason: string;
  history: string;
  diagnosis: string;
  summary: string;
  createdAt?: string;
  patientId?: string;
  patient?: Patient;
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
export interface Prescription {
  patientId: string;
  followUpId: string;
  products: {
    medicineId: string;
    quantity: number;
    instructions: {
      day: string;
      lunch: string;
      afternoon: string;
      manual: string;
    };
  }[];
  notes: string;
}
export interface Prescriptions {
  id: string;
  patient: {
    id: string;
    name: string;
    age: number;
    dob: string;
    address: string;
    phoneNumber: string;
  };
  summary: {
    summary: string;
  };
  products: [
    {
      name: string;
      quantity: number;
      instructions: {
        day: string;
        lunch: string;
        afternoon: string;
        manual: string;
      };
    }
  ];
  notes: string;
  totalPrice: number;
  billDate: string;
  createdAt: string;
}
export interface PrescriptionData {
  prescriptions: Prescriptions[];
  pagination: PaginationData;
}
