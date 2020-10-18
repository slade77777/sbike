import {Project} from './project';
import {Promotion} from './promotion';

export interface Apartment {
  id: string;
  code: string;
  name: string;
  area: string;
  floor: string;
  build_from: string;
  description: string;
  balcony_view: string;
  view: string;
  square_meters: string;
  unit_area: string;
  thumbnail: string;
  transaction: {
    name: string;
    legal_doc: string;
    price_per_metre: string;
    price: string;
    market_type: string;
    contract_date: string;
    owner: {
      code: string;
      name: string;
    };
    sale_status: string;
  };
  rooms: Array<{
    name: string;
    type_room: string;
    amount: number;
  }>;
  furnitures: [];
  promotions: Promotion[];
  project: Project;
  main_view: {
    label: string;
    short_name: string;
  };
}
