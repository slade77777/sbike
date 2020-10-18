import {LeadProject, HomeType, Orientation} from './opportunity';

export enum PropertyStatus {
  All = 'ALL',
  NotForSale = 'NOT_FOR_SALE',
  Available = 'AVAILABLE',
  Deposited = 'DEPOSITED',
  Sold = 'SOLD',
}

export enum BlockStatus {
  OnSale = 'ON_SALE',
  OpeningSoon = 'OPENING_SOON',
  SoldOut = 'SOLD_OUT',
}

export type Sector = {
  id?: number;
  name?: string;
  description?: string;
};

export interface ClusterBlockResponse {
  project?: LeadProject;
  sector?: Sector;
  block?: Block;
  status?: BlockStatus;
}

export interface ClusterBlockRequest {
  id: number;
}

export type Block = {
  id: number;
  name: string;
  description: string;
};

export type Floor = {
  id: number;
  code: string;
  name: string;
  description: string;
};

export type AnalystItem = {
  direction_analyst: string;
  position_analyst: string;
  floor_number_analyst: string;
  view_analyst: string;
  property_type_analyst: string;
  assessment: string;
};

export type PropertyItem = {
  id?: number;
  name?: string;
  code?: string;
  size?: string;
  floor_id?: number;
  property_type_id?: number;
  direction?: Orientation;
  status?: PropertyStatus;
  property_price?: number;
  price_per_square?: number;
  deposite_money?: string;
  number_of_bedroom?: number;
  picture_of_position?: string;
  description?: string;
  images: string[];
  position?: string;
  create_time?: number;
  update_time?: number;
};

export type StackingPlanReponse = {
  property: PropertyItem;
  project: LeadProject;
  sector: Sector;
  block?: Block;
  floor?: Floor;
  property_type?: HomeType;
  analyst: AnalystItem;
  position: PropertyPosition;
  view: PropertyView;
};

// Project detail
export type PropertyTypes = {
  name?: string;
  available?: boolean;
};

export type Location = {
  address?: string;
  latitude?: string;
  longitude?: string;
};

export type LatestEvent = {
  id?: number;
  name?: string;
  starting_date?: number;
  ending_date?: number;
  status?: string;
  total_number_of_order?: number;
};

export type Construction = {
  period_name?: string;
  period_time?: number;
  available?: boolean;
};

export type Developer = {
  name?: string;
  introduction?: string;
  short_introduction?: string;
};

export interface ProjectResponse {
  id: number;
  status?: ProjectStatus;
  name?: string;
  summary?: string;
  apartment_square_range?: string;
  price_range?: string;
  deposited_percentage?: string;
  location?: Location;
  property_types?: PropertyTypes[];
  description?: string;
  short_description?: string;
  external_utility?: string;
  internal_utility?: string;
  specification?: string;
  developer?: Developer;
  avatars?: string[];
  number_of_available_apartment?: number;
  latest_event?: LatestEvent;
  constructions?: Construction[];
}

export interface ProjectEventResponse {
  id: number;
  name?: string;
  description?: string;
  project?: ProjectData;
  starting_date?: number;
  ending_date?: number;
  status?: ProjectEventStatus;
  number_of_order?: number;
  total_number_of_order?: number;
  total_number_of_property?: number;
  location?: Location;
  promotion?: string;
  policy?: string;
}

export interface ProjectData {
  id?: number;
  name?: string;
}

export enum ProjectStatus {
  OnSale = 'ON_SALE',
  OpeningSoon = 'OPENING_SOON',
  OutOfStock = 'OUT_OF_STOCK',
}

export enum ProjectEventStatus {
  Happening = 'HAPPENING_NOW',
  Upcoming = 'UPCOMING',
  Closed = 'CLOSED',
}

export type FloorRange = {
  title: string;
  start?: number;
  end?: number;
};

export type PropertyView = {
  id?: number;
  code?: string;
  name?: string;
  description?: string;
};

export type PropertyPosition = {
  id?: number;
  code?: string;
  name?: string;
  description?: string;
};
