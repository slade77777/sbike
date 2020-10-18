import {Address} from './address';
import {AgentInforResponse} from './agent';
import {MissionStatus} from './mission';

export enum OpportunityInfoType {
  Apartment = 'apartmentIds',
  BalconyDirections = 'balconyDirections',
  BudgetLimit = 'budgetLimitId',
  DOB = 'dob',
  Email = 'email',
  Gender = 'gender',
  HomeDirections = 'homeDirections',
  HomeTypes = 'homeTypeIds',
  InterestedProjects = 'interestedProjectId',
  Purpose = 'purposeId',
  JobType = 'jobTypeId',
  MarriageStatus = 'marriageStatus',
  MonthlyIncome = 'monthlyAverageFamilyIncome',
  MortgageNeed = 'mortgageNeed',
  DocumentCode = 'documentCode',
  ForwardedMc = 'forwardedMc',
  SellingPolicyId = 'sellingPolicyId',
  BookingCode = 'bookingCode',
  Name = 'name',
  PhoneNumber = 'phoneNumber',
  Address = 'address',
  IdentifyNumber = 'identifyNumber',
  AccountHolder = 'accountHolder',
  BankAccountNumber = 'bankAccountNumber',
  BankId = 'bankId',
  DepositReferenceCode = 'depositReferenceCode',
}

export enum PotentialLeadStatus {
  Assigned = 'ASSIGNED',
  New = 'NEW',
  Duplicate = 'DUPLICATED',
}

export enum OpportunityStatus {
  Assigned = 'ASSIGNED',
  Consulting = 'CONSULTING',
  Negotiation = 'NEGOTIATION',
  Booking = 'BOOKING',
  Success = 'SUCCESS',
  Nurturing = 'NURTURING',
  Stop = 'STOP',
}

export type Status = PotentialLeadStatus | OpportunityStatus;

export enum Source {
  Opportunity = 'OPPORTUNITY',
  Potential = 'POTENTIAL',
}

export enum SaleDemand {
  Buy = 'BUY',
  // Sell = 'SELL',
}

export enum Gender {
  Male = 'MALE',
  Female = 'FEMALE',
  Other = 'OTHER',
}

export enum Priority {
  Hot = 'HOT',
  Warm = 'WARM',
  Cold = 'COLD',
}

export enum MarriageStatus {
  Single = 'SINGLE',
  MarriageInTwoYear = 'MARRIAGE_PLAN_IN_NEXT_TWO_YEARS',
  Married = 'MARRIED',
  Widowed = 'WIDOWED',
  Divorced = 'DIVORCED',
}

export enum Orientation {
  East = 'EAST',
  West = 'WEST',
  South = 'SOUTH',
  North = 'NORTH',
  Northeast = 'NORTHEAST',
  Southeast = 'SOUTHEAST',
  Northwest = 'NORTHWEST',
  Southwest = 'SOUTHWEST',
  SoutheastSouthwest = 'SOUTHEAST_SOUTHWEST',
  NorthwestSouthwest = 'NORTHWEST_SOUTHWEST',
  NortheastSouthwest = 'NORTHEAST_SOUTHWEST',
  NortheastNorthwest = 'NORTHEAST_NORTHWEST',
}

export enum Stage {
  ASSIGNED = 'ASSIGNED',
  CONSULTING = 'CONSULTING',
  NEGOTIATION = 'NEGOTIATION',
  BOOKING = 'BOOKING',
  SUCCESS = 'SUCCESS',
}

export type Process = {
  stage: Stage;
  status: MissionStatus;
};

export type Apartment = {
  id: number;
  name?: string;
  code?: string;
  floor?: string;
  project_id?: number;
  create_time?: string;
  create_by?: string;
  direction?: Orientation;
  update_time?: string;
  block?: string;
  position?: string;
  price?: string;
  price_per_square?: number;
  size?: string;
  type?: string;
  update_by?: string;
  property_price: number;
};

export type JobType = {
  id: number;
  name: string;
  description: string;
};

export type HomeType = {
  id: number;
  name: string;
  description: string;
};

export type BudgetLimit = {
  id: number;
  name: string;
  description: string;
};

export type LeadProject = {
  id: number;
  name: string;
  description: string;
};

export type Purpose = {
  id: number;
  name: string;
  description: string;
};

export type SellingPolicy = {
  id: number;
  name: string;
  description: string;
};

export type BankType = {
  id: number;
  code: string;
  short_name: string;
  bank_code: string;
  vi_name: string;
  en_name: string;
};

export interface OpportunityItem {
  id: string;
  name?: string;
  code?: string;
  dob?: string;
  status?: Status;
  phone_number?: string;
  gender?: Gender;
  marriage_status?: MarriageStatus;
  email?: string;
  priority?: Priority;
  interested_project: LeadProject;
  purpose?: Purpose;
  budget_limit?: BudgetLimit;
  home_types?: Array<HomeType | null>;
  home_directions?: Array<Orientation | null>;
  balcony_directions?: Array<Orientation | null>;
  mortgage_need?: boolean;
  apartments?: Array<Apartment | null>;
  job_type?: JobType;
  marital_status?: string;
  monthly_average_family_income?: number;
  create_time?: number;
  update_time?: number;
  address: Address;
  forwarded_mc: boolean;
  document_code: string;
  selling_policy: SellingPolicy;
  booking_code: string;
  bank_account_number: string;
  account_holder: string;
  bank: BankType;
  identify_number: string;
  deposit_reference_code: string;
  sale_demand: SaleDemand;
  assignee_agent?: AgentInforResponse;
  activities: Array<PotentialLeadActivity> | null;
  shared_by_assignee_agent?: boolean;
  processing_stage: Process;
}

export interface PotentialLeadItem extends OpportunityItem {}

export interface PotentialLeadFilterRequest {
  agent_id?: number | null;
  name?: string | null;
  email?: string | null;
  phone_number?: string | null;
  shared_acn?: boolean | null;
}

export interface GetOpportunityParamRequest {
  order_creatable: boolean;
}

export interface PotentialLeadActivity {
  status: Status;
  description: string;
  create_time: number;
  update_time: number;
}

export interface OpportunityUpdateRequest {
  apartment_ids?: Array<number>;
  balcony_directions?: Array<string>;
  budget_limit_id?: number;
  dob?: string;
  email?: string;
  gender?: string;
  home_directions?: Array<string>;
  home_type_ids?: Array<number>;
  interested_project_id?: number;
  job_type_id?: number;
  marriage_status?: string;
  monthly_average_family_income?: number | null | string;
  mortgage_need?: boolean;
  name?: string;
  phone_number?: string;
  priority?: string;
  purpose_id?: number;
  status?: string;
  province_id?: number;
  district_id?: number;
  ward_id?: number;
  street?: string;
  forwarded_mc?: boolean;
  document_code?: string;
  selling_policy_id?: number;
  booking_code?: string;
  bank_account_number?: string;
  account_holder?: string;
  bank_id?: number;
  identify_number: string;
  deposit_reference_code: string;
  sale_demand?: string;
  shared_acn?: boolean | null;
}

export interface AddPotentialLeadRequest extends OpportunityUpdateRequest {}
