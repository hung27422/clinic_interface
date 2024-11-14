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
  specialty: string;
  nutritional: string;
  dosage: string;
  company: string;
  status?: string;
  createdAt?: string;
  amount?: number;
  combinedPrice?: number;
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
    instructions: {
      numberOfDays: string;
      day: string;
      lunch: string;
      afternoon: string;
    };
  }[];
  revisit?: string;
  revisitDate: string;
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
      medicineId: string;
      name: string;
      quantity?: number;
      instructions: {
        numberOfDays: string;
        day: string;
        lunch: string;
        afternoon: string;
      };
    }
  ];
  notes: string;
  revisit: string;
  totalPrice: number;
  billDate: string;
  createdAt: string;
}
export interface PrescriptionUpdate {
  id: string;
  products: {
    medicineId: string;
    name: string;
    instructions: {
      numberOfDays: string;
      day: string;
      lunch: string;
      afternoon: string;
    };
  }[];
  revisitDate: string;
  notes: string;
}
export interface PrescriptionData {
  prescriptions: Prescriptions[];
  pagination: PaginationData;
}

export interface User {
  id?: string;
  token?: string;
}
export interface Account {
  name: string;
  password: string;
}
