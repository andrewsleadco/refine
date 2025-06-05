// types/db.ts

export interface Company {
  id: number;
  name: string;
  website: string | null;
  industry: string | null;
  location: string | null;
  size: string | null;
  created_at: string;
  updated_at: string;
}

export interface Person {
  id: number;
  first_name: string;
  last_name: string;
  title: string | null;
  email: string;
  phone: string | null;
  linkedin_url: string | null;
  company_id: number | null;
  verification_score: number;
  source: string | null;
  created_at: string;
  updated_at: string;
}

// When we fetch Person + joined Company:
export interface PersonWithCompany extends Person {
  company: Company | null;
}
