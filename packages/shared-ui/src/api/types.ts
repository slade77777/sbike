import {MissionItem} from '../@types/mission';
import {PurposeItem} from '../@types/purpose';
import {NotificationResponse} from '../@types/notification';
import {
  ProjectResponse,
  ProjectEventResponse,
  ClusterBlockResponse,
  ClusterBlockRequest,
  PropertyView,
  PropertyPosition,
  StackingPlanReponse,
} from '../@types/inventory';
import {
  MissionReportRequest,
  MissionUpdateStatusRequest,
} from '../@types/mission';
import {
  OpportunityItem,
  OpportunityUpdateRequest,
  HomeType,
  BudgetLimit,
  JobType,
  LeadProject,
  SellingPolicy,
  BankType,
  PotentialLeadFilterRequest,
} from '../@types/opportunity';
import {PotentialLeadItem} from './../@types/opportunity';
import {AgentInforResponse, AgentUpdateRequest} from './../@types/agent';
import {AddressItem} from './../@types/address';
import {GoogleImageStorage} from './../@types/storage';
import {RegisterDeviceTokenRequest} from './../@types/device';

import {
  CreateBookingOrderRequest,
  BookingOrderResponse,
  OrderListRequest,
  CancelBookingOrderRequest,
  EventResponse,
  CompleteBookingOrderRequest,
  CompleteBookingOrderResponse,
} from './../@types/order';

export interface Article {
  id: string;
  title: string;
  url: string;
  tags: string[];
  thumbnail_url: string;
}

export interface Agent {
  id: string;
  property_type: string;
  property_id: number;
  name: string;
  agent_code?: string;
  certified: string[];
  phone_number: string;
  avatar_url?: string;
  status: string;
}

export interface Room {
  name: string;
  type_room: string;
  amount: number;
}

export interface Property {
  address: string;
  area: string;
  balcony_view: string;
  built_from: number;
  city: string;
  construct_date: Date | string;
  constructor: string;
  description: string;
  developer: string;
  floor: number;
  id: number;
  lat: number;
  legal_doc: string;
  long: number;
  main_view: {
    label: string;
    shortname: string;
  };
  market_type: string;
  name: string;
  owner: {
    code: string;
    name: string;
  };
  price: string | number;
  price_per_meter: string;
  project_code: string;
  project_id: number;
  project_name: string;
  property_type: string;
  room: Room[];
  sale_status: string;
  square_meters: string | number;
  thumbnail: string;
  url_images: string[] | ProjectImage[];
  view: string;
}

export interface SampleApartment {
  id: number;
  project_id: number;
  project_code: string;
  project_name: string;
  city: string;
  apartment_name: string;
  apartment_type: string;
  square_meters: string;
  price_range: string;
  area: string;
  floor: string;
  legal_doc: string;
  room: {name: string; amount: number}[];
  thumbnail: string;
  url_images: string[];
}

export interface Facility {
  description: string;
  icon: string;
  id: number;
  priority: number;
  title: string;

  project_id?: number;
  facility_type?: string;
  image?: string;
  long?: number;
  lat?: number;
}

export interface News {
  id: number;
  property_type: string;
  property_id: number;
  title: string;
  summary: string;
  description: string;
  image?: string;
}

export interface ProjectImage {
  description: string;
  id: number;
  image_type_name: string;
  title: string;
  urls: {
    url: string;
    description: string;
  }[];

  property_type: string;
  property_id: number;

  url?: string[];
}

export interface OutsideFacility {
  id: number;
  name: string;
  lat: number;
  long: number;
  distance: number;
}

export interface Project {
  building_density: string;
  city: string;
  construct_date: string | Date;
  constructor: string;
  delivery_date: string | Date;
  description: string;
  developer: string;
  district_code: number;
  id: number;
  images: ProjectImage[];
  inside_facilities: Facility[];
  lat: number;
  legal_paper: string;
  long: number;
  numb_of_blocks: number;
  number_of_units: string;
  price_range: string;
  project_address: string;
  project_code: string;
  project_name: string;
  promotions: Promotion[];
  province_code: number;
  sale_status: string;
  secondary_property_on_listing: number;
  squared_metres: string;
  total_area: string;
  ward_code: number;

  outside_facilities?: OutsideFacility[];
}

export interface LatLng {
  west: number;
  east: number;
  south: number;
  north: number;
}

export interface Promotion {
  id: number;
  property_type: string;
  property_id: number;
  promotion_type: string;
  title: string;
  icon: string;
  description: string;
}

export type ServerResponse<T extends any> = Promise<{
  data?: T;
  meta: {
    code: string;
    message: string;
    http_code?: number | string;
    error_code?: number | string;
    service_code?: number | string;
    request_id?: number | string;
  };
}>;

export interface LoanCalculateResult {
  interest: number; // Lãi trả hàng tháng
  principle: number; // Gốc trả hàng tháng
  left: number; // Dư nợ gốc còn lại
  total: number; // Tổng gốc, lãi trả hàng tháng
}

export interface MortgageFormType {
  housePrice: number;
  loanAmount: number;
  loanPercent: number;
  loanTime: number;
  interestRate: number;
  calculateType: MortgageType;
  isUpdate: boolean;
}

export enum MortgageType {
  FIXED = 1,
  EQUAL = 2,
}

export interface ContactFormType {
  type?: string;
  customer?: {
    name?: string;
    phone?: string;
    email?: string;
  };
  project_id?: string;
  scheduled_date?: string;
  agent_id?: string;
  note?: string;
  apartment_id?: string;
  address?: {
    province_id?: string;
    district_id?: string;
    ward_id?: string;
    address?: string;
  };
  financing_info_included?: boolean;
  owned?: boolean; // owner of this apartment (for sell)
  needs?: string; // BUYING, SELLING
  event_id?: string; // event of selling (not yet)
}

