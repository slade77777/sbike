import {InsideFacility} from './insideFacility';
import {Promotion} from './promotion';
import {Address} from './address';
import {SALE_STATUS} from './saleStatus';

export interface Project {
  id: string;
  name: string;
  code: string;
  construct_date: string;
  constructor: string;
  delivery_date: string;
  description: string;
  developer: string;
  number_of_block: number;
  number_of_apartment: number;
  number_of_2nd_apartment: number;
  total_area: string;
  unit_area: string;
  legal_paper: string;
  price_range: string;
  building_density: number;
  lat: number;
  lng: number;
  thumnail: string;
  address: Address;
  sale_status: SALE_STATUS;
  inside_facilities: InsideFacility[];
  project_promotions: Promotion[];
  position?: string;
}
