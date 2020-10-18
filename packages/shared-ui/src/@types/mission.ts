import {
  Gender,
  OpportunityInfoType,
  OpportunityUpdateRequest,
} from './opportunity';

export enum MissionStatus {
  Done = 'DONE',
  Doing = 'DOING',
  Fail = 'FAIL',
  Finish = 'FINISH',
}

export enum MissionType {
  Call = 'CALL',
  Email = 'EMAIL',
  Chat = 'CHAT',
  Meeting = 'MEETING',
  Done = 'DONE',
  Fail = 'FAIL',
  Finish = 'FINISH',
}

export enum MissionPurpose {
  MakeRequirement = 'MAKE_REQUIREMENT',
  ProductConsult = 'PRODUCT_CONSULT',
  FinaceConsult = 'FINANCE_CONSULT',
  CollectDocument = 'COLLECT_DOCUMENT',
  GoToEvent = 'GO_TO_EVENT',
}

export type MissionHistory = {
  id?: number;
  agent_mission_id?: number;
  create_time?: number;
  method?: MissionType;
  notes?: Array<string>;
  report?: string;
};

export type Task = {
  id?: number;
  name?: string;
  field?: OpportunityInfoType;
  have_value?: boolean;
};

export interface MissionItem {
  id: string;
  mission_id: number;
  opportunity_id?: string;
  opportunity_name?: string;
  opportunity_phone?: string;
  opportunity_gender?: Gender;
  agent_id?: string;
  name?: string;
  title?: string;
  description?: string;
  due_date?: number;
  status?: MissionStatus;
  purpose?: MissionPurpose;
  tasks?: Array<Task>;
  finished_percent: number;
  histories?: Array<MissionHistory>;
}

export interface MissionReportRequest {
  agent_mission_id: string;
  method: string;
  notes: Array<string>;
  report: string;
  opportunity_update_request: OpportunityUpdateRequest;
}

export interface MissionUpdateStatusRequest {
  id: string;
  mission_status: string;
  opportunity_status?: string;
  notes?: string[];
  report?: string;
  title?: string;
  type?: MissionType;
  due_date?: number;
  status?: MissionStatus;
  purpose?: MissionPurpose;
}