export interface ApiLayer {
  readAgents(): ServerResponse<Agent[]>;
  registerAgent(): ServerResponse<AgentInforResponse>;
  getAgent(): ServerResponse<AgentInforResponse>;
  updateAgent(editAgent: AgentUpdateRequest): ServerResponse<any>;
  generateUploadUrl(
    imageName: string,
    contentType: string,
  ): ServerResponse<GoogleImageStorage>;
  uploadToCloud(putUrl: string, data: any, contentType: string): Promise<any>;
  readProjectAgents(projectId: string): ServerResponse<Agent[]>;
  readPropertyAgents(propertyId: string): ServerResponse<Agent[]>;
  sendContactForm(form: ContactFormType): ServerResponse<Response>;

  readProject(id: string): ServerResponse<Project>;
  readProjects(): ServerResponse<Project[]>;
  readProjectPromotions(projectId: string): ServerResponse<Promotion[]>;
  readProjectImages(projectId: string): ServerResponse<ProjectImage[]>;
  readProjectNews(projectId: string): ServerResponse<News[]>;
  readProjectFacilities(projectId: string): ServerResponse<Facility[]>;
  readApartmentDetails(apartmentId: string): ServerResponse<Property>;
  readApartmentPromotions(apartmentId: string): ServerResponse<Promotion[]>;
  readApartmentImages(apartmentId: string): ServerResponse<ProjectImage[]>;
  readApartmentFacilities(apartmentId: string): ServerResponse<Facility[]>;
  readApartmentAgents(apartmentId: string): ServerResponse<Agent[]>;
  readSampleApartments(projectId: string): ServerResponse<SampleApartment[]>;
  readProperty(id: string): ServerResponse<Property>;
  readProperties(projectId?: string): ServerResponse<Property[]>;
  readAgents(page: number, size: number): ServerResponse<Agent[]>;

  // Address
  getProvinces(): ServerResponse<AddressItem[]>;
  getDistricts(provinceId: string): ServerResponse<AddressItem[]>;
  getWards(districtId: string): ServerResponse<AddressItem[]>;

  // Opportunity
  getOpportunityList(request?: any | null): ServerResponse<OpportunityItem[]>;
  getOpportunityById(id: string): ServerResponse<OpportunityItem>;

  //potential lead
  getPotentialLeadList(
    request: PotentialLeadFilterRequest,
  ): ServerResponse<PotentialLeadItem[]>;
  addPotentialLead(
    request: OpportunityUpdateRequest,
  ): ServerResponse<PotentialLeadItem>;
  getPotentialLeadById(id: string): ServerResponse<PotentialLeadItem>;

  updateOpportunity(
    request: OpportunityUpdateRequest,
    id: string,
  ): ServerResponse<any>;
  getMissions(): ServerResponse<MissionItem[]>;
  getMission(id: string): ServerResponse<MissionItem>;
  getHomeTypes(): ServerResponse<HomeType[]>;
  getBudgetLimits(): ServerResponse<BudgetLimit[]>;
  getJobTypes(): ServerResponse<JobType[]>;
  getPurposeOfOpportunity(): ServerResponse<PurposeItem[]>;

  // Apartment
  getApartments(): ServerResponse<Property[]>;
  getSellingPolicies(): ServerResponse<SellingPolicy[]>;
  getProjects(): ServerResponse<LeadProject[]>;
  getBankTypes(): ServerResponse<BankType[]>;
  reportMission(
    missionId: string,
    request: MissionReportRequest,
  ): ServerResponse<MissionItem>;
  updateMissionStatus(
    missionId: string,
    request: MissionUpdateStatusRequest,
  ): ServerResponse<MissionItem>;
  registerDeviceToken(request: RegisterDeviceTokenRequest): ServerResponse<any>;

  // Notification
  getNotification(): ServerResponse<NotificationResponse[]>;
  markReadNotification(id: number): ServerResponse<any>;

  // MARK: - Booking Order
  getBookingOrderBy(id: number): ServerResponse<BookingOrderResponse>;
  createBookingOrder(order: CreateBookingOrderRequest): ServerResponse<number>;
  getOrders(request: OrderListRequest): ServerResponse<BookingOrderResponse[]>;
  cancelBookingOrder(
    request: CancelBookingOrderRequest,
  ): ServerResponse<number>;
  getEvents(orderId: number): ServerResponse<EventResponse[]>;
  registerEvent(orderId: number, eventId: number): ServerResponse<number>;
  completeOrderWith(
    id: number,
    request: CompleteBookingOrderRequest,
  ): ServerResponse<CompleteBookingOrderResponse>;
  getProjectEvents(projectId: number): ServerResponse<ProjectEventResponse[]>;
  getProjectList(): ServerResponse<ProjectResponse[]>;
  getOrdersByOpportunityId(id: string): ServerResponse<BookingOrderResponse[]>;
  // MARK: - Inventory
  getClusterBlock(
    request: ClusterBlockRequest,
  ): ServerResponse<ClusterBlockResponse[]>;
  getBlockDetail(id: string): ServerResponse<StackingPlanReponse[]>;
  getProjectDetail(id: number): ServerResponse<ProjectResponse>;
  getProjectEventDetail(
    projectId: number,
    eventId: number,
  ): ServerResponse<ProjectEventResponse>;
  getProjectEvents(projectId: number): ServerResponse<ProjectEventResponse[]>;
  getProjectList(): ServerResponse<ProjectResponse[]>;
  getPropertyViews(): ServerResponse<PropertyView[]>;
  getPropertyPositions(): ServerResponse<PropertyPosition[]>;
}
