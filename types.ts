
export type Gender = 'Male' | 'Female' | 'Other' | 'All';
export type Category = 'General' | 'OBC' | 'SC' | 'ST' | 'All';
export type Sector = 'Health' | 'Agriculture' | 'Education' | 'Housing' | 'Employment' | 'Welfare';
export type Residence = 'Rural' | 'Urban' | 'Both';
export type MaritalStatus = 'Single' | 'Married' | 'Widow' | 'Divorced';

export interface Scheme {
  id: string;
  name: string;
  category: Sector;
  description: string;
  benefits: string[];
  minAge?: number;
  maxAge?: number;
  gender?: Gender;
  maxIncome?: number;
  caste?: Category[];
  isDisabilityRequired?: boolean;
  residence?: Residence;
  bplOnly?: boolean;
  maritalStatus?: MaritalStatus[];
  documents: string[];
  steps: string[];
  officialLink: string;
  occupation?: string;
  stateSpecific?: string[];
  minFamilySize?: number;
  maxFamilySize?: number;
}

export interface UserProfile {
  name: string;
  age: number;
  gender: Gender;
  state: string;
  income: number;
  caste: Category;
  occupation: string;
  hasDisability: boolean;
  residence: 'Rural' | 'Urban';
  isBPL: boolean;
  maritalStatus: MaritalStatus;
  familySize: number;
  hasChronicIllness: boolean;
  language: string;
}

export type LanguageCode = 'en' | 'hi' | 'te' | 'ta';

export interface Application {
  id: string;
  schemeId: string;
  schemeName: string;
  status: 'Pending' | 'Approved' | 'Rejected' | 'In Review';
  appliedDate: string;
  documentsUploaded: string[];
}

export interface CSC {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  contact: string;
}

export interface Translation {
  title: string;
  subtitle: string;
  checkEligibility: string;
  heroDesc: string;
  languageName: string;
  footerRights: string;
  applyNow: string;
  myApplications: string;
  findCSC: string;
}

