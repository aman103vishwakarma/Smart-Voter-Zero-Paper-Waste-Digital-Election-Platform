export type UserRole = 
  | 'CITIZEN' 
  | 'CANDIDATE' 
  | 'PARTY_ADMIN' 
  | 'ELECTION_OFFICIAL' 
  | 'SUPER_ADMIN';

export type ElectionType = 
  | 'PARLIAMENTARY' 
  | 'STATE_ASSEMBLY' 
  | 'MUNICIPAL' 
  | 'PANCHAYAT';

export type VerificationStatus = 
  | 'DRAFT' 
  | 'PENDING_VERIFICATION' 
  | 'VERIFIED' 
  | 'REJECTED';

export type SupportedLanguage = 'en' | 'hi' | 'kn' | 'mr';

export interface Party {
  id: string;
  name: string;
  abbreviation: string;
  symbolUrl: string;
  colorHex: string;
  headquarters: string;
  foundedYear: number;
  websiteUrl: string;
}

export interface PollingStation {
  id: string;
  name: string;
  roomNumber: string;
  address: string;
  partNumber: string;
  lat: number;
  lng: number;
  queueStatus: 'Low (< 10 mins)' | 'Moderate (15-30 mins)' | 'Busy (> 45 mins)';
  wheelchairAccessible: boolean;
}

export interface Constituency {
  id: string;
  code: string;
  name: string;
  state: string;
  type: ElectionType;
  totalRegisteredVoters: number;
  pincodes: string[];
  pollingStations: PollingStation[];
  bounds: {
    minLat: number;
    maxLat: number;
    minLng: number;
    maxLng: number;
  };
}

export interface PolicyCategory {
  category: 'Economy & Jobs' | 'Healthcare' | 'Education' | 'Green & Climate' | 'Infrastructure' | 'Governance';
  promise: string;
  timeline: string;
  budgetAllocation?: string;
}

export interface Manifesto {
  id: string;
  candidateId?: string;
  partyId?: string;
  electionId: string;
  title: string;
  pdfUrl: string;
  pageCount: number;
  aiSummary: string;
  keyPromises: string[];
  categoryBreakdown: PolicyCategory[];
  language: string;
  uploadedAt: string;
  translations?: Record<SupportedLanguage, {
    aiSummary: string;
    keyPromises: string[];
  }>;
}

export interface Candidate {
  id: string;
  fullName: string;
  partyId: string;
  party: Party;
  constituencyId: string;
  constituencyName: string;
  electionId: string;
  electionYear: number;
  bio: string;
  education: string;
  age: number;
  criminalCases: number;
  criminalCasesDetails?: string;
  assetsDeclared: number;
  liabilitiesDeclared: number;
  affidavitUrl: string;
  profilePhotoUrl: string;
  socialLinks: {
    twitter?: string;
    website?: string;
    linkedin?: string;
  };
  verificationStatus: VerificationStatus;
  verifiedBy?: string;
  verifiedAt?: string;
  manifesto?: Manifesto;
  qrCodeId?: string;
}

export interface EcoImpactStats {
  paperPostersSaved: number;
  treesPreserved: number;
  co2PreventedKg: number;
  plasticFlexAvoidedKg: number;
  waterSavedLiters: number;
}

export interface CampaignQrCode {
  id: string;
  codeHash: string;
  candidateId: string;
  candidateName: string;
  partyAbbr: string;
  locationLabel: string;
  scanCount: number;
  paperPostersSaved: number;
  createdAt: string;
}

export interface CivicIssue {
  id: string;
  constituencyId: string;
  title: string;
  category: 'Roads & Transit' | 'Clean Water' | 'Pollution & Waste' | 'Healthcare' | 'Electricity' | 'Public Safety';
  description: string;
  location: string;
  upvotes: number;
  status: 'REPORTED' | 'PLEDGED_BY_CANDIDATES' | 'RESOLVED';
  pledgedCandidateNames: string[];
  createdAt: string;
}

export interface VoterSlip {
  voterEpicNumber: string;
  voterName: string;
  constituencyName: string;
  partNumber: string;
  serialNumber: string;
  pollingStationName: string;
  pollingStationAddress: string;
  electionDate: string;
  votingHours: string;
  qrPayload: string;
}
